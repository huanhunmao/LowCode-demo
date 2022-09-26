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
exports.GetAppScopeFunctionList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const project_validate_types_1 = require("../../types/validates/project-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetAppScopeFunctionList = class GetAppScopeFunctionList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the live version details under the application,
     * the latest version details under the project (not necessarily the live version)
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    async index(ctx, params) {
        var _a;
        this.service.file.info.setPageSize(params);
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.DELETE });
            // Get the application, the list of functions under the project
            const folderId = await this.service.folder.info.getAppTypeFolderId({
                applicationId: params.applicationId,
                type: constant_1.TYPE.FUNCTION,
            });
            let options = {};
            if (params.search) {
                options = { name: { $regex: new RegExp(params.search, 'i') } };
            }
            else if (params.names && params.names.length > 0) {
                options = { name: { $in: params.names } };
            }
            options.type = constant_1.TYPE.FUNCTION;
            const [appFileList, projectFileList] = await Promise.all([
                this.service.file.list.getFileListByFolderId(folderId, options),
                this.service.file.list.getFileListByFolderId(params.id, options),
            ]);
            const [appContentList, projectContentList] = await Promise.all([
                this.service.content.file.getContentByFileIds(lodash_1.default.map(appFileList, 'id')),
                this.service.content.file.getContentByFileIds(lodash_1.default.map(projectFileList, 'id')),
            ]);
            const projectVersion = await this.service.version.number.getContentMaxVersionByIds(lodash_1.default.map(projectContentList, 'id'));
            let versionNumbers = [];
            appContentList.forEach((content) => {
                versionNumbers.push({ contentId: content.id, versionNumber: content.liveVersionNumber });
            });
            projectVersion.forEach((content) => {
                versionNumbers.push({ contentId: content._id, versionNumber: content.versionNumber });
            });
            const contentObject = lodash_1.default.merge(lodash_1.default.keyBy(appContentList, 'id'), lodash_1.default.keyBy(projectContentList, 'id'));
            const versionList = await this.service.version.list.getContentByIdAndVersionNumber(versionNumbers);
            let contentVersionList = [];
            contentVersionList = versionList.map((version) => {
                var _a;
                return Object.assign({
                    id: version.contentId || '',
                    name: ((_a = contentObject === null || contentObject === void 0 ? void 0 : contentObject[version.contentId]) === null || _a === void 0 ? void 0 : _a.title) || '',
                    versionNumber: version.versionNumber,
                    content: version.content || {},
                });
            });
            return Response.success({
                pageInfo: {
                    total: contentVersionList.length,
                    page: params.page,
                    size: params.size,
                },
                data: ((_a = lodash_1.default.chunk(contentVersionList, params.size)) === null || _a === void 0 ? void 0 : _a[params.page - 1]) || [],
            }, 1090401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.function.getAppFunctionFailed, 3090401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/scope-infos'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getScopeFunctions,
        description: '',
        tags: ['Function'],
        operationId: 'get-function-scope-info-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_validate_types_1.ProjectScopeTypeReq]),
    __metadata("design:returntype", Promise)
], GetAppScopeFunctionList.prototype, "index", null);
GetAppScopeFunctionList = __decorate([
    (0, routing_controllers_1.JsonController)('functions'),
    __metadata("design:paramtypes", [])
], GetAppScopeFunctionList);
exports.GetAppScopeFunctionList = GetAppScopeFunctionList;
