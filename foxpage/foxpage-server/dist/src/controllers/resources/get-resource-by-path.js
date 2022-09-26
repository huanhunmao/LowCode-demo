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
exports.GetResourceDetailByPath = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const resource_validate_types_1 = require("../../types/validates/resource-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetResourceDetailByPath = class GetResourceDetailByPath extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Obtain the specified resource details through the path
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    async index(ctx, params) {
        const depth = params.depth && params.depth > 0 && params.depth < 6 ? params.depth : 5;
        try {
            const originPathList = params.path.split('/');
            const pathList = lodash_1.default.clone(originPathList);
            const typeId = await this.service.folder.info.getAppTypeFolderId({
                applicationId: params.applicationId,
                type: constant_1.TYPE.RESOURCE,
            });
            const folderId = await this.service.folder.info.getFolderIdByPathRecursive({
                applicationId: params.applicationId,
                parentFolderId: typeId,
                pathList,
            }, { ctx });
            let resourceDetail = {};
            if (folderId) {
                const folderDetail = await this.service.folder.info.getDetailById(folderId);
                // Get all the sub-file information of the resource file
                const resourceChildren = await this.service.folder.list.getAllChildrenRecursive({
                    folderIds: [folderId],
                    depth,
                });
                resourceDetail = Object.assign({}, folderDetail, { children: resourceChildren[folderId] || {} });
                const fileIds = this.service.file.info.getFileIdFromResourceRecursive(resourceDetail.children);
                // TODO (To be optimized) Get the content of the file and put it under the file details
                const contentList = await this.service.content.file.getContentByFileIds(fileIds);
                const versionList = await this.service.version.info.find({
                    contentId: { $in: lodash_1.default.map(contentList, 'id') },
                    deleted: false,
                });
                // Compatible with the prefix '/' of realPath in file
                const contentObject = lodash_1.default.keyBy(contentList, 'fileId');
                const versionObject = {};
                versionList.forEach((version) => {
                    var _a;
                    if ((_a = version.content) === null || _a === void 0 ? void 0 : _a.realPath) {
                        version.content.realPath = '/' + lodash_1.default.pull(version.content.realPath.split('/'), '').join('/');
                    }
                    versionObject[version.contentId] = version;
                });
                resourceDetail.children = this.service.file.info.addContentToFileRecursive(resourceDetail.children, contentObject, versionObject);
                // Get resource latest versions
                // if (originPathList.length === 1) {
                //   const resourceLatestVersion = await this.service.resource.getResourceGroupLatestVersion(folderId);
                //   (<ResourceFolderContentChildren>resourceDetail.children).newResources = <NewResourceDetail[]>(
                //     _.remove(resourceLatestVersion, { id: undefined })
                //   );
                //   const resourceLatestVersionObject = _.keyBy(resourceLatestVersion, 'id');
                //   resourceDetail.children?.folders?.forEach((folder) => {
                //     if (resourceLatestVersionObject[folder.id]) {
                //       (<ResourceFolderChildren>folder).newVersion = resourceLatestVersionObject[folder.id];
                //     }
                //   });
                // }
            }
            return Response.success(resourceDetail, 1121001);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.getResourceDetailFailed, 3121001);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/by-paths'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getResourceDetailByPath,
        description: '',
        tags: ['Resource'],
        operationId: 'get-resource-detail-by-path',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resource_validate_types_1.ResourcePathDetailReq]),
    __metadata("design:returntype", Promise)
], GetResourceDetailByPath.prototype, "index", null);
GetResourceDetailByPath = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], GetResourceDetailByPath);
exports.GetResourceDetailByPath = GetResourceDetailByPath;
