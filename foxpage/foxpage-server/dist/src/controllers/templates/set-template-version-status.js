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
exports.SetTemplateVersionStatus = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let SetTemplateVersionStatus = class SetTemplateVersionStatus extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Set template content version deletion status
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    async index(ctx, params) {
        params.status = true; // Currently it is mandatory to only allow delete operations
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.DELETE, type: constant_1.TYPE.TEMPLATE });
            const hasAuth = await this.service.auth.version(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4071501);
            }
            const result = await this.service.version.info.setVersionDeleteStatus(params, {
                ctx,
                actionType: [constant_1.LOG.DELETE, constant_1.TYPE.TEMPLATE].join('_'),
            });
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.template.invalidVersionId, 2071501);
            }
            else if (result.code === 2) {
                return Response.warning(app_config_1.i18n.template.versionCannotBeDeleted, 2071502);
            }
            await this.service.version.info.runTransaction(ctx.transactions);
            const versionDetail = await this.service.version.info.getDetailById(params.id);
            return Response.success(versionDetail, 1071501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.template.setTemplateVersionDeletedFailed, 3071501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/version-status'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.setTemplateVersionStatus,
        description: '',
        tags: ['Template'],
        operationId: 'set-template-version-status',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, content_validate_types_1.AppContentStatusReq]),
    __metadata("design:returntype", Promise)
], SetTemplateVersionStatus.prototype, "index", null);
SetTemplateVersionStatus = __decorate([
    (0, routing_controllers_1.JsonController)('templates'),
    __metadata("design:paramtypes", [])
], SetTemplateVersionStatus);
exports.SetTemplateVersionStatus = SetTemplateVersionStatus;
