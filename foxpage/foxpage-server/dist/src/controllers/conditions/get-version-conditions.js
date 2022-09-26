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
exports.GetVersionDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetVersionDetail = class GetVersionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get details of the version specified by the condition
     * @param  {PageContentVersionDetailReq} params
     * @returns {ContentVersion}
     */
    async index(params) {
        try {
            if (!params.contentId) {
                return Response.warning(app_config_1.i18n.content.invalidVersionIdOrVersion, 2100601);
            }
            params.versionNumber = params.versionNumber;
            const versionDetail = await this.service.version.info.getContentVersionDetail(params);
            versionDetail.isLiveVersion = false;
            // Add isLive field
            if (versionDetail) {
                const contentDetail = await this.service.content.info.getDetailById(versionDetail.contentId);
                versionDetail.isLiveVersion = contentDetail.liveVersionNumber === versionDetail.versionNumber;
            }
            return Response.success(versionDetail, 1100601);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.content.getConditionVersionDetailFailed, 3100601);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getConditionVersionDetail,
        description: '',
        tags: ['Condition'],
        operationId: 'get-condition-version-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_validate_types_1.PageContentVersionDetailReq]),
    __metadata("design:returntype", Promise)
], GetVersionDetail.prototype, "index", null);
GetVersionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('conditions'),
    __metadata("design:paramtypes", [])
], GetVersionDetail);
exports.GetVersionDetail = GetVersionDetail;
