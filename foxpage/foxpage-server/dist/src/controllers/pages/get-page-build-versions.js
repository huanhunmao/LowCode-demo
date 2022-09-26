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
exports.GetPageBuildVersionDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetPageBuildVersionDetail = class GetPageBuildVersionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the build version details of the specified page content,
     * and return the details of the relation and the details of the component
     * 1, Get the latest version of the page, if the version [does not exist/not base/deleted],
     *    add a new version (created on the basis of the latest valid version)
     * 2, Get the Live information of the template that the page depends on
     * 3, Get the components of the page/template
     * 4, get the editor of the components in 3 and the dependent components
     * 5, get the details of the components in 3 and 4
     * 6, Get the component's resource id list
     * 7, Get resource details by resource ID
     * 8, Get all the relation information details of the page through the page details
     * 9, encapsulate the returned relation list into {templates:[],variables:[]...} format
     * 10, Replace the resource ID on the page with resource details
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    async index(ctx, params) {
        var _a, _b, _c, _d;
        try {
            // Get the latest version of the page
            const versionDetail = await this.service.version.info.getMaxContentVersionDetail(params.id, { ctx, createNew: true });
            // Get the live information of the template that the page depends on
            const templateVersion = await this.service.version.info.getTemplateDetailFromPage(params.applicationId, versionDetail);
            const [versionInfo, templateVersionInfo] = await Promise.all([
                this.service.version.info.getPageVersionInfo(versionDetail, { applicationId: params.applicationId }),
                this.service.version.info.getPageVersionInfo(templateVersion, { applicationId: params.applicationId, isLive: true }),
            ]);
            await this.service.version.info.runTransaction(ctx.transactions);
            // add mock and extension to template
            if (versionInfo.relations.templates && versionInfo.relations.templates[0]) {
                versionInfo.relations.templates[0] = lodash_1.default.merge({}, versionInfo.relations.templates[0], templateVersionInfo.mockObject[versionInfo.relations.templates[0].id] || {});
            }
            // Splicing return result
            versionDetail.content.extension = ((_a = versionInfo.mockObject[params.id]) === null || _a === void 0 ? void 0 : _a.extension) || {};
            versionDetail.content.dslVersion = versionDetail.dslVersion || constant_1.DSL_VERSION;
            const mockRelations = ((_b = versionInfo.mockObject[params.id]) === null || _b === void 0 ? void 0 : _b.relations) || {};
            const mockTemplateRelations = ((_c = templateVersionInfo.mockObject[templateVersion.contentId]) === null || _c === void 0 ? void 0 : _c.relations) || {};
            versionInfo.relations = this.service.version.relation.moveMockRelations(versionInfo.relations, mockRelations);
            versionInfo.relations = this.service.version.relation.moveMockRelations(versionInfo.relations, mockTemplateRelations);
            const pageBuildVersion = Object.assign({}, versionDetail, {
                relations: versionInfo.relations || {},
                mock: ((_d = versionInfo.mockObject[params.id]) === null || _d === void 0 ? void 0 : _d.mock) || {},
                components: lodash_1.default.concat(versionInfo.componentList, templateVersionInfo.componentList),
            });
            return Response.success(pageBuildVersion, 1050401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.page.getPageBuildVersionFailed, 3050401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/build-versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getPageBuildVersion,
        description: '',
        tags: ['Page'],
        operationId: 'get-page-build-version',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.PageBuildVersionRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, page_validate_types_1.PageBuildVersionReq]),
    __metadata("design:returntype", Promise)
], GetPageBuildVersionDetail.prototype, "index", null);
GetPageBuildVersionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('pages'),
    __metadata("design:paramtypes", [])
], GetPageBuildVersionDetail);
exports.GetPageBuildVersionDetail = GetPageBuildVersionDetail;
