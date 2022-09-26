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
exports.AddResourceContentDetail = void 0;
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
let AddResourceContentDetail = class AddResourceContentDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Added resource content information, resource files, resource content,
     * and resource content version information will be added at the same time
     * @param  {AddResourceContentReq} params
     * @param  {Header} headers
     * @returns {ContentVersion}
     */
    async index(ctx, params) {
        var _a;
        try {
            let fileTitle = lodash_1.default.last((_a = params.content.realPath) === null || _a === void 0 ? void 0 : _a.split('/')) || '';
            if (!fileTitle) {
                return Response.warning(app_config_1.i18n.resource.invalidName, 2120101);
            }
            const hasAuth = await this.service.auth.folder(params.folderId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4120101);
            }
            // content title default remove has value
            const fileTitleArr = fileTitle.split('.');
            fileTitle = fileTitleArr[0] + '.' + lodash_1.default.last(fileTitleArr);
            // Get all the files in the current folder, check whether the file with the same name already exists
            let fileDetail = await this.service.file.info.getDetail({
                folderId: params.folderId,
                name: fileTitle,
                type: constant_1.TYPE.RESOURCE,
                deleted: false,
            });
            if (fileDetail) {
                return Response.warning(app_config_1.i18n.resource.resourceNameExist, 2120102);
            }
            const resourceFileDetail = {
                id: (0, tools_1.generationId)(constant_1.PRE.FILE),
                name: fileTitle,
                applicationId: params.applicationId,
                folderId: params.folderId,
                intro: '',
                type: constant_1.TYPE.RESOURCE,
                suffix: 'fp',
                creator: ctx.userInfo.id,
            };
            // Compatible with the prefix '/' of realPath
            params.content.realPath = '/' + lodash_1.default.pull(params.content.realPath.split('/'), '').join('/');
            this.service.file.info.createFileContentVersion(resourceFileDetail, { ctx, content: params.content });
            await this.service.file.info.runTransaction(ctx.transactions);
            fileDetail = await this.service.file.info.getDetailById(resourceFileDetail.id);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: resourceFileDetail.id, type: constant_1.TYPE.RESOURCE });
            return Response.success(fileDetail, 1120101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.addResourceContentFailed, 3120101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/contents'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addResourceContentDetail,
        description: '',
        tags: ['Resource'],
        operationId: 'add-resource-content-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, resource_validate_types_1.AddResourceContentReq]),
    __metadata("design:returntype", Promise)
], AddResourceContentDetail.prototype, "index", null);
AddResourceContentDetail = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], AddResourceContentDetail);
exports.AddResourceContentDetail = AddResourceContentDetail;
