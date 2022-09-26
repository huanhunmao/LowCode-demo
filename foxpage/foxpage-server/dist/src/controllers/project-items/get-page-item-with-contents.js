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
exports.GetPageProjectItemListWithContents = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
const typeMap = {
    'page-content': constant_1.TYPE.PAGE,
    'template-content': constant_1.TYPE.TEMPLATE,
};
let GetPageProjectItemListWithContents = class GetPageProjectItemListWithContents extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the page items with content list under application
     * if the project id is valid, response items under project
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    async index(ctx, params) {
        try {
            const apiType = this.getRoutePath(ctx.request.url, typeMap, 2);
            const searchParams = {
                applicationId: params.applicationId,
                deleted: false,
                type: apiType,
            };
            if (params.projectId) {
                searchParams.folderId = params.projectId;
            }
            if (params.search) {
                searchParams['$or'] = [{ name: { $regex: new RegExp(params.search, 'i') } }, { id: params.search }];
            }
            const pageSize = this.service.file.list.setPageSize(params);
            const [counts, fileList] = await Promise.all([
                this.service.file.list.getCount(searchParams),
                this.service.file.list.find(searchParams, '', {
                    skip: (pageSize.page - 1) * pageSize.size, limit: pageSize.size
                }),
            ]);
            // map reference file
            const fileIdMap = this.service.file.info.filterReferenceFile(fileList);
            const referenceFileIds = lodash_1.default.keys(fileIdMap);
            // get file content list
            const contentList = await this.service.content.list.find({
                fileId: { $in: lodash_1.default.map(fileList, 'id').concat(referenceFileIds) },
                deleted: false,
            });
            let fileContentObject = {};
            fileList.forEach(file => {
                fileContentObject[file.id] = Object.assign({}, file, { contents: [] });
            });
            contentList.forEach(content => {
                if (fileContentObject[content.fileId]) {
                    fileContentObject[content.fileId].contents.push(content);
                }
                else if (fileIdMap[content.fileId] && fileContentObject[fileIdMap[content.fileId]]) {
                    content.fileId = fileIdMap[content.fileId];
                    fileContentObject[content.fileId].contents.push(content);
                }
            });
            return Response.success({
                pageInfo: this.paging(counts, pageSize),
                data: lodash_1.default.toArray(fileContentObject),
            }, 1200101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.page.getPagePagesFailed, 3200101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/page-content/search'),
    (0, routing_controllers_1.Get)('/template-content/search'),
    (0, routing_controllers_1.Get)('/page-content/searchs'),
    (0, routing_controllers_1.Get)('/template-content/searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppProjectItemPageList,
        description: '',
        tags: ['Project'],
        operationId: 'get-page-item-content-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppProjectItemContentDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, page_validate_types_1.AppPageItemListContentReq]),
    __metadata("design:returntype", Promise)
], GetPageProjectItemListWithContents.prototype, "index", null);
GetPageProjectItemListWithContents = __decorate([
    (0, routing_controllers_1.JsonController)('projects'),
    __metadata("design:paramtypes", [])
], GetPageProjectItemListWithContents);
exports.GetPageProjectItemListWithContents = GetPageProjectItemListWithContents;
