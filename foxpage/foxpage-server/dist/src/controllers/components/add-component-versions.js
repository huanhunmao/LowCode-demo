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
exports.AddComponentVersionDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let AddComponentVersionDetail = class AddComponentVersionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create component version information
     * @param  {ContentVersionReq} params
     * @param  {Header} headers
     * @returns {ContentVersion}
     */
    async index(ctx, params) {
        try {
            // Permission check
            const hasAuth = await this.service.auth.content(params.contentId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4110101);
            }
            // Get versionNumber from version
            const versionNumber = this.service.version.number.createNumberFromVersion(params.version);
            if (!versionNumber) {
                return Response.warning(app_config_1.i18n.content.invalidVersion + ': "' + params.version + '"', 2110101);
            }
            // Check the validity of contents and versions
            let contentDetail;
            let isNewVersion = false;
            [contentDetail, isNewVersion] = await Promise.all([
                this.service.content.info.getDetailById(params.contentId),
                this.service.version.check.isNewVersion(params.contentId, versionNumber),
            ]);
            if (!contentDetail || contentDetail.deleted || !isNewVersion) {
                return Response.warning(app_config_1.i18n.content.invalidContentIdOrVersionExist, 2110102);
            }
            !lodash_1.default.isPlainObject(params.content) && (params.content = {});
            // Check the required fields of content
            const missingFields = await this.service.version.check.contentFields(contentDetail.fileId, params.content);
            if (missingFields.length > 0) {
                return Response.warning(app_config_1.i18n.content.contentMissFields + ':' + missingFields.join(','), 2110103);
            }
            params.content.id = params.contentId;
            // Save new version info
            const newVersionDetail = {
                id: (0, tools_1.generationId)(constant_1.PRE.CONTENT_VERSION),
                contentId: params.contentId,
                version: params.version,
                versionNumber: versionNumber,
                content: params.content,
            };
            this.service.version.info.create(newVersionDetail, { ctx });
            await this.service.version.info.runTransaction(ctx.transactions);
            const versionDetail = await this.service.version.info.getDetailById(newVersionDetail.id);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: newVersionDetail.id, type: constant_1.TYPE.COMPONENT });
            return Response.success(versionDetail, 1110101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.content.addContentVersionFailed, 3110101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addComponentVersionDetail,
        description: '',
        tags: ['Component'],
        operationId: 'add-component-version-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, content_validate_types_1.ContentVersionReq]),
    __metadata("design:returntype", Promise)
], AddComponentVersionDetail.prototype, "index", null);
AddComponentVersionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], AddComponentVersionDetail);
exports.AddComponentVersionDetail = AddComponentVersionDetail;
