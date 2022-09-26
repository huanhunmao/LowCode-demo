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
exports.UpdateTemplateVersionDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let UpdateTemplateVersionDetail = class UpdateTemplateVersionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update template content version information, including version number and content
     * @param  {ContentVersionUpdateReq} params
     * @returns {ContentVersion}
     */
    async index(ctx, params) {
        var _a, _b;
        try {
            const hasAuth = await this.service.auth.content(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4071801);
            }
            const checkResult = this.service.version.check.structure(params.content || {});
            if (checkResult.code !== 0) {
                if (checkResult.code === 1) {
                    return Response.warning(app_config_1.i18n.page.invalidPageContentId + ':' + (checkResult === null || checkResult === void 0 ? void 0 : checkResult.msg) || '', 2071801);
                }
                else if (checkResult.code === 2) {
                    return Response.warning(app_config_1.i18n.page.invalidRelationFormat + ':' + (checkResult === null || checkResult === void 0 ? void 0 : checkResult.msg) || '', 2071802);
                }
                else if (checkResult.code === 3) {
                    return Response.warning(app_config_1.i18n.page.invalidStructureNames + ':' + (checkResult === null || checkResult === void 0 ? void 0 : checkResult.msg) || '', 2071803);
                }
            }
            const mockId = ((_b = (_a = params.content) === null || _a === void 0 ? void 0 : _a.extension) === null || _b === void 0 ? void 0 : _b.mockId) || '';
            params.content = lodash_1.default.omit(params.content || {}, ['extension']);
            let result = {};
            [result] = await Promise.all([
                this.service.version.info.updateVersionDetail(params, {
                    ctx,
                    actionType: [constant_1.LOG.UPDATE, constant_1.TYPE.TEMPLATE].join('_'),
                }),
                this.service.content.tag.updateExtensionTag(params.id, { mockId }, { ctx }),
            ]);
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.template.invalidVersionId, 2071804);
            }
            else if (result.code === 2) {
                return Response.warning(app_config_1.i18n.template.unEditedStatus, 2071805);
            }
            else if (result.code === 3) {
                return Response.warning(app_config_1.i18n.template.versionExist, 2071806);
            }
            else if (result.code === 4) {
                return Response.warning(app_config_1.i18n.template.missingFields + ':' + result.data.join(','), 2071807);
            }
            else if (result.code === 4) {
                return Response.warning(app_config_1.i18n.template.invalidRelations + ':' + result.data.join(','), 2071808);
            }
            await this.service.version.info.runTransaction(ctx.transactions);
            const versionDetail = await this.service.version.info.getDetailById(result.data);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: result.data, type: constant_1.TYPE.TEMPLATE });
            return Response.success(versionDetail, 1071801);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.template.updateTemplateVersionFailed, 3071801);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateTemplateVersionDetail,
        description: '/template/version/detail',
        tags: ['Template'],
        operationId: 'update-template-version-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, content_validate_types_1.ContentVersionUpdateReq]),
    __metadata("design:returntype", Promise)
], UpdateTemplateVersionDetail.prototype, "index", null);
UpdateTemplateVersionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('templates'),
    __metadata("design:paramtypes", [])
], UpdateTemplateVersionDetail);
exports.UpdateTemplateVersionDetail = UpdateTemplateVersionDetail;
