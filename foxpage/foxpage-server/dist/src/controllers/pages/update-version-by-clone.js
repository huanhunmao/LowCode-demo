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
exports.UpdatePageVersionDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let UpdatePageVersionDetail = class UpdatePageVersionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update content version by clone special content version
     * @param  {CloneContentReq} params
     * @returns {ContentVersion}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.PAGE });
            // Check permission
            const hasAuth = await this.service.auth.content(params.targetContentId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4052001);
            }
            // Get source template details
            const contentList = await this.service.content.info.getDetailByIds([
                params.sourceContentId,
                params.targetContentId,
            ]);
            let sourceContentDetail = {};
            let targetContentDetail = {};
            contentList.forEach((content) => {
                content.id === params.sourceContentId && (sourceContentDetail = content);
                content.id === params.targetContentId && (targetContentDetail = content);
            });
            const sourceFileId = (sourceContentDetail === null || sourceContentDetail === void 0 ? void 0 : sourceContentDetail.fileId) || '';
            const targetFileId = (targetContentDetail === null || targetContentDetail === void 0 ? void 0 : targetContentDetail.fileId) || '';
            const fileList = await this.service.file.info.getDetailByIds([sourceFileId, targetFileId]);
            let sourceFileDetail = {};
            let targetFileDetail = {};
            fileList.forEach((file) => {
                file.id === sourceFileId && (sourceFileDetail = file);
                file.id === targetFileId && (targetFileDetail = file);
            });
            // TODO Content's file not in the application
            if (!sourceFileDetail || sourceFileDetail.applicationId !== params.applicationId) {
            }
            // Get the source content version detail
            const [versionList, targetBaseVersion] = await Promise.all([
                this.service.version.info.find({
                    contentId: sourceContentDetail.id,
                    versionNumber: sourceContentDetail.liveVersionNumber || 1,
                }),
                this.service.version.info.getMaxContentVersionDetail(params.targetContentId, { ctx }),
            ]);
            // Get version recursive relation detail
            const allRelations = await this.service.version.relation.getVersionRelations(lodash_1.default.keyBy(versionList, 'id'));
            // Get all relations content detail
            const relationContentList = await this.service.content.list.getDetailByIds(lodash_1.default.keys(allRelations));
            const projectId = targetFileDetail.folderId || '';
            let relations = {};
            for (const content of relationContentList) {
                const relation = await this.service.file.info.copyFile(content.fileId, params.applicationId, {
                    ctx,
                    folderId: projectId,
                    hasLive: true,
                    relations,
                });
                relations = lodash_1.default.merge(relations, relation);
            }
            let sourceVersionDetail = {};
            if (((sourceContentDetail === null || sourceContentDetail === void 0 ? void 0 : sourceContentDetail.liveVersionNumber) || 0) > 0) {
                sourceVersionDetail = await this.service.version.info.getContentVersionDetail({
                    contentId: params.sourceContentId,
                    versionNumber: sourceContentDetail.liveVersionNumber || 1,
                });
            }
            else {
                sourceVersionDetail = await this.service.version.info.getMaxContentVersionDetail(params.sourceContentId, { ctx });
            }
            // Copy page content version to target content
            this.service.version.info.copyContentVersion(sourceVersionDetail.content, params.targetContentId, {
                ctx,
                relations,
                tempRelations: {},
                versionId: targetBaseVersion.id,
            });
            await this.service.version.info.runTransaction(ctx.transactions);
            return Response.success(app_config_1.i18n.page.cloneToPageSuccess, 1052001);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.content.updatePageVersionFailed, 3052001);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/clone'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updatePageVersionDetail,
        description: '',
        tags: ['Page'],
        operationId: 'update-page-version-by-clone',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, content_validate_types_1.CloneContentReq]),
    __metadata("design:returntype", Promise)
], UpdatePageVersionDetail.prototype, "index", null);
UpdatePageVersionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('pages'),
    __metadata("design:paramtypes", [])
], UpdatePageVersionDetail);
exports.UpdatePageVersionDetail = UpdatePageVersionDetail;
