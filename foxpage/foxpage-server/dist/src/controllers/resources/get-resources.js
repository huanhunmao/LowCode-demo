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
exports.GetResourceDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const resource_validate_types_1 = require("../../types/validates/resource-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetResourceDetail = class GetResourceDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the details of the specified resource
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    async index(params) {
        try {
            const { id = '', name = '' } = params;
            let folderDetail;
            // Check id, name and get file details
            if (!id && !name) {
                return Response.warning(app_config_1.i18n.resource.idOrNameMustExistOne, 2121401);
            }
            else if (id) {
                folderDetail = await this.service.folder.info.getDetail({
                    applicationId: params.applicationId,
                    id: params.id,
                });
            }
            else {
                // Get application resource folder Id
                const appTypeFolderIds = await this.service.folder.info.getAppDefaultFolderIds({
                    applicationIds: [params.applicationId],
                    type: constant_1.TYPE.RESOURCE,
                });
                if (appTypeFolderIds.size === 0) {
                    return Response.warning(app_config_1.i18n.resource.missingResourceFolder, 2121402);
                }
                const resourceFolderList = await this.service.folder.info.find({
                    applicationId: params.applicationId,
                    parentFolderId: [...appTypeFolderIds][0],
                    name: params.name,
                }, '-_id -tags._id');
                if (resourceFolderList.length === 0) {
                    return Response.success({});
                }
                folderDetail = resourceFolderList[0];
            }
            params.id = (folderDetail === null || folderDetail === void 0 ? void 0 : folderDetail.id) || '';
            let resourceDetail = {};
            if (params.id) {
                // Get all the sub-file information of the resource file
                let resourceChildren = {};
                let folderParentList = {};
                [resourceChildren, folderParentList] = await Promise.all([
                    this.service.folder.list.getAllChildrenRecursive({ folderIds: [params.id], depth: 5 }),
                    this.service.folder.list.getAllParentsRecursive([params.id]),
                ]);
                resourceDetail = Object.assign({}, folderDetail, {
                    depth: folderParentList[params.id] ? folderParentList[params.id].length - 1 : 0,
                    children: resourceChildren[params.id] || [],
                });
            }
            return Response.success(resourceDetail, 1121401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.getResourceDetailFailed, 3121401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getResourceDetail,
        description: '',
        tags: ['Resource'],
        operationId: 'get-resource-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resource_validate_types_1.ResourceDetailReq]),
    __metadata("design:returntype", Promise)
], GetResourceDetail.prototype, "index", null);
GetResourceDetail = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], GetResourceDetail);
exports.GetResourceDetail = GetResourceDetail;
