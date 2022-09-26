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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWorkspaceRecycleList = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const project_validate_types_1 = require("../../types/validates/project-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetWorkspaceRecycleList = class GetWorkspaceRecycleList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get current user all deleted object list, includes project, variable, conditions eg.
     *
     * But current only response deleted projects
     * @param  {WorkspaceProjectListReq} params
     * @param  {Header} headers
     * @returns {FolderInfo}
     */
    async index(ctx, params) {
        try {
            this.service.folder.info.setPageSize(params);
            const creator = ctx.userInfo.id;
            if (!creator) {
                return Response.warning(app_config_1.i18n.user.invalidUser, 2140401);
            }
            const folderInfoList = await this.service.folder.list.getWorkspaceFolderList(Object.assign({
                creator,
                types: [constant_1.TYPE.PROJECT_FOLDER],
                deleted: true,
                sort: {
                    updateTime: -1,
                },
            }, params));
            return Response.success({
                pageInfo: {
                    page: params.page,
                    size: params.size,
                    total: folderInfoList.count,
                },
                data: folderInfoList.list,
            }, 1140401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.project.getWorkspaceRecycleListFailed, 3140401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/recycle-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getWorkspaceRecycleList,
        description: '',
        tags: ['Workspace'],
        operationId: 'get-workspace-recycle-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(project_validate_types_1.ProjectListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_validate_types_1.WorkspaceProjectListReq]),
    __metadata("design:returntype", Promise)
], GetWorkspaceRecycleList.prototype, "index", null);
GetWorkspaceRecycleList = __decorate([
    (0, routing_controllers_1.JsonController)('workspaces'),
    __metadata("design:paramtypes", [])
], GetWorkspaceRecycleList);
exports.GetWorkspaceRecycleList = GetWorkspaceRecycleList;
