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
exports.AddResourceFileDetail = void 0;
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
let AddResourceFileDetail = class AddResourceFileDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create resource file details
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    async index(ctx, params) {
        // Check the validity of the name
        if (!(0, tools_1.checkName)(params.name)) {
            return Response.warning(app_config_1.i18n.resource.invalidName, 2120201);
        }
        if (!params.folderId) {
            return Response.warning(app_config_1.i18n.resource.invalidFolderId, 2120202);
        }
        try {
            // Check the existence of the file
            const fileExist = await this.service.file.info.checkExist(params);
            if (fileExist) {
                return Response.warning(app_config_1.i18n.resource.resourceNameExist, 2120203);
            }
            const hasAuth = await this.service.auth.folder(params.folderId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4120201);
            }
            // Create document details
            const fileDetail = Object.assign({}, lodash_1.default.omit(params, 'type'), {
                id: (0, tools_1.generationId)(constant_1.PRE.FILE),
                type: constant_1.TYPE.RESOURCE,
            });
            this.service.file.info.create(fileDetail, { ctx });
            await this.service.file.info.runTransaction(ctx.transactions);
            const newFileDetail = await this.service.file.info.getDetailById(fileDetail.id);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: fileDetail.id, type: constant_1.TYPE.RESOURCE });
            return Response.success(newFileDetail, 1120201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.addResourceFileFailed, 3120201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addResourceFileDetail,
        description: '/resource/file/detail',
        tags: ['Resource'],
        operationId: 'add-resource-file-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.FileDetailReq]),
    __metadata("design:returntype", Promise)
], AddResourceFileDetail.prototype, "index", null);
AddResourceFileDetail = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], AddResourceFileDetail);
exports.AddResourceFileDetail = AddResourceFileDetail;
