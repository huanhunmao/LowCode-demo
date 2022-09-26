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
exports.UpdateFunctionDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let UpdateFunctionDetail = class UpdateFunctionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update the variable details,
     * only update the variable name and introduction, type, and update the content name and version content
     * @param  {UpdateTypeFileDetailReq} params
     * @returns {File}
     */
    async index(ctx, params) {
        var _a, _b;
        // Check the validity of the name
        if (!(0, tools_1.checkName)(params.name)) {
            return Response.warning(app_config_1.i18n.function.invalidName, 2091501);
        }
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.FUNCTION });
            const hasAuth = await this.service.auth.file(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4091501);
            }
            // 获取文件的内容
            const contentList = await this.service.content.file.getContentByFileIds([params.id]);
            const contentId = ((_a = contentList[0]) === null || _a === void 0 ? void 0 : _a.id) || '';
            const contentName = params.name || ((_b = contentList[0]) === null || _b === void 0 ? void 0 : _b.title);
            let versionId = '';
            let versionNumber = 1;
            let versionStatus = '';
            // Get the version of the content
            if (contentId) {
                const versionDetail = await this.service.version.info.getContentLatestVersion({
                    contentId,
                    deleted: false,
                });
                versionId = versionDetail.id || '';
                versionStatus = versionDetail.status;
                versionNumber = versionDetail.versionNumber || 1;
            }
            const result = await this.service.file.info.updateFileDetail(params, {
                ctx,
                actionType: [constant_1.LOG.UPDATE, constant_1.TYPE.FUNCTION].join('_'),
            });
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.function.invalidFileId, 2091502);
            }
            if (result.code === 2) {
                return Response.warning(app_config_1.i18n.function.nameExist, 2091503);
            }
            this.service.content.info.updateContentItem(contentId, { title: contentName }, { ctx, actionType: [constant_1.LOG.UPDATE, constant_1.TYPE.FUNCTION].join('_') });
            if (versionStatus === constant_1.VERSION.STATUS_BASE) {
                this.service.version.info.updateVersionItem(versionId, { content: params.content }, { ctx, actionType: [constant_1.LOG.UPDATE, constant_1.TYPE.FUNCTION].join('_') });
            }
            else {
                // Add new version
                const version = this.service.version.number.getVersionFromNumber(++versionNumber);
                this.service.version.info.create({ contentId, version, versionNumber, content: params.content }, { ctx, fileId: params.id });
            }
            await this.service.file.info.runTransaction(ctx.transactions);
            const fileDetail = await this.service.file.info.getDetailById(params.id);
            return Response.success(fileDetail, 1091501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.function.updateFunctionFailed, 3091501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateFunctionDetail,
        description: '',
        tags: ['Function'],
        operationId: 'update-function-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.UpdateTypeFileDetailReq]),
    __metadata("design:returntype", Promise)
], UpdateFunctionDetail.prototype, "index", null);
UpdateFunctionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('functions'),
    __metadata("design:paramtypes", [])
], UpdateFunctionDetail);
exports.UpdateFunctionDetail = UpdateFunctionDetail;
