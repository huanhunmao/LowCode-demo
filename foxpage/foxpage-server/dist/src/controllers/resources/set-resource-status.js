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
exports.SetResourceFileContentStatus = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let SetResourceFileContentStatus = class SetResourceFileContentStatus extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Set resource folder, file, content deletion status
     * @param  {AppFileContentStatusReq} params
     * @returns {Content}
     */
    async index(ctx, params) {
        try {
            params.status = true; // Currently it is mandatory to only allow delete operations
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.DELETE, type: constant_1.TYPE.RESOURCE });
            // TODO Need to find the uppermost id verification authority
            // const hasAuth = await this.service.auth.file(params.id);
            // if (!hasAuth) {
            //   return Response.accessDeny(i18n.system.accessDeny);
            // }
            // Check whether the folder is a resource folder,
            // there are at least two levels of folders in the resource group and above
            let invalidFolderIds = [];
            const folderObject = await this.service.folder.list.getAllParentsRecursive(params.ids);
            invalidFolderIds = params.ids.filter((folderId) => folderObject[folderId] && folderObject[folderId].length < 3);
            if (invalidFolderIds.length > 0) {
                return Response.warning(app_config_1.i18n.resource.invalidResourceFolderId + ': ' + invalidFolderIds.join(','), 2121901);
            }
            // Get folder, file details
            const [folderList, fileList] = await Promise.all([
                this.service.folder.info.getDetailByIds(params.ids),
                this.service.file.info.getDetailByIds(params.ids),
            ]);
            const validFolderIds = [];
            folderList.forEach((folder) => {
                folder.applicationId === params.applicationId && validFolderIds.push(folder.id);
            });
            const validFileIds = [];
            fileList.forEach((file) => {
                file.applicationId === params.applicationId && validFileIds.push(file.id);
            });
            ctx.transactions.push(this.service.folder.info.setDeleteStatus(validFolderIds, true));
            ctx.transactions.push(this.service.file.info.setDeleteStatus(validFileIds, true));
            await this.service.folder.info.runTransaction(ctx.transactions);
            return Response.success(app_config_1.i18n.resource.setResourceStatusSuccess, 2121901);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.setResourceContentDeletedFailed, 3121901);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/status'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.setResourceFileContentStatus,
        description: '',
        tags: ['Resource'],
        operationId: 'set-resource-file-content-status',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, content_validate_types_1.AppFileContentStatusReq]),
    __metadata("design:returntype", Promise)
], SetResourceFileContentStatus.prototype, "index", null);
SetResourceFileContentStatus = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], SetResourceFileContentStatus);
exports.SetResourceFileContentStatus = SetResourceFileContentStatus;
