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
exports.AddAssetDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let AddAssetDetail = class AddAssetDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create static resource folder level details
     * @param  {AddTypeFolderDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    async index(ctx, params) {
        params.name = lodash_1.default.trim(params.name);
        // Check the validity of the name
        if (!(0, tools_1.checkResourceName)(params.name)) {
            return Response.warning(app_config_1.i18n.file.invalidName, 2120301);
        }
        try {
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4120301);
            }
            const folderDetail = Object.assign(lodash_1.default.omit(params, 'path'), {
                id: (0, tools_1.generationId)(constant_1.PRE.FOLDER),
                folderPath: params.path ? (0, tools_1.formatToPath)(params.path) : (0, tools_1.formatToPath)(params.name),
                creator: ctx.userInfo.id,
            });
            // Check if the folder is duplicate
            const checkParams = Object.assign({ deleted: false }, lodash_1.default.pick(folderDetail, ['applicationId', 'parentFolderId']));
            const [nameDetail, pathDetail] = await Promise.all([
                this.service.folder.info.getDetail(Object.assign({ name: folderDetail.name }, checkParams)),
                this.service.folder.info.getDetail(Object.assign({ folderPath: folderDetail.folderPath }, checkParams)),
            ]);
            if (nameDetail) {
                return Response.warning(app_config_1.i18n.resource.nameExist, 2120302);
            }
            if (pathDetail) {
                return Response.warning(app_config_1.i18n.resource.pathExist, 2120303);
            }
            // Add resource folder
            this.service.folder.info.create(folderDetail, { ctx });
            await this.service.folder.info.runTransaction(ctx.transactions);
            const resourceDetail = await this.service.folder.info.getDetailById(folderDetail.id);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: folderDetail.id, type: constant_1.TYPE.RESOURCE });
            return Response.success(resourceDetail, 1120301);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.addResourceFolderFailed, 3120301);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/folders'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addResourceFolderDetail,
        description: '',
        tags: ['Resource'],
        operationId: 'add-resource-folder-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FolderDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.AddResourceGroupDetailReq]),
    __metadata("design:returntype", Promise)
], AddAssetDetail.prototype, "index", null);
AddAssetDetail = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], AddAssetDetail);
exports.AddAssetDetail = AddAssetDetail;
