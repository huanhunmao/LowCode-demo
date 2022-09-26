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
exports.UpdateVariableContentDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let UpdateVariableContentDetail = class UpdateVariableContentDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update the content information of variables, including title and tags fields
     * @param  {UpdateContentReq} params
     * @returns {Content}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.VARIABLE });
            const hasAuth = await this.service.auth.content(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4081201);
            }
            const result = await this.service.content.info.updateContentDetail(Object.assign({}, params, { type: constant_1.TYPE.VARIABLE }), { ctx, actionType: [constant_1.LOG.UPDATE, constant_1.TYPE.VARIABLE].join('_') });
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.variable.invalidVariableContentId, 2081201);
            }
            else if (result.code === 2) {
                return Response.warning(app_config_1.i18n.variable.invalidIdType, 2081202);
            }
            else if (result.code === 3) {
                return Response.warning(app_config_1.i18n.variable.variableNameExist, 2081203);
            }
            await this.service.content.info.runTransaction(ctx.transactions);
            const contentDetail = await this.service.content.info.getDetailById(params.id);
            return Response.success(contentDetail, 1081201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.variable.updateVariableContentFailed, 3081201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/contents'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateVariableContentDetail,
        description: '',
        tags: ['Variable'],
        operationId: 'update-variable-content-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, content_validate_types_1.UpdateContentReq]),
    __metadata("design:returntype", Promise)
], UpdateVariableContentDetail.prototype, "index", null);
UpdateVariableContentDetail = __decorate([
    (0, routing_controllers_1.JsonController)('variables'),
    __metadata("design:paramtypes", [])
], UpdateVariableContentDetail);
exports.UpdateVariableContentDetail = UpdateVariableContentDetail;
