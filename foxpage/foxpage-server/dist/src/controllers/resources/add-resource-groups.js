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
exports.AddResourceGroupDetail = void 0;
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
let AddResourceGroupDetail = class AddResourceGroupDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Add a static resource group,
     * tags pass [{resourceType: 1|2, resourceId:'',type:'resourceGroup'}] to indicate
     * that the resource group is of type UNPKG
     * @param  {AddTypeFolderDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    async index(ctx, params) {
        params.name = lodash_1.default.trim(params.name);
        // Check the validity of the name
        if (!(0, tools_1.checkName)(params.name)) {
            return Response.warning(app_config_1.i18n.file.invalidName, 2120401);
        }
        try {
            // Check permission
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4120401);
            }
            if (!params.tags || params.tags.length === 0 || !lodash_1.default.find(params.tags, { type: constant_1.TAG.RESOURCE_GROUP })) {
                return Response.warning(app_config_1.i18n.resource.invalidResourceGroupId);
            }
            // Add resource group config to tags
            if (params.config && !lodash_1.default.isEmpty(params.config)) {
                params.tags.push(Object.assign(params.config, { type: constant_1.TAG.RESOURCE_CONFIG }));
            }
            const folderDetail = Object.assign(lodash_1.default.omit(params, ['path', 'parentFolderId']), {
                id: (0, tools_1.generationId)(constant_1.PRE.FOLDER),
                parentFolderId: '',
                folderPath: params.path ? (0, tools_1.formatToPath)(params.path) : (0, tools_1.formatToPath)(params.name),
            });
            // Add resource group folder
            const resourceTag = lodash_1.default.find(params.tags, 'resourceId');
            const result = await this.service.folder.info.addTypeFolderDetail(folderDetail, {
                ctx,
                type: constant_1.TYPE.RESOURCE,
                distinctParams: {
                    'tags.type': constant_1.TAG.RESOURCE_CONFIG,
                    'tags.resourceId': resourceTag.resourceId,
                    name: folderDetail.name,
                },
            });
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.resource.invalidType, 2120402);
            }
            if (result.code === 2) {
                return Response.warning(app_config_1.i18n.resource.nameExist, 2120403);
            }
            await this.service.folder.info.runTransaction(ctx.transactions);
            const projectDetail = await this.service.folder.info.getDetailById(folderDetail.id);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: folderDetail.id, type: constant_1.TYPE.RESOURCE });
            return Response.success(projectDetail, 1120401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.addResourceGroupFailed, 3120401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/groups'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addResourceGroupDetail,
        description: '/resource/folders',
        tags: ['Resource'],
        operationId: 'add-resource-group-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FolderDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.AddTypeFolderDetailReq]),
    __metadata("design:returntype", Promise)
], AddResourceGroupDetail.prototype, "index", null);
AddResourceGroupDetail = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], AddResourceGroupDetail);
exports.AddResourceGroupDetail = AddResourceGroupDetail;
