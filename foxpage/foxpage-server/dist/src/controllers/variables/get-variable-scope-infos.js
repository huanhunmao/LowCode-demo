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
exports.GetAppScopeVariableList = void 0;
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
let GetAppScopeVariableList = class GetAppScopeVariableList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the live version details of the variables under the application,
     * the latest version details under the project (not necessarily the live version).
     * Only one of the names and search fields is passed. If passed at the same time, the search field is taken by default
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    async index(ctx, params) {
        var _a, _b, _c;
        this.service.file.info.setPageSize(params);
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            // Get application, variable list under project
            const variableFolderId = await this.service.folder.info.getAppTypeFolderId({
                applicationId: params.applicationId,
                type: constant_1.TYPE.VARIABLE,
            });
            let options = {};
            if (params.search) {
                options = { name: { $regex: new RegExp(params.search, 'i') } };
            }
            else if (params.names && params.names.length > 0) {
                options = { name: { $in: params.names } };
            }
            options.type = constant_1.TYPE.VARIABLE;
            const [appFileList, projectFileList] = await Promise.all([
                this.service.file.list.getFileListByFolderId(variableFolderId, options),
                this.service.file.list.getFileListByFolderId(params.id, options),
            ]);
            const [appContentList, projectContentList] = await Promise.all([
                this.service.content.file.getContentByFileIds(lodash_1.default.map(appFileList, 'id')),
                this.service.content.file.getContentByFileIds(lodash_1.default.map(projectFileList, 'id')),
            ]);
            const projectVersion = await this.service.version.number.getContentMaxVersionByIds(lodash_1.default.map(projectContentList, 'id'));
            let appVersionNumbers = [];
            let versionNumbers = [];
            appContentList.forEach((content) => {
                appVersionNumbers.push({ contentId: content.id, versionNumber: content.liveVersionNumber });
            });
            projectVersion.forEach((content) => {
                versionNumbers.push({ contentId: content._id, versionNumber: content.versionNumber });
            });
            const contentObject = lodash_1.default.merge(lodash_1.default.keyBy(appContentList, 'id'), lodash_1.default.keyBy(projectContentList, 'id'));
            const [appVersionList, versionList] = await Promise.all([
                this.service.version.list.getContentByIdAndVersionNumber(appVersionNumbers),
                this.service.version.list.getContentByIdAndVersionNumber(versionNumbers),
            ]);
            const allVersionList = appVersionList.concat(versionList);
            // Get relations
            const [appVersionItemRelation, versionItemRelation, idLiveVersion] = await Promise.all([
                this.service.version.list.getVersionListRelations(appVersionList, true),
                this.service.version.list.getVersionListRelations(versionList, false),
                this.service.content.list.getContentLiveInfoByIds(lodash_1.default.uniq(lodash_1.default.map(allVersionList, 'contentId'))),
            ]);
            const versionRelations = lodash_1.default.merge(appVersionItemRelation, versionItemRelation);
            const idLiveVersionObject = lodash_1.default.keyBy(idLiveVersion, 'id');
            let contentVersionList = [];
            for (const version of allVersionList) {
                const contentFileObject = await this.service.file.list.getContentFileByIds(lodash_1.default.map(versionRelations[version.contentId], 'id'));
                const itemRelations = {};
                const itemVersionRelations = lodash_1.default.keyBy(versionRelations[version.contentId], 'id');
                Object.keys(contentFileObject).forEach((contentId) => {
                    if (!itemRelations[contentFileObject[contentId].type + 's']) {
                        itemRelations[contentFileObject[contentId].type + 's'] = [];
                    }
                    itemRelations[contentFileObject[contentId].type + 's'].push(itemVersionRelations[contentId]);
                });
                contentVersionList.push(Object.assign({
                    id: version.contentId || '',
                    name: ((_a = contentObject === null || contentObject === void 0 ? void 0 : contentObject[version.contentId]) === null || _a === void 0 ? void 0 : _a.title) || '',
                    versionNumber: version.versionNumber,
                    isLiveVersion: ((_b = idLiveVersionObject[version.contentId]) === null || _b === void 0 ? void 0 : _b.liveVersionNumber) === version.versionNumber,
                    content: version.content || {},
                    relations: itemRelations,
                }));
            }
            return Response.success({
                pageInfo: {
                    total: contentVersionList.length,
                    page: params.page,
                    size: params.size,
                },
                data: ((_c = lodash_1.default.chunk(contentVersionList, params.size)) === null || _c === void 0 ? void 0 : _c[params.page - 1]) || [],
            }, 1080501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.variable.getAppVariableFailed, 3080501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/scope-infos'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getScopeVariables,
        description: '',
        tags: ['Variable'],
        operationId: 'get-variable-scope-info-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_validate_types_1.ProjectScopeTypeReq]),
    __metadata("design:returntype", Promise)
], GetAppScopeVariableList.prototype, "index", null);
GetAppScopeVariableList = __decorate([
    (0, routing_controllers_1.JsonController)('variables'),
    __metadata("design:paramtypes", [])
], GetAppScopeVariableList);
exports.GetAppScopeVariableList = GetAppScopeVariableList;
