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
exports.UserRegister = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const Service = __importStar(require("../../services"));
const user_validate_types_1 = require("../../types/validates/user-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let UserRegister = class UserRegister extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * User registration
     * @param  {RegisterReq} params
     * @returns {User}
     */
    async index(ctx, params) {
        try {
            // Check the validity of the name and email address
            if (!(0, tools_1.checkName)(params.account)) {
                return Response.warning(app_config_1.i18n.user.invalidName, 2060601);
            }
            if (!(0, tools_1.checkEmail)(params.email)) {
                return Response.warning(app_config_1.i18n.user.invalidEmail, 2060602);
            }
            // Check if the username already exists
            const userInfo = {
                account: params.account,
                password: params.password,
                email: params.email || '',
                registerType: 1,
            };
            // Save new user information
            const result = await Service.user.register(userInfo, { ctx });
            if (!result.account) {
                return Response.warning(app_config_1.i18n.user.exist, 2060603);
            }
            return Response.success(result || {}, 1060601);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.user.registerFailed, 3060601);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/register'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.userRegister,
        description: '',
        tags: ['User'],
        operationId: 'user-register',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(user_validate_types_1.RegisterRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_validate_types_1.RegisterReq]),
    __metadata("design:returntype", Promise)
], UserRegister.prototype, "index", null);
UserRegister = __decorate([
    (0, routing_controllers_1.JsonController)('users'),
    __metadata("design:paramtypes", [])
], UserRegister);
exports.UserRegister = UserRegister;
