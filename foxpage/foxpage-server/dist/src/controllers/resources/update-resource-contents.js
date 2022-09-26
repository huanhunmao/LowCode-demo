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
exports.UpdateResourceContentDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const resource_validate_types_1 = require("../../types/validates/resource-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let UpdateResourceContentDetail = class UpdateResourceContentDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update resource content information, need to update file name, content name
     * @param  {ContentVersionDetailRes} params
     * @param  {Header} headers
     * @returns {ContentVersion}
     */
    async index(ctx, params) {
        var _a;
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.RESOURCE });
            const hasAuth = await this.service.auth.file(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4122001);
            }
            // TODO Need to optimize access to content details and check the validity of the content
            const [fileDetail, contentList] = await Promise.all([
                this.service.file.info.getDetailById(params.id),
                this.service.content.file.getContentByFileIds([params.id]),
            ]);
            const fileTitleArr = (lodash_1.default.last((_a = params.content.realPath) === null || _a === void 0 ? void 0 : _a.split('/')) || '').split('.');
            const newFileName = fileTitleArr[0] + '.' + lodash_1.default.last(fileTitleArr);
            if (fileTitleArr.length < 2) {
                return Response.warning(app_config_1.i18n.resource.invalidName, 2122001);
            }
            const contentDetail = contentList[0] || {};
            const folderId = fileDetail.folderId || '';
            // Get resource version details
            let [versionDetail, checkFileDetail] = await Promise.all([
                this.service.version.info.getDetail({ contentId: contentDetail.id, deleted: false }),
                this.service.file.info.getDetail({
                    applicationId: params.applicationId,
                    folderId,
                    name: newFileName,
                    deleted: false,
                }),
            ]);
            if (checkFileDetail && checkFileDetail.id !== fileDetail.id) {
                return Response.warning(app_config_1.i18n.resource.nameExist, 2122002);
            }
            const versionId = versionDetail ? versionDetail.id : (0, tools_1.generationId)(constant_1.PRE.CONTENT_VERSION);
            if (versionDetail) {
                this.service.version.info.updateVersionItem(versionDetail.id, { content: params.content }, { ctx });
                this.service.content.info.updateContentItem(contentDetail.id, { title: newFileName }, { ctx });
                this.service.file.info.updateFileItem(params.id, { name: newFileName }, { ctx });
            }
            else {
                // Create version details if it does not exist
                const newVersionDetail = {
                    id: versionId,
                    contentId: params.id,
                    status: 'release',
                    version: '',
                    versionNumber: 0,
                    content: params.content,
                };
                this.service.version.info.create(newVersionDetail, { ctx });
                this.service.content.info.updateContentItem(params.id, { title: newFileName }, { ctx });
                this.service.file.info.updateFileItem(fileDetail.id, { name: newFileName }, { ctx });
            }
            await this.service.content.info.runTransaction(ctx.transactions);
            versionDetail = await this.service.version.info.getDetailById(versionId);
            return Response.success(versionDetail, 1122001);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.updateAssetContentFailed, 3122001);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/contents'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateResourceContentDetail,
        description: '',
        tags: ['Resource'],
        operationId: 'update-resource-content-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resource_validate_types_1.UpdateResourceContentReq]),
    __metadata("design:returntype", Promise)
], UpdateResourceContentDetail.prototype, "index", null);
UpdateResourceContentDetail = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], UpdateResourceContentDetail);
exports.UpdateResourceContentDetail = UpdateResourceContentDetail;
