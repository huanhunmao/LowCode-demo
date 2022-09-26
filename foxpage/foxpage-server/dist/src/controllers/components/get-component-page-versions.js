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
exports.GetComponentPageVersionList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetComponentPageVersionList = class GetComponentPageVersionList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the paging list of components under the application
     * @param  {AppPageListCommonReq} params
     * @returns {FileUserInfo}
     */
    async index(params) {
        var _a, _b, _c, _d, _e, _f;
        try {
            this.service.content.info.setPageSize(params);
            let fileId = params.id;
            // Check if file is a reference component
            const fileDetail = await this.service.file.info.getDetailById(fileId);
            if (fileDetail.tags && ((_b = (_a = fileDetail.tags) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) === constant_1.TAG.DELIVERY_REFERENCE) {
                fileId = (_e = (_d = (_c = fileDetail.tags) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.reference) === null || _e === void 0 ? void 0 : _e.id;
            }
            // Get the content ID under the file
            const contentDetail = await this.service.content.info.getDetail({ fileId, deleted: false });
            if (!contentDetail) {
                return Response.warning(app_config_1.i18n.component.invalidFileId, 2110901);
            }
            const versionList = await this.service.version.list.getVersionList({
                contentId: contentDetail.id,
                deleted: false,
            });
            const versionContents = lodash_1.default.map(versionList, version => version.content);
            const componentIds = this.service.content.component.getComponentResourceIds(versionContents);
            const [resourceObject, contentAllParents] = await Promise.all([
                this.service.content.resource.getResourceContentByIds(componentIds),
                this.service.content.list.getContentAllParents(componentIds),
            ]);
            const appResource = await this.service.application.getAppResourceFromContent(contentAllParents);
            const contentResource = this.service.content.info.getContentResourceTypeInfo(appResource, contentAllParents);
            let contentVersionList = [];
            for (const version of versionList) {
                version.content.resource = this.service.version.component.assignResourceToComponent(((_f = version === null || version === void 0 ? void 0 : version.content) === null || _f === void 0 ? void 0 : _f.resource) || {}, resourceObject, { contentResource });
                contentVersionList.push(Object.assign({
                    isLiveVersion: version.versionNumber === contentDetail.liveVersionNumber,
                }, version));
            }
            return Response.success({
                data: lodash_1.default.chunk(contentVersionList, params.size)[params.page - 1] || [],
                pageInfo: {
                    page: params.page,
                    size: params.size,
                    total: contentVersionList.length,
                },
            }, 1110901);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.getComponentPageVersionListFailed, 3110901);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/version-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getComponentPageVersionList,
        description: '',
        tags: ['Component'],
        operationId: 'get-component-page-version-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [component_validate_types_1.AppComponentVersionListReq]),
    __metadata("design:returntype", Promise)
], GetComponentPageVersionList.prototype, "index", null);
GetComponentPageVersionList = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], GetComponentPageVersionList);
exports.GetComponentPageVersionList = GetComponentPageVersionList;
