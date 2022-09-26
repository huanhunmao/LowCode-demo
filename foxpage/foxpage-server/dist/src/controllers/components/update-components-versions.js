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
exports.UpdateComponentVersionDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let UpdateComponentVersionDetail = class UpdateComponentVersionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update component version information,
     * the release version content only can update editor data
     * @param  {ContentVersionUpdateReq} params
     * @returns {ContentVersion}
     */
    async index(ctx, params) {
        var _a, _b, _c, _d, _e;
        try {
            // Permission check
            const hasAuth = await this.service.auth.version(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4111901);
            }
            // Check the validity of the version ID
            const versionDetail = await this.service.version.info.getDetailById(params.id);
            if (!versionDetail || versionDetail.deleted) {
                return Response.warning(app_config_1.i18n.content.invalidVersionId, 2111901);
            }
            const contentDetail = await this.service.content.info.getDetailById(versionDetail.contentId);
            // Only under base status need to check
            let versionContent = params.content;
            if (versionDetail.status === constant_1.VERSION.STATUS_BASE) {
                // Check content required fields
                !lodash_1.default.isPlainObject(params.content) && (params.content = {});
                params.content.id = versionDetail.contentId;
                // Check the required fields of content
                const missingFields = await this.service.version.check.contentFields(contentDetail.fileId, params.content);
                if (missingFields.length > 0) {
                    return Response.warning(app_config_1.i18n.content.contentMissFields + ':' + missingFields.join(','), 2111902);
                }
                // Check the validity of the version
                if (params.version && params.version !== versionDetail.version) {
                    const newVersionDetail = await this.service.version.info.getDetail({
                        contentId: versionDetail.id,
                        version: params.version,
                        deleted: false,
                    });
                    if (newVersionDetail && newVersionDetail.id !== versionDetail.id) {
                        return Response.warning(app_config_1.i18n.component.versionExist, 2111903);
                    }
                }
            }
            else {
                // Add meta update log if component meta updated
                if (((_a = params.content) === null || _a === void 0 ? void 0 : _a.meta) !== ((_b = versionDetail.content) === null || _b === void 0 ? void 0 : _b.meta)) {
                    ctx.operations.push(...this.service.log.addLogItem(constant_1.LOG.META_UPDATE, versionDetail, { fileId: contentDetail.fileId }));
                }
                !versionDetail.content.resource && (versionDetail.content.resource = {});
                versionDetail.content.id = versionDetail.content.id;
                versionDetail.content.resource['editor-entry'] = ((_d = (_c = params.content) === null || _c === void 0 ? void 0 : _c.resource) === null || _d === void 0 ? void 0 : _d['editor-entry']) || [];
                versionDetail.content.meta = ((_e = params.content) === null || _e === void 0 ? void 0 : _e.meta) || {};
            }
            // Save new version information
            const result = await this.service.component.updateVersionDetail({
                applicationId: params.applicationId,
                id: params.id,
                content: versionContent,
                version: params.version || versionDetail.version,
            }, { ctx });
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.component.missingFields + (result === null || result === void 0 ? void 0 : result.data).join(','), 2111904);
            }
            await this.service.version.info.runTransaction(ctx.transactions);
            const newVersionDetail = await this.service.version.info.getDetailById(params.id);
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.COMPONENT });
            return Response.success(newVersionDetail, 1111901);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.updateComponentVersionFailed, 3111901);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateComponentVersionDetail,
        description: '/component/version/detail',
        tags: ['Component'],
        operationId: 'update-component-version-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, component_validate_types_1.ComponentVersionUpdateReq]),
    __metadata("design:returntype", Promise)
], UpdateComponentVersionDetail.prototype, "index", null);
UpdateComponentVersionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], UpdateComponentVersionDetail);
exports.UpdateComponentVersionDetail = UpdateComponentVersionDetail;
