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
exports.GetProjectCatalog = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetProjectCatalog = class GetProjectCatalog extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the file directory under the specified project
     * @param  {FolderDetailReq} params
     * @param  {Header} headers
     * @returns {Folder}
     */
    async index(params) {
        try {
            // Get project information
            const projectDetail = await this.service.folder.info.getDetail(lodash_1.default.pick(params, ['id', 'applicationId']));
            if (!projectDetail) {
                return Response.warning(app_config_1.i18n.project.invalidProjectId, 2040501);
            }
            const folderFiles = await this.service.folder.list.getAllChildrenRecursive({
                folderIds: [params.id],
                depth: 5,
                hasContent: true,
                fileTypes: [constant_1.TYPE.TEMPLATE, constant_1.TYPE.PAGE],
            });
            if (folderFiles[params.id] && folderFiles[params.id].files.length > 0) {
                folderFiles[params.id].files.forEach((file) => {
                    if (file.contents && file.contents.length > 0) {
                        file.contents.forEach((content) => {
                            var _a, _b;
                            content.isBase = ((_a = lodash_1.default.remove(content.tags, (tag) => !lodash_1.default.isNil(tag.isBase))[0]) === null || _a === void 0 ? void 0 : _a.isBase) || false;
                            content.extendId = ((_b = lodash_1.default.remove(content.tags, (tag) => !lodash_1.default.isNil(tag.extendId))[0]) === null || _b === void 0 ? void 0 : _b.extendId) || '';
                        });
                    }
                });
            }
            return Response.success(Object.assign({}, lodash_1.default.pick(projectDetail, ['id', 'name']), folderFiles[params.id]), 1040501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.project.getProjectCatalogFailed, 3040501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/catalogs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getProjectCatalog,
        description: '',
        tags: ['Project'],
        operationId: 'get-project-catalog',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FolderAndFileDetail),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_validate_types_1.FileListReq]),
    __metadata("design:returntype", Promise)
], GetProjectCatalog.prototype, "index", null);
GetProjectCatalog = __decorate([
    (0, routing_controllers_1.JsonController)('projects'),
    __metadata("design:paramtypes", [])
], GetProjectCatalog);
exports.GetProjectCatalog = GetProjectCatalog;
