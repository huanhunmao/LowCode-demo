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
exports.UpdateConditionDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let UpdateConditionDetail = class UpdateConditionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update condition details,
     * only condition name and introduction, type, content name and version content can be updated
     * @param  {UpdateTypeFileDetailReq} params
     * @returns {File}
     */
    async index(ctx, params) {
        var _a, _b;
        // Check the validity of the name
        if (!(0, tools_1.checkName)(params.name)) {
            return Response.warning(app_config_1.i18n.condition.invalidConditionName, 2101601);
        }
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.CONDITION });
            // Permission check
            const hasAuth = await this.service.auth.file(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4101601);
            }
            // Get the contents of the file
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
                actionType: [constant_1.LOG.UPDATE, constant_1.TYPE.CONDITION].join('_'),
            });
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.condition.invalidConditionId, 2101602);
            }
            if (result.code === 2) {
                return Response.warning(app_config_1.i18n.condition.conditionNameExist, 2101603);
            }
            this.service.content.info.updateContentItem(contentId, { title: contentName }, { ctx, fileId: params.id });
            if (versionStatus === constant_1.VERSION.STATUS_BASE) {
                // Update version
                this.service.version.info.updateVersionItem(versionId, { content: params.content }, { ctx, fileId: params.id, actionType: [constant_1.LOG.UPDATE, constant_1.TYPE.CONDITION].join('_') });
            }
            else {
                // Add new version
                const version = this.service.version.number.getVersionFromNumber(++versionNumber);
                this.service.version.info.create({ contentId, version, versionNumber, content: params.content }, { ctx, fileId: params.id, actionType: [constant_1.LOG.CREATE, constant_1.TYPE.CONDITION].join('_') });
            }
            await this.service.file.info.runTransaction(ctx.transactions);
            const fileDetail = await this.service.file.info.getDetailById(params.id);
            return Response.success(fileDetail, 1101601);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.condition.updateConditionFailed, 3101601);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateConditionFileContentDetail,
        description: '',
        tags: ['Condition'],
        operationId: 'update-condition-file-content-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.UpdateTypeFileDetailReq]),
    __metadata("design:returntype", Promise)
], UpdateConditionDetail.prototype, "index", null);
UpdateConditionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('conditions'),
    __metadata("design:paramtypes", [])
], UpdateConditionDetail);
exports.UpdateConditionDetail = UpdateConditionDetail;
