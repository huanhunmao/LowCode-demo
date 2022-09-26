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
exports.UpdateApplicationDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const app_validate_types_1 = require("../../types/validates/app-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let UpdateApplicationDetail = class UpdateApplicationDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update application details, only application name, introduction and locales can be updated
     * @param  {UpdateAppReq} params
     * @returns Application
     */
    async index(ctx, params) {
        try {
            // Check the validity of the application
            let appDetail = await this.service.application.getDetailById(params.applicationId);
            if (!appDetail || appDetail.deleted) {
                return Response.warning(app_config_1.i18n.app.invalidAppId, 2031001);
            }
            // Permission check
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4031001);
            }
            // Check whether the updated application slug already exists
            if (params.slug && params.slug !== appDetail.slug) {
                const organizationId = appDetail.organizationId;
                const duplicationAppDetail = await this.service.application.getDetail({
                    organizationId,
                    slug: params.slug,
                });
                if (!lodash_1.default.isEmpty(duplicationAppDetail) && !duplicationAppDetail.deleted) {
                    return Response.warning(app_config_1.i18n.app.appSlugExist, 2031002);
                }
            }
            // Update application information, only allow the specified fields to be updated
            const appInfo = lodash_1.default.pick(params, ['name', 'intro', 'host', 'slug', 'locales', 'resources']);
            // Check the validity of the updated resources
            if (appInfo.resources && appInfo.resources.length > 0) {
                const checkResult = this.service.application.checkAppResourceUpdate(appDetail.resources || [], appInfo.resources);
                if (checkResult.code === 1) {
                    return Response.warning(app_config_1.i18n.app.resourceUnDeleted + ':' + checkResult.data.join(','), 2031003);
                }
                else if (checkResult.code === 2) {
                    return Response.warning(app_config_1.i18n.app.resourceDuplication + ':' + checkResult.data.join(','), 2031004);
                }
                else if (checkResult.code === 3) {
                    return Response.warning(app_config_1.i18n.app.resourceTypeUnEditable + ':' + checkResult.data.join(','), 2031005);
                }
                else if (checkResult.code === 4) {
                    return Response.warning(app_config_1.i18n.app.invalidResourceIds + ':' + checkResult.data.join(','), 2031006);
                }
                appInfo.resources.forEach((resource) => {
                    resource.id = resource.id || (0, tools_1.generationId)(constant_1.PRE.RESOURCE);
                });
            }
            await this.service.application.updateDetail(params.applicationId, appInfo);
            const newAppDetail = await this.service.application.getDetailById(params.applicationId);
            // Save logs
            ctx.logAttr = Object.assign(ctx.logAttr, { id: params.applicationId, type: constant_1.TYPE.APPLICATION });
            ctx.operations.push({
                action: constant_1.LOG.UPDATE,
                actionType: [constant_1.LOG.UPDATE, constant_1.TYPE.APPLICATION].join('_'),
                category: {
                    type: constant_1.LOG.CATEGORY_APPLICATION,
                    applicationId: params.applicationId,
                    organizationId: appDetail.organizationId,
                },
                content: { id: params.applicationId, before: appDetail, after: newAppDetail },
            });
            return Response.success(newAppDetail, 1031001);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.app.updateDetailFailed, 3031001);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateAppDetail,
        description: '',
        tags: ['Application'],
        operationId: 'update-application-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(app_validate_types_1.AppDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, app_validate_types_1.UpdateAppReq]),
    __metadata("design:returntype", Promise)
], UpdateApplicationDetail.prototype, "index", null);
UpdateApplicationDetail = __decorate([
    (0, routing_controllers_1.JsonController)('applications'),
    __metadata("design:paramtypes", [])
], UpdateApplicationDetail);
exports.UpdateApplicationDetail = UpdateApplicationDetail;
