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
exports.GetTemplateLiveVersionDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetTemplateLiveVersionDetail = class GetTemplateLiveVersionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the live version details of the specified template content,
     * and return the details of the relation and the details of the component.
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    async index(params) {
        var _a, _b, _c;
        try {
            // Get the template content detail
            const contentDetail = await this.service.content.info.getDetailById(params.id);
            const liveVersionNumber = (contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.liveVersionNumber) || 0;
            if (liveVersionNumber === 0) {
                return Response.success({}, 1071901);
            }
            const versionDetail = await this.service.version.info.getDetail({ contentId: params.id, versionNumber: liveVersionNumber });
            const versionInfo = await this.service.version.info.getPageVersionInfo(versionDetail, { applicationId: params.applicationId });
            // Splicing return result
            versionDetail.content.extension = ((_a = versionInfo.mockObject[params.id]) === null || _a === void 0 ? void 0 : _a.extension) || {};
            versionDetail.content.dslVersion = versionDetail.dslVersion || constant_1.DSL_VERSION;
            const mockRelations = ((_b = versionInfo.mockObject[params.id]) === null || _b === void 0 ? void 0 : _b.relations) || {};
            versionInfo.relations = this.service.version.relation.moveMockRelations(versionInfo.relations, mockRelations);
            const pageLiveVersion = Object.assign({}, versionDetail, {
                relations: versionInfo.relations || {},
                mock: ((_c = versionInfo.mockObject[params.id]) === null || _c === void 0 ? void 0 : _c.mock) || {},
                components: versionInfo.componentList,
            });
            return Response.success(pageLiveVersion, 1071902);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.page.getPageBuildVersionFailed, 3071901);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/live-version'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getTemplateLiveVersion,
        description: '',
        tags: ['Template'],
        operationId: 'get-template-live-version',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.PageBuildVersionRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_validate_types_1.PageBuildVersionReq]),
    __metadata("design:returntype", Promise)
], GetTemplateLiveVersionDetail.prototype, "index", null);
GetTemplateLiveVersionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('templates'),
    __metadata("design:paramtypes", [])
], GetTemplateLiveVersionDetail);
exports.GetTemplateLiveVersionDetail = GetTemplateLiveVersionDetail;
