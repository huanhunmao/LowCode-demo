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
exports.GetApplicationProjectGoodsList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const app_validate_types_1 = require("../../types/validates/app-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetApplicationProjectGoodsList = class GetApplicationProjectGoodsList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get special type goods paging list in application
     * @param  {AppProjectGoodsListReq} params
     * @returns {GetPageTemplateListRes}
     */
    async index(params) {
        try {
            const pageSize = this.service.application.setPageSize(params);
            // Get all project from store
            const appProjectGoods = await this.service.folder.list.find({
                applicationId: params.applicationId,
                'tags.copyFrom': { $exists: true },
                deleted: false,
            });
            // Get include special type file's projects
            const allProjectIds = lodash_1.default.map(appProjectGoods, 'id');
            const projectTypeFileGoods = await this.service.file.list.find({
                applicationId: params.applicationId,
                'tags.copyFrom': { $exists: true },
                folderId: { $in: allProjectIds },
                type: params.type,
                deleted: false,
            }, 'folderId', { sort: { createTime: -1 } });
            const pageProjectGoods = lodash_1.default.chunk(lodash_1.default.uniq(lodash_1.default.map(projectTypeFileGoods, 'folderId')), pageSize.size);
            const currentPageProjectIds = pageProjectGoods[pageSize.page - 1] || [];
            let appProjectGoodsList = [];
            if (currentPageProjectIds.length > 0) {
                const userIds = [];
                lodash_1.default.map(appProjectGoods, (project) => {
                    if (currentPageProjectIds.indexOf(project.id) !== -1) {
                        userIds.push(project.creator);
                    }
                });
                // Get project files
                const [fileList, userObject, appDetail] = await Promise.all([
                    this.service.file.list.find({ folderId: { $in: currentPageProjectIds }, type: params.type }),
                    this.service.user.getUserBaseObjectByIds(userIds),
                    this.service.application.getDetailById(params.applicationId),
                ]);
                const fileIds = lodash_1.default.map(fileList, 'id');
                // Get content list
                const contentObject = await this.service.content.list.getContentObjectByFileIds(fileIds);
                let fileContentObject = {};
                for (const id in contentObject) {
                    if (!fileContentObject[contentObject[id].fileId]) {
                        fileContentObject[contentObject[id].fileId] = [];
                    }
                    fileContentObject[contentObject[id].fileId].push(contentObject[id]);
                }
                const projectFileObject = {};
                for (const file of fileList) {
                    if (!projectFileObject[file.folderId]) {
                        projectFileObject[file.folderId] = [];
                    }
                    const fileWithContent = Object.assign(file, { contents: fileContentObject[file.id] || [] });
                    projectFileObject[file.folderId].push(fileWithContent);
                }
                appProjectGoods.forEach((project) => {
                    appProjectGoodsList.push(Object.assign({
                        files: projectFileObject[project.id] || [],
                        creator: userObject[project.creator] || {},
                        application: { id: params.applicationId, name: appDetail.name || '' },
                    }, lodash_1.default.omit(project, ['applicationId', 'creator'])));
                });
            }
            return Response.success({
                pageInfo: {
                    total: appProjectGoods.length || 0,
                    page: params.page,
                    size: params.size,
                },
                data: appProjectGoodsList,
            }, 1030901);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.app.getPageGoodsFailed, 3030901);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/project-goods-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppGoodsList,
        description: '',
        tags: ['Application'],
        operationId: 'get-application-page-goods-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(app_validate_types_1.AppPackageListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_validate_types_1.AppProjectGoodsListReq]),
    __metadata("design:returntype", Promise)
], GetApplicationProjectGoodsList.prototype, "index", null);
GetApplicationProjectGoodsList = __decorate([
    (0, routing_controllers_1.JsonController)('applications'),
    __metadata("design:paramtypes", [])
], GetApplicationProjectGoodsList);
exports.GetApplicationProjectGoodsList = GetApplicationProjectGoodsList;
