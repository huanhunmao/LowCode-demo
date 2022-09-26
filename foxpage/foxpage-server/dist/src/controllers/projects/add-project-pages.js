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
exports.AddAppsPageDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const project_validate_types_1 = require("../../types/validates/project-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let AddAppsPageDetail = class AddAppsPageDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create page details under the new application project, create page,
     * content and version through application ID, folderId
     * If version already exists, add a new version
     * The path field indicates that the folder is created, and the name is the file
     * {
          "name": "name1",
          "path":"common/abc",
          "content": {
            "locales": "",
            "detail": "{}"
          }
        }
     * @param  {FileDetailReq} params
     * @returns {File}
     */
    async index(ctx, params) {
        var _a;
        try {
            const hasAuth = await this.service.auth.folder(params.projectId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4040101);
            }
            // Check the validity of applications and documents
            const folderDetail = await this.service.folder.info.getDetailById(params.projectId);
            if (!folderDetail || folderDetail.deleted) {
                return Response.warning(app_config_1.i18n.project.invalidProjectId, 2040101);
            }
            if (folderDetail.applicationId !== params.applicationId) {
                return Response.warning(app_config_1.i18n.project.invalidApplicationIdOrProjectId, 2040102);
            }
            let newPageList = [];
            for (const file of params.files) {
                const filePathList = lodash_1.default.pull(file.path.split('/'), '');
                const fileDetail = await this.service.file.info.getFileDetailByNames({
                    applicationId: params.applicationId,
                    parentFolderId: params.projectId,
                    pathList: lodash_1.default.clone(filePathList),
                    fileName: file.name,
                }, { ctx, createNew: true });
                let contentDetail = await this.service.content.info.getDetail({
                    fileId: (fileDetail === null || fileDetail === void 0 ? void 0 : fileDetail.id) || '',
                    deleted: false,
                });
                if (!contentDetail) {
                    contentDetail = this.service.content.info.create({
                        title: file.name,
                        tags: ((_a = file.content) === null || _a === void 0 ? void 0 : _a.locale) ? [{ locale: file.content.locale }] : [],
                        fileId: fileDetail === null || fileDetail === void 0 ? void 0 : fileDetail.id,
                    }, { ctx });
                }
                const newVersionNumber = (contentDetail.liveVersionNumber || 0) + 1;
                const versionDetail = this.service.version.info.create({
                    contentId: contentDetail.id,
                    version: this.service.version.number.getVersionFromNumber(newVersionNumber),
                    content: file.content.detail ? JSON.parse(file.content.detail) : {},
                    status: constant_1.VERSION.STATUS_RELEASE,
                }, { ctx });
                this.service.content.info.updateContentItem(contentDetail.id, { liveVersionNumber: newVersionNumber }, { ctx });
                newPageList.push({
                    id: fileDetail.id,
                    version: versionDetail.version,
                    name: filePathList.join('/') + '/' + file.name,
                    content: versionDetail.content || {},
                });
            }
            await this.service.folder.info.runTransaction(ctx.transactions);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: params.projectId, type: constant_1.TYPE.PROJECT });
            return Response.success(newPageList, 1040101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.project.addProjectPagesFailed, 3040101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/files'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addProjectPageDetail,
        description: '',
        tags: ['Project'],
        operationId: 'add-project-pages-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(project_validate_types_1.ProjectListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_validate_types_1.AddProjectPagesReq]),
    __metadata("design:returntype", Promise)
], AddAppsPageDetail.prototype, "index", null);
AddAppsPageDetail = __decorate([
    (0, routing_controllers_1.JsonController)('projects'),
    __metadata("design:paramtypes", [])
], AddAppsPageDetail);
exports.AddAppsPageDetail = AddAppsPageDetail;
