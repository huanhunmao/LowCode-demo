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
exports.BatchSetComponentLiveVersions = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let BatchSetComponentLiveVersions = class BatchSetComponentLiveVersions extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Set the live version of the components
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    async index(ctx, params) {
        var _a;
        try {
            // Permission check
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4112201);
            }
            const contentIds = lodash_1.default.map(params.idVersions, 'id');
            // Check component content id
            const [contentFileObject, versionList] = await Promise.all([
                this.service.file.list.getContentFileByIds(contentIds),
                this.service.version.list.getContentInfoByIdAndVersion(lodash_1.default.map(params.idVersions, (idVersion) => {
                    return { contentId: idVersion.id, version: idVersion.version };
                }))
            ]);
            const notInApps = [];
            const invalidComponents = [];
            for (const contentId in contentFileObject) {
                if (contentFileObject[contentId].deleted !== false) {
                    invalidComponents.push(contentId);
                }
                if (contentFileObject[contentId].applicationId !== params.applicationId) {
                    notInApps.push(contentId);
                }
            }
            if (invalidComponents.length > 0) {
                return Response.warning(app_config_1.i18n.component.invalidContentId + ': ' + invalidComponents.join(', '), 211201);
            }
            if (notInApps.length > 0) {
                return Response.warning(app_config_1.i18n.component.componentNotInApp + ': ' + notInApps.join(', '), 2112202);
            }
            const invalidVersion = lodash_1.default.difference(contentIds, lodash_1.default.map(versionList, 'contentId'));
            const notBaseVersions = [];
            versionList.forEach(version => {
                if (version.status !== constant_1.VERSION.STATUS_BASE) {
                    notBaseVersions.push(version.contentId);
                }
            });
            if (invalidVersion.length > 0) {
                return Response.warning(app_config_1.i18n.component.invalidVersionId + ': ' + invalidVersion.join(','), 2112203);
            }
            // if (notBaseVersions.length > 0) {
            //   return Response.warning(i18n.component.invalidVersionStatus + ': ' + notBaseVersions.join(', '), 2112204);
            // }
            // Set version release status, and content live version
            ctx.transactions.push(this.service.version.info.batchUpdateDetailQuery({ id: { $in: lodash_1.default.map(versionList, 'id') } }, { status: constant_1.VERSION.STATUS_RELEASE }));
            for (const idVersion of params.idVersions) {
                const versionNumber = this.service.version.number.createNumberFromVersion(idVersion.version);
                this.service.content.live.setLiveContent(idVersion.id, versionNumber, { ctx });
                await this.service.component.updateReferLiveVersion(idVersion.id, (_a = contentFileObject[idVersion.id]) === null || _a === void 0 ? void 0 : _a.id, { ctx });
            }
            await this.service.content.info.runTransaction(ctx.transactions);
            return Response.success('Set component live version success', 1112201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.setComponentContentLiveFailed, 3112201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/batch-live-versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.setComponentContentLive,
        description: '',
        tags: ['Component'],
        operationId: 'batch-set-component-live-versions',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, component_validate_types_1.BatchLiveReq]),
    __metadata("design:returntype", Promise)
], BatchSetComponentLiveVersions.prototype, "index", null);
BatchSetComponentLiveVersions = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], BatchSetComponentLiveVersions);
exports.BatchSetComponentLiveVersions = BatchSetComponentLiveVersions;
