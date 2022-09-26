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
exports.AddComponentDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let AddComponentDetail = class AddComponentDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create component details
     * @param  {AddComponentReq} params
     * @param  {Header} headers
     * @returns Content
     */
    async index(ctx, params) {
        try {
            // Permission check
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4110201);
            }
            // Get the default folder Id of the application component
            const appComponentFolderId = await this.service.folder.info.getAppTypeFolderId({
                applicationId: params.applicationId,
                type: constant_1.TYPE.COMPONENT,
            });
            if (!appComponentFolderId) {
                return Response.warning(app_config_1.i18n.component.invalidFolderType, 2110201);
            }
            // Create page content information
            const fileDetail = {
                applicationId: params.applicationId,
                folderId: appComponentFolderId,
                name: params.name,
                type: params.type,
                suffix: '',
                creator: '',
            };
            const result = await this.service.file.info.addFileDetail(fileDetail, { ctx });
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.component.invalidApplicationId, 2110202);
            }
            // Check if there is a component with the same name
            if (result.code === 2) {
                return Response.warning(app_config_1.i18n.component.nameExist, 2110203);
            }
            await this.service.file.info.runTransaction(ctx.transactions);
            const newFileDetail = await this.service.file.info.getDetailById(result.data.id);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: result.data.id, type: constant_1.TYPE.COMPONENT });
            return Response.success(newFileDetail, 1110201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.content.addContentBaseFailed, 3110201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addComponentDetail,
        description: '/component/detail',
        tags: ['Component'],
        operationId: 'add-component-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, component_validate_types_1.AddComponentReq]),
    __metadata("design:returntype", Promise)
], AddComponentDetail.prototype, "index", null);
AddComponentDetail = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], AddComponentDetail);
exports.AddComponentDetail = AddComponentDetail;
