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
exports.GetProjectPagesList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const project_validate_types_1 = require("../../types/validates/project-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetProjectPagesList = class GetProjectPagesList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the list of specified pages under the specified project
     * @param  {ProjectPagesReq} params
     * @param  {Header} headers
     * @returns {FolderInfo}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            // Verify the effectiveness of the project
            const projectDetail = await this.service.folder.info.getDetailById(params.projectId);
            if (projectDetail.applicationId !== params.applicationId) {
                return Response.warning(app_config_1.i18n.project.invalidProjectId, 2040601);
            }
            // Get the pageId of the path
            let fileIds = [];
            let fileObject = {};
            for (const path of params.filter.pathList) {
                const pathList = lodash_1.default.pull(path.split('/'), '');
                const fileDetail = await this.service.file.info.getFileDetailByNames({
                    applicationId: params.applicationId,
                    parentFolderId: params.projectId,
                    pathList: lodash_1.default.pull(lodash_1.default.dropRight(pathList), '', undefined, null),
                    fileName: lodash_1.default.last(pathList),
                }, { ctx });
                if (fileDetail) {
                    fileIds.push(fileDetail.id);
                    fileObject[fileDetail.id] = { name: path };
                }
            }
            // Get contentId
            const contentList = await this.service.content.file.getContentByFileIds(fileIds);
            const contentObject = lodash_1.default.keyBy(contentList, 'id');
            const contentIds = lodash_1.default.map(contentList, 'id');
            const versionList = await this.service.content.live.getContentLiveDetails({
                applicationId: params.applicationId,
                type: constant_1.TYPE.PAGE,
                contentIds,
            });
            const fileContent = [];
            versionList.forEach((version) => {
                var _a;
                const fileId = contentObject[version.contentId].fileId;
                fileContent.push({
                    fileId: fileId,
                    path: ((_a = fileObject[fileId]) === null || _a === void 0 ? void 0 : _a.name) || '',
                    version: version.version || '',
                    content: version.content || {},
                });
            });
            // Get live details
            return Response.success(fileContent, 1040601);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.project.getProjectPagesFailed, 3040601);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/files-info'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getProjectPageList,
        description: '',
        tags: ['Project'],
        operationId: 'get-project-pages-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(project_validate_types_1.ProjectPageListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_validate_types_1.ProjectPagesReq]),
    __metadata("design:returntype", Promise)
], GetProjectPagesList.prototype, "index", null);
GetProjectPagesList = __decorate([
    (0, routing_controllers_1.JsonController)('projects'),
    __metadata("design:paramtypes", [])
], GetProjectPagesList);
exports.GetProjectPagesList = GetProjectPagesList;
