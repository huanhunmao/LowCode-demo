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
exports.UpdateAuthorizeDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const authorize_validate_types_1 = require("../../types/validates/authorize-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let UpdateAuthorizeDetail = class UpdateAuthorizeDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * update the target id auth mask
     * @param  {UpdateAuthReq} params
     * @returns {any}
     */
    async index(ctx, params) {
        try {
            if (!params.ids || params.ids.length === 0) {
                return Response.warning(app_config_1.i18n.auth.invalidAuthIds, 2180201);
            }
            const authList = await this.service.auth.getDetailByIds(params.ids);
            const authTypes = lodash_1.default.uniq(lodash_1.default.map(authList, 'type'));
            const authTypeIds = lodash_1.default.uniq(lodash_1.default.map(authList, 'typeId'));
            if (authTypes.length !== 1 || authTypeIds.length !== 1) {
                return Response.warning(app_config_1.i18n.auth.updateOneTypeTargetAuth, 2180202);
            }
            // check current user has auth to set or not
            const hasAuth = await this.service.auth.checkTypeIdAuthorize({ type: authTypes[0], typeId: authTypeIds[0] }, { ctx, mask: 1 });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4180201);
            }
            await this.service.auth.batchUpdateDetail(params.ids, Object.assign({ creator: ctx.userInfo.id, deleted: false }, lodash_1.default.pick(params, ['mask', 'allow'])));
            return Response.success(app_config_1.i18n.auth.updateAuthorizeDetailSuccess, 1180201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.auth.updateAuthorizedFailed, 3180201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateAuthorizeDetail,
        description: '',
        tags: ['Authorize'],
        operationId: 'update-authorize-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(authorize_validate_types_1.AuthDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, authorize_validate_types_1.UpdateAuthReq]),
    __metadata("design:returntype", Promise)
], UpdateAuthorizeDetail.prototype, "index", null);
UpdateAuthorizeDetail = __decorate([
    (0, routing_controllers_1.JsonController)('authorizes'),
    __metadata("design:paramtypes", [])
], UpdateAuthorizeDetail);
exports.UpdateAuthorizeDetail = UpdateAuthorizeDetail;
