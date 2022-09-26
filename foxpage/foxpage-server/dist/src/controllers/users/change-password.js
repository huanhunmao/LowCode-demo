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
exports.AddUsers = void 0;
require("reflect-metadata");
const crypto_1 = __importDefault(require("crypto"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const user_validate_types_1 = require("../../types/validates/user-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let AddUsers = class AddUsers extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * User modify password
     * @param  {AddUserReq} params
     * @returns {AddUserResData}
     */
    async index(ctx, params) {
        try {
            // Check permissions
            const userInfo = ctx.userInfo || {};
            if (userInfo.id !== params.id) {
                return Response.warning(app_config_1.i18n.user.canNotChangeCurrentPwd, 2060201);
            }
            // Check the validity of the original password
            const validOldPwd = await this.service.user.checkLogin({
                account: (userInfo === null || userInfo === void 0 ? void 0 : userInfo.account) || '',
                password: params.oldPassword,
            }, { ctx });
            if (!validOldPwd) {
                return Response.warning(app_config_1.i18n.user.invalidOldPwd, 2060202);
            }
            // 更新密码
            await this.service.user.updateDetail(params.id, {
                password: crypto_1.default
                    .createHash('md5')
                    .update(params.newPassword)
                    .digest('hex'),
            });
            return Response.success(app_config_1.i18n.user.pwdChangeSuccess, 1060201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.user.pwdChangeFailed, 3060201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/password'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.changeUserPassword,
        description: '',
        tags: ['User'],
        operationId: 'update-user-password',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(user_validate_types_1.AddUserRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_validate_types_1.UpdateUserPassword]),
    __metadata("design:returntype", Promise)
], AddUsers.prototype, "index", null);
AddUsers = __decorate([
    (0, routing_controllers_1.JsonController)('users'),
    __metadata("design:paramtypes", [])
], AddUsers);
exports.AddUsers = AddUsers;
