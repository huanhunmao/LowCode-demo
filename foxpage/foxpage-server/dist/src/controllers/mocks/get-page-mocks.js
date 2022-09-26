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
exports.GetPageMockList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetPageMockList = class GetPageMockList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the information of the paging mock list under the file
     * if folderId is valid and type = all, return mock in special project and app
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    async index(params) {
        var _a, _b, _c, _d, _e, _f;
        try {
            let fileListPromise = [];
            let appFolderId = '';
            this.service.folder.info.setPageSize(params);
            if (params.folderId) {
                const folderDetail = await this.service.folder.info.getDetailById(params.folderId);
                if (!folderDetail || folderDetail.deleted || folderDetail.applicationId !== params.applicationId) {
                    return Response.warning(app_config_1.i18n.folder.invalidFolderId, 2190301);
                }
                fileListPromise.push(this.service.file.list.getFileListByFolderId(params.folderId, { type: constant_1.TYPE.MOCK }));
            }
            if (params.type !== constant_1.TYPE.PROJECT) {
                appFolderId = await this.service.folder.info.getAppTypeFolderId({
                    applicationId: params.applicationId,
                    type: constant_1.TYPE.MOCK,
                });
                fileListPromise.push(this.service.file.list.getFileListByFolderId(appFolderId, { type: constant_1.TYPE.MOCK }));
            }
            const fileList = lodash_1.default.flatten(await Promise.all(fileListPromise));
            let fileVersion = [];
            const pageFileList = lodash_1.default.chunk(fileList, params.size)[params.page - 1] || [];
            if (pageFileList.length > 0) {
                const appFileList = lodash_1.default.remove(pageFileList, (file) => file.folderId === appFolderId);
                // Get the live details of the content of the file
                let appContentList = [];
                let appVersionObject = {};
                let appVersionItemRelation = {};
                if (appFileList.length > 0) {
                    appContentList = await this.service.content.file.getContentByFileIds(lodash_1.default.map(pageFileList, 'id'));
                    appVersionObject = await this.service.version.list.getContentMaxVersionDetail(lodash_1.default.map(appContentList, 'id'));
                    appVersionItemRelation = await this.service.version.list.getVersionListRelations(lodash_1.default.toArray(appVersionObject));
                }
                let contentList = [];
                let versionObject = {};
                let versionItemRelation = {};
                if (pageFileList.length > 0) {
                    contentList = await this.service.content.file.getContentByFileIds(lodash_1.default.map(pageFileList, 'id'));
                    versionObject = await this.service.version.list.getContentMaxVersionDetail(lodash_1.default.map(contentList, 'id'));
                    versionItemRelation = await this.service.version.list.getVersionListRelations(lodash_1.default.toArray(versionObject), false);
                }
                // Splicing combination returns data
                const fileObject = lodash_1.default.keyBy(appFileList.concat(pageFileList), 'id');
                const allVersionItemRelations = lodash_1.default.merge(appVersionItemRelation, versionItemRelation);
                const allVersionObject = lodash_1.default.merge(appVersionObject, versionObject);
                for (const content of appContentList.concat(contentList)) {
                    const itemRelations = await this.service.relation.formatRelationDetailResponse(allVersionItemRelations[content.id]);
                    fileVersion.push({
                        id: (_a = fileObject === null || fileObject === void 0 ? void 0 : fileObject[content.fileId]) === null || _a === void 0 ? void 0 : _a.id,
                        name: (_b = fileObject === null || fileObject === void 0 ? void 0 : fileObject[content.fileId]) === null || _b === void 0 ? void 0 : _b.name,
                        type: (_c = fileObject === null || fileObject === void 0 ? void 0 : fileObject[content.fileId]) === null || _c === void 0 ? void 0 : _c.type,
                        version: ((_d = allVersionObject === null || allVersionObject === void 0 ? void 0 : allVersionObject[content.id]) === null || _d === void 0 ? void 0 : _d.version) || '',
                        versionNumber: content.liveVersionNumber || ((_e = allVersionObject === null || allVersionObject === void 0 ? void 0 : allVersionObject[content.id]) === null || _e === void 0 ? void 0 : _e.versionNumber),
                        contentId: content.id,
                        content: ((_f = allVersionObject === null || allVersionObject === void 0 ? void 0 : allVersionObject[content.id]) === null || _f === void 0 ? void 0 : _f.content) || {},
                        relations: itemRelations,
                    });
                }
            }
            return Response.success({
                pageInfo: {
                    total: fileList.length,
                    page: params.page,
                    size: params.size,
                },
                data: fileVersion,
            }, 1190301);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.mock.getPageMockFailed, 3190301);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppPageMocks,
        description: '',
        tags: ['Mock'],
        operationId: 'get-page-mock-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_validate_types_1.AppTypePageListCommonReq]),
    __metadata("design:returntype", Promise)
], GetPageMockList.prototype, "index", null);
GetPageMockList = __decorate([
    (0, routing_controllers_1.JsonController)('mock-searchs'),
    __metadata("design:paramtypes", [])
], GetPageMockList);
exports.GetPageMockList = GetPageMockList;
