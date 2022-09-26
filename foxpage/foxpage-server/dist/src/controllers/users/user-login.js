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
exports.UserLogin = void 0;
require("reflect-metadata");
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const user_validate_types_1 = require("../../types/validates/user-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let UserLogin = class UserLogin extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * User account login
     * @param  {LoginReq} params
     * @returns {LoginResData}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            // Decrypt password
            const userLoginInfo = {
                account: params.account,
                password: params.password,
            };
            // Check the validity of login information
            const loginStatus = await this.service.user.checkLogin(userLoginInfo, { ctx });
            // Login failed
            if (!loginStatus) {
                return Response.warning(app_config_1.i18n.user.namePwdError, 2060501);
            }
            // Get user base and org info
            const userInfo = await this.service.user.getUserDetailByAccount(params.account);
            const userOrgInfo = await this.service.org.getUserOrgById(userInfo.id || '');
            // Create token
            const privateKey = fs_1.default.readFileSync('./config/keys/private-key.pem');
            const token = jsonwebtoken_1.default.sign({
                id: userInfo.id,
                account: userInfo.account,
            }, privateKey, { expiresIn: 86400 * 100, algorithm: 'RS256' });
            return Response.success({
                userInfo: Object.assign({ organizationId: (userOrgInfo === null || userOrgInfo === void 0 ? void 0 : userOrgInfo.id) || '' }, lodash_1.default.pick(userInfo, ['id', 'account', 'email', 'nickName', 'changePwdStatus'])),
                token,
            }, 1060501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.user.loginFailed, 3060501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/login'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.userLogin,
        description: '',
        tags: ['User'],
        operationId: 'user-login',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(user_validate_types_1.LoginRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_validate_types_1.LoginReq]),
    __metadata("design:returntype", Promise)
], UserLogin.prototype, "index", null);
UserLogin = __decorate([
    (0, routing_controllers_1.JsonController)('users'),
    __metadata("design:paramtypes", [])
], UserLogin);
exports.UserLogin = UserLogin;
