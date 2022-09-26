"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProjectPageList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const project_validate_types_1 = require("../../types/validates/project-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetProjectPageList = class GetProjectPageList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the paging data of the project under the organization,
     * if the applicationId is passed, get the project under the application
     * 1. Get all applications under the organization
     * 2, Get all the folders (Projects) under the application in reverse order by folder creation time
     *
     * filter project data by type (user|team|organization app)
     * @param  {ProjectListReq} params
     * @param  {Header} headers
     * @returns {FolderInfo}
     */
    async index(ctx, params) {
        try {
            // Check the validity of the organization ID and whether the user is under the organization
            const userInOrg = await this.service.org.checkUserInOrg(params.organizationId, ctx.userInfo.id);
            if (!userInOrg) {
                return Response.warning(app_config_1.i18n.project.userNotInOrg, 2040401);
            }
            let appIds = [];
            if (params.applicationId) {
                const appDetail = await this.service.application.getDetailById(params.applicationId);
                appDetail.organizationId === params.organizationId && (appIds = [appDetail.id]);
            }
            else {
                const appList = await this.service.application.find({ organizationId: params.organizationId });
                appIds = lodash_1.default.map(appList, 'id');
            }
            let userIds = [];
            if (params.type === constant_1.TYPE.TEAM) {
                // get teams users
                const teamProjectParams = Object.assign(params.typeId ? { id: params.typeId } : {}, { 'members.userId': ctx.userInfo.id });
                const teamList = await this.service.team.find(teamProjectParams);
                teamList.forEach(team => {
                    userIds.push(...lodash_1.default.map(lodash_1.default.filter((team === null || team === void 0 ? void 0 : team.members) || [], member => member.status), 'userId'));
                });
                userIds.length === 0 ? (userIds = [ctx.userInfo.id]) : (userIds = lodash_1.default.uniq(userIds));
            }
            else if (params.type === constant_1.TYPE.USER) {
                userIds = [ctx.userInfo.id];
            }
            let orgFolderData = { list: [], count: 0 };
            if (params.type === constant_1.TYPE.INVOLVE) {
                orgFolderData = await this.service.folder.list.getInvolveProject(Object.assign(lodash_1.default.pick(params, ['page', 'size', 'search']), { userId: ctx.userInfo.id, appIds }));
            }
            else {
                // Get the id of the specified default folder under the application
                const folderIds = await this.service.folder.info.getAppDefaultFolderIds({
                    applicationIds: appIds,
                    type: constant_1.TYPE.PROJECT,
                });
                if (folderIds.size > 0) {
                    orgFolderData = await this.service.folder.list.getFolderChildrenList(Object.assign(lodash_1.default.pick(params, ['page', 'size', 'search']), { userIds, parentFolderIds: [...folderIds] }));
                }
            }
            return Response.success({
                pageInfo: {
                    page: params.page,
                    size: params.size,
                    total: orgFolderData.count,
                },
                data: orgFolderData.list,
            }, 1040401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.org.getOrgFolderFailed, 3040401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getProjectList,
        description: '',
        tags: ['Project'],
        operationId: 'get-page-project-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(project_validate_types_1.ProjectListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_validate_types_1.ProjectListReq]),
    __metadata("design:returntype", Promise)
], GetProjectPageList.prototype, "index", null);
GetProjectPageList = __decorate([
    (0, routing_controllers_1.JsonController)('project-searchs'),
    __metadata("design:paramtypes", [])
], GetProjectPageList);
exports.GetProjectPageList = GetProjectPageList;
