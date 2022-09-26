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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = void 0;
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const foxpage_shared_1 = require("@foxpage/foxpage-shared");
const app_config_1 = require("../../app.config");
const constant_1 = require("../../config/constant");
const Service = __importStar(require("../services"));
const tools_1 = require("../utils/tools");
const logger = (0, foxpage_shared_1.createLogger)('server');
let LoggerMiddleware = class LoggerMiddleware {
    async use(ctx, next) {
        var _a, _b;
        const params = !lodash_1.default.isEmpty(ctx.request.body) ? ctx.request.body : ctx.request.query;
        ctx.operations = [];
        ctx.transactions = [];
        //@ts-ignore
        ctx.logAttr = { transactionId: (0, tools_1.generationId)(constant_1.PRE.TRAN), applicationId: params.applicationId || '' };
        ctx.userInfo = { id: '', account: '' };
        ctx.lang = ((_a = ctx.request.header) === null || _a === void 0 ? void 0 : _a.lang) || 'en'; // response language
        ctx.log = {
            requestTime: new Date().getTime(),
            responseTime: 0,
            tooks: 0,
            originUrl: ((_b = ctx.request.header) === null || _b === void 0 ? void 0 : _b.url) || '',
            request: lodash_1.default.pick(ctx.request, ['method', 'path', 'query', 'body']),
            user: '',
        };
        try {
            await next();
        }
        catch (err) {
            const error = err;
            // Return wrong result
            if (app_config_1.config.env === 'development') {
                console.log(err);
                console.log('from log middleware: ' + error.message);
            }
            if (error.httpCode === constant_1.RESPONSE_LEVEL.ACCESS_DENY) {
                ctx.body = {
                    code: constant_1.RESPONSE_LEVEL.ACCESS_DENY,
                    msg: app_config_1.i18n.system.accessDeny,
                };
            }
            else {
                ctx.body = {
                    code: constant_1.RESPONSE_LEVEL.WARNING,
                    msg: error.message,
                    err: error.errors || {},
                };
            }
        }
        finally {
            if (!ctx.body) {
                ctx.response.status = constant_1.RESPONSE_LEVEL.NOT_FOUND;
                ctx.body = { code: constant_1.RESPONSE_LEVEL.NOT_FOUND, msg: 'API Not Found' };
            }
            // Save logs
            ctx.log.responseTime = new Date().getTime();
            ctx.log.response = ctx.body;
            ctx.log.tooks = ctx.log.responseTime - ctx.log.requestTime;
            ctx.body.code === constant_1.RESPONSE_LEVEL.SUCCESS && Service.log.saveChangeLogs(ctx);
            // Save log to db
            if (app_config_1.config.env !== 'test' && ctx.request.url !== '/healthcheck') {
                try {
                    Service.log.saveRequest({ ctx });
                }
                catch (err) {
                    console.log('Save log error:' + err.message);
                }
            }
            if (app_config_1.config.env === 'development') {
                // Print request information to the console
                const logLevel = ctx.body.code === constant_1.RESPONSE_LEVEL.SUCCESS
                    ? constant_1.LOGGER_LEVEL.INFO
                    : ctx.body.code < constant_1.RESPONSE_LEVEL.ERROR
                        ? constant_1.LOGGER_LEVEL.WARN
                        : constant_1.LOGGER_LEVEL.ERROR;
                logger.log(logLevel, ctx.body.msg || '', [
                    ctx.request.method,
                    ctx.request.path,
                    ctx.body.code || 0,
                    ctx.log.tooks + 'ms',
                ]);
                const mmry = process.memoryUsage();
                const heapTotal = Math.round((mmry.heapTotal / (1024 * 1024)) * 100) / 100 + ' Mb';
                const heapUsed = Math.round((mmry.heapUsed / (1024 * 1024)) * 100) / 100 + ' Mb';
                const rss = Math.round((mmry.rss / (1024 * 1024)) * 100) / 100 + ' Mb';
                console.log(ctx.request.method + ' ' + ctx.request.path, 'heapTotal: ' +
                    heapTotal +
                    ', heapUsed: ' +
                    heapUsed +
                    ', rss: ' +
                    rss +
                    ', tooks: ' +
                    ctx.log.tooks +
                    ', status: ' +
                    ctx.body.code);
            }
        }
    }
};
LoggerMiddleware = __decorate([
    (0, routing_controllers_1.Middleware)({ type: 'before' })
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
