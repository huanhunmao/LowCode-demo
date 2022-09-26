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
exports.GetResourceVersionList = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
/**
 *
 * @export
 * @class GetVersionList
 * @extends {BaseController}
 */
let GetResourceVersionList = class GetResourceVersionList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the version list of the page
     * @param  {ContentVersionListReq} params
     * @returns {ContentVersionInfo}
     */
    async index(params) {
        try {
            // Check the validity of the page
            const contentDetail = await this.service.content.info.getDetailById(params.id);
            if (!contentDetail || contentDetail.deleted) {
                return Response.warning(app_config_1.i18n.content.invalidContentId, 2121301);
            }
            // Get a list of all valid versions
            const versionList = await this.service.version.list.getVersionList({ contentId: params.id });
            return Response.success(versionList, 1121301);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.content.getContentVersionListFailed, 3121301);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getResourceVersionList,
        description: '',
        tags: ['Resource'],
        operationId: 'get-resource-version-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_validate_types_1.ContentVersionListReq]),
    __metadata("design:returntype", Promise)
], GetResourceVersionList.prototype, "index", null);
GetResourceVersionList = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], GetResourceVersionList);
exports.GetResourceVersionList = GetResourceVersionList;
