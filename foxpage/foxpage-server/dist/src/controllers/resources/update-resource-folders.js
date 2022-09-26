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
exports.UpdateResourceFolderDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const resource_validate_types_1 = require("../../types/validates/resource-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let UpdateResourceFolderDetail = class UpdateResourceFolderDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update resource folder details, including name, path, intro, tags
     * @param  {ContentVersionDetailRes} params
     * @returns {ContentVersion}
     */
    async index(ctx, params) {
        // Check the validity of the name
        if (params.name && !(0, tools_1.checkResourceName)(params.name)) {
            return Response.warning(app_config_1.i18n.file.invalidName, 2122101);
        }
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.RESOURCE });
            const hasAuth = await this.service.auth.folder(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4122101);
            }
            // Check that the folder is a resource folder, not a resource group or a parent folder of the resource group
            const folderObject = await this.service.folder.list.getAllParentsRecursive([params.id]);
            if (!folderObject[params.id] || folderObject[params.id].length < 3) {
                return Response.warning(app_config_1.i18n.resource.invalidResourceFolderId, 2122102);
            }
            // Check the effectiveness of resources
            let folderDetail = await this.service.folder.info.getDetailById(params.id);
            if (!folderDetail || folderDetail.deleted || folderDetail.applicationId !== params.applicationId) {
                return Response.warning(app_config_1.i18n.resource.invalidResourceFolderId, 2122103);
            }
            // Check the folder name and whether the path is duplicate
            const name = params.name || folderDetail.name;
            const folderPath = (0, tools_1.formatToPath)(name);
            const duplicationFolder = await this.service.folder.info.getDetail({
                parentFolderId: folderDetail.parentFolderId,
                id: { $ne: params.id },
                $or: [{ name }, { folderPath }],
                deleted: false,
            });
            if (duplicationFolder) {
                return Response.warning(app_config_1.i18n.resource.nameOrPathExist, 2122104);
            }
            this.service.folder.info.updateContentItem(params.id, { name: params.name, intro: params.intro || folderDetail.intro, folderPath }, { ctx });
            await this.service.folder.info.runTransaction(ctx.transactions);
            folderDetail = await this.service.folder.info.getDetailById(params.id);
            return Response.success(folderDetail, 1122101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.updateResourceFolderDetailFailed, 3122101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/folders'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateResourceFolderDetail,
        description: '',
        tags: ['Resource'],
        operationId: 'update-resource-folder-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resource_validate_types_1.UpdateResourceFolderReq]),
    __metadata("design:returntype", Promise)
], UpdateResourceFolderDetail.prototype, "index", null);
UpdateResourceFolderDetail = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], UpdateResourceFolderDetail);
exports.UpdateResourceFolderDetail = UpdateResourceFolderDetail;
