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
exports.SetFolderStatus = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const project_validate_types_1 = require("../../types/validates/project-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let SetFolderStatus = class SetFolderStatus extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Set project folder deletion status
     * @param  {ProjectDeleteReq} params
     * @returns {File}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.DELETE, type: constant_1.TYPE.PROJECT });
            const hasAuth = await this.service.auth.folder(params.projectId, { ctx, mask: 4 });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4040801);
            }
            const folderDetail = await this.service.folder.info.getDetailById(params.projectId);
            if (!folderDetail) {
                return Response.warning(app_config_1.i18n.folder.invalidFolderId, 2040801);
            }
            if (folderDetail.parentFolderId === '') {
                return Response.warning(app_config_1.i18n.project.cannotDeleteSystemFolders, 2040802);
            }
            // TODO Check delete precondition
            // Get a list of all folders, files, contents, and versions under the project
            const folderChildren = await this.service.folder.list.getAllChildrenRecursive({
                folderIds: [params.projectId],
                depth: 5,
                hasContent: true,
            });
            const allChildren = await this.service.folder.list.getIdsFromFolderChildren(folderChildren[params.projectId] || {});
            allChildren.folders.push(folderDetail);
            // Set status, currently only allow deletion
            this.service.folder.info.batchSetFolderDeleteStatus(allChildren.folders, { ctx, type: constant_1.TYPE.PROJECT });
            this.service.file.info.batchSetFileDeleteStatus(allChildren.files, { ctx });
            this.service.content.info.batchSetContentDeleteStatus(allChildren.contents, { ctx });
            this.service.version.info.batchSetVersionDeleteStatus(allChildren.versions, { ctx });
            await this.service.folder.info.runTransaction(ctx.transactions);
            const newFolderDetail = await this.service.folder.info.getDetailById(params.projectId);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: params.projectId, type: constant_1.TYPE.PROJECT });
            return Response.success(newFolderDetail, 1040801);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.project.setDeleteStatusFailed, 3040801);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/status'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.setProjectDeleteStatus,
        description: '',
        tags: ['Project'],
        operationId: 'set-project-delete-status',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FolderDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_validate_types_1.ProjectDeleteReq]),
    __metadata("design:returntype", Promise)
], SetFolderStatus.prototype, "index", null);
SetFolderStatus = __decorate([
    (0, routing_controllers_1.JsonController)('projects'),
    __metadata("design:paramtypes", [])
], SetFolderStatus);
exports.SetFolderStatus = SetFolderStatus;
