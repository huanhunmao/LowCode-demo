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
exports.UpdateResourceGroup = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const resource_validate_types_1 = require("../../types/validates/resource-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let UpdateResourceGroup = class UpdateResourceGroup extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update resource group name and config
     * @param  {UpdateResourceConfigReq} params
     * @returns {Folder}
     */
    async index(ctx, params) {
        try {
            if (!params.name) {
                return Response.warning(app_config_1.i18n.resource.invalidName, 2122201);
            }
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4122201);
            }
            let groupDetail = await this.service.folder.info.getDetailById(params.id);
            let tags = groupDetail.tags || [];
            // Check id is a group id
            let isGroup = false;
            tags.forEach((tag, index) => {
                if (tag.type === constant_1.TAG.RESOURCE_GROUP && tag.resourceId) {
                    isGroup = true;
                }
                else if (tag.type === constant_1.TAG.RESOURCE_CONFIG) {
                    tags.splice(index, 1);
                }
            });
            if (!isGroup) {
                return Response.warning(app_config_1.i18n.resource.invalidResourceGroupId, 2122202);
            }
            // Check if group name has exist
            const resourceTag = lodash_1.default.find(groupDetail.tags, 'resourceId');
            const existGroup = await this.service.folder.list.find({
                parentFolderId: groupDetail.parentFolderId,
                id: { $ne: params.id },
                name: params.name,
                deleted: false,
                'tags.type': constant_1.TAG.RESOURCE_CONFIG,
                'tags.resourceId': resourceTag.resourceId
            });
            if (existGroup.length > 0) {
                return Response.warning(app_config_1.i18n.resource.groupNameExist, 2122203);
            }
            tags.push(Object.assign({ type: constant_1.TAG.RESOURCE_CONFIG }, params.config));
            await this.service.folder.info.updateDetail(params.id, {
                name: params.name,
                folderPath: (0, tools_1.formatToPath)(params.name),
                tags,
                intro: params.intro || groupDetail.intro,
            });
            groupDetail = await this.service.folder.info.getDetailById(params.id);
            return Response.success(groupDetail, 1122201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.updateResourceConfigFailed, 3122201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/group'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateResourceGroupConfig,
        description: '',
        tags: ['Resource'],
        operationId: 'update-resource-group',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resource_validate_types_1.UpdateResourceConfigReq]),
    __metadata("design:returntype", Promise)
], UpdateResourceGroup.prototype, "index", null);
UpdateResourceGroup = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], UpdateResourceGroup);
exports.UpdateResourceGroup = UpdateResourceGroup;
