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
exports.GetMockBuildDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetMockBuildDetail = class GetMockBuildDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the build details of the specified mock content
     * @param  {PageBuildVersionReq} params
     * @returns {PageContentData[]}
     */
    async index(params) {
        var _a;
        try {
            const versionNumber = await this.service.version.number.getLatestVersionNumber(params.id);
            let contentVersion = await this.service.version.info.getDetail({ contentId: params.id, versionNumber });
            // Get relation information
            let relations = {};
            if ((_a = contentVersion === null || contentVersion === void 0 ? void 0 : contentVersion.content) === null || _a === void 0 ? void 0 : _a.relation) {
                const relationObject = await this.service.version.relation.getVersionRelations({ [contentVersion.contentId]: contentVersion }, false);
                relations = await this.service.relation.formatRelationResponse(relationObject);
            }
            return Response.success(Object.assign({ relations: relations }, contentVersion || {}), 1190401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.mock.getAppMockFailed, 3190401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/build-versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getMockBuildDetail,
        description: '',
        tags: ['Mock'],
        operationId: 'get-mock-build-version',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_validate_types_1.PageBuildVersionReq]),
    __metadata("design:returntype", Promise)
], GetMockBuildDetail.prototype, "index", null);
GetMockBuildDetail = __decorate([
    (0, routing_controllers_1.JsonController)('mocks'),
    __metadata("design:paramtypes", [])
], GetMockBuildDetail);
exports.GetMockBuildDetail = GetMockBuildDetail;
