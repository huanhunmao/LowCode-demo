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
exports.SetComponentLiveVersions = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let SetComponentLiveVersions = class SetComponentLiveVersions extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Set the live version of the component
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    async index(ctx, params) {
        try {
            // Permission check
            const hasAuth = await this.service.auth.content(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4111501);
            }
            const contentDetail = await this.service.content.info.getDetailById(params.id);
            // set component live and update reference component's application status
            const [result] = await Promise.all([
                this.service.content.live.setLiveVersion(params, { ctx }),
                this.service.component.updateReferLiveVersion(contentDetail.id, contentDetail.fileId, { ctx }),
            ]);
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.content.invalidVersionId, 2111501);
            }
            else if (result.code === 2) {
                return Response.warning(app_config_1.i18n.content.versionIsNotReleaseStatus, 2111502);
            }
            else if (result.code === 3) {
                const contentResult = JSON.parse(result.data);
                if (contentResult.code === 1) {
                    return Response.warning(app_config_1.i18n.content.ComponentInfoNotExist + ':' + contentResult.data.join(','), 2111503);
                }
                else if (contentResult.code === 2) {
                    return Response.warning(app_config_1.i18n.content.ComponentDependRecursive + ':' + contentResult.data, 2111504);
                }
            }
            await this.service.version.live.runTransaction(ctx.transactions);
            const versionDetail = await this.service.content.info.getDetailById(params.id);
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.COMPONENT });
            return Response.success(versionDetail, 1111501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.setComponentContentLiveFailed, 3111501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/live-versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.setComponentContentLive,
        description: '',
        tags: ['Component'],
        operationId: 'set-component-live-versions',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, content_validate_types_1.AppContentLiveReq]),
    __metadata("design:returntype", Promise)
], SetComponentLiveVersions.prototype, "index", null);
SetComponentLiveVersions = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], SetComponentLiveVersions);
exports.SetComponentLiveVersions = SetComponentLiveVersions;
