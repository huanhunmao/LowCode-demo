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
exports.GetPageTemplateList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetPageTemplateList = class GetPageTemplateList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the paged template list information under the file
     * @param  {AppTypePageListCommonReq} params
     * @returns {ContentInfo}
     */
    async index(params) {
        try {
            // TODO search parameter not implemented
            if (params.folderId) {
                const folderDetail = await this.service.folder.info.getDetailById(params.folderId);
                if (!folderDetail || folderDetail.deleted || folderDetail.applicationId !== params.applicationId) {
                    return Response.warning(app_config_1.i18n.folder.invalidFolderId, 2070401);
                }
            }
            else {
                params.folderId = await this.service.folder.info.getAppTypeFolderId({
                    applicationId: params.applicationId,
                    type: constant_1.TYPE.PROJECT,
                });
            }
            this.service.file.info.setPageSize(params);
            const fileList = await this.service.file.list.getFileListByFolderId(params.folderId, {
                type: constant_1.TYPE.TEMPLATE,
            });
            let fileVersion = [];
            const pageFileList = lodash_1.default.chunk(fileList, params.size)[params.page - 1] || [];
            if (pageFileList.length > 0) {
                // Get the live details of the content of the file
                const contentList = await this.service.content.file.getContentByFileIds(lodash_1.default.map(pageFileList, 'id'));
                const versionList = await this.service.version.number.getContentByIdNumber(lodash_1.default.map(contentList, (content) => {
                    return { contentId: content.id, versionNumber: content.liveVersionNumber };
                }));
                const fileObject = lodash_1.default.keyBy(pageFileList, 'id');
                const versionObject = lodash_1.default.keyBy(versionList, 'contentId');
                contentList.forEach((content) => {
                    var _a, _b;
                    fileVersion.push({
                        id: fileObject === null || fileObject === void 0 ? void 0 : fileObject[content.fileId].id,
                        name: fileObject === null || fileObject === void 0 ? void 0 : fileObject[content.fileId].name,
                        type: fileObject === null || fileObject === void 0 ? void 0 : fileObject[content.fileId].type,
                        version: content.liveVersionNumber || ((_a = versionObject === null || versionObject === void 0 ? void 0 : versionObject[content.id]) === null || _a === void 0 ? void 0 : _a.versionNumber),
                        contentId: content.id,
                        content: ((_b = versionObject === null || versionObject === void 0 ? void 0 : versionObject[content.id]) === null || _b === void 0 ? void 0 : _b.content) || {},
                    });
                });
            }
            return Response.success({
                pageInfo: {
                    total: fileList.length,
                    page: params.page,
                    size: params.size,
                },
                data: fileVersion,
            }, 1070401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.template.getPageTemplateFailed, 3070401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppPageTemplates,
        description: '',
        tags: ['Template'],
        operationId: 'get-page-template-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_validate_types_1.AppTypePageListCommonReq]),
    __metadata("design:returntype", Promise)
], GetPageTemplateList.prototype, "index", null);
GetPageTemplateList = __decorate([
    (0, routing_controllers_1.JsonController)('template-searchs'),
    __metadata("design:paramtypes", [])
], GetPageTemplateList);
exports.GetPageTemplateList = GetPageTemplateList;
