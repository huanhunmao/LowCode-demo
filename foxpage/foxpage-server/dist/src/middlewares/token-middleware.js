"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMiddleware = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routing_controllers_1 = require("routing-controllers");
const app_config_1 = require("../../app.config");
let TokenMiddleware = class TokenMiddleware {
    async use(ctx, next) {
        var _a;
        // No need to verify the interface of the token
        // Get request token
        const jwtToken = ((_a = ctx.request.header) === null || _a === void 0 ? void 0 : _a.token) || '';
        // Parse the token
        let jwtTokenInfo = {};
        try {
            const publicKey = fs_1.default.readFileSync('./config/keys/public-key.pem');
            jwtTokenInfo = jsonwebtoken_1.default.verify(jwtToken, publicKey, { algorithms: ['RS256'] });
        }
        catch (err) {
            jwtTokenInfo = {};
        }
        const currentTime = new Date().getTime();
        if ((!jwtTokenInfo.account || currentTime > jwtTokenInfo.exp * 1000) &&
            app_config_1.config.ignoreTokenPath.indexOf(ctx.request.path) === -1) {
            ctx.body = { code: 401, msg: app_config_1.i18n.system.invalidAccount };
        }
        else {
            // Add user information to ctx
            ctx.userInfo = { id: jwtTokenInfo.id || '', account: jwtTokenInfo.account || '' };
            ctx.log.user = jwtTokenInfo.account || '';
            await next();
        }
    }
};
TokenMiddleware = __decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before' })
], TokenMiddleware);
exports.TokenMiddleware = TokenMiddleware;
