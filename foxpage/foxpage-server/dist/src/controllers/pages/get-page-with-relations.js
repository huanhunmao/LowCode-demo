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
exports.GetAppPageLiveInfoList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetAppPageLiveInfoList = class GetAppPageLiveInfoList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the live version details of the specified page under the application,
     * and include the details of all the relations, the relation details of the already relations
     * Response [{content:{},relations:{templates:[],variables:[],conditions:[],functions:[],...}}]
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            if (params.ids.length === 0) {
                return Response.success([], 1050901);
            }
            const contentFileObject = await this.service.file.list.getContentFileByIds(params.ids);
            const validContentIds = [];
            for (const contentId in contentFileObject) {
                if (contentFileObject[contentId].applicationId === params.applicationId) {
                    validContentIds.push(contentId);
                }
            }
            // Get the live details of the specified contentIds and the relation details
            const contentVersionList = await this.service.version.live.getContentAndRelationVersion(validContentIds);
            let templateIds = [];
            contentVersionList.forEach(version => {
                if (version.relations && version.relations.templates && version.relations.templates[0]) {
                    templateIds.push(version.relations.templates[0].id);
                }
            });
            const [contentMockObject, contentList] = await Promise.all([
                this.service.content.mock.getMockLiveVersions(lodash_1.default.concat(validContentIds, templateIds)),
                this.service.content.list.getDetailByIds(validContentIds),
            ]);
            let dependMissing = [];
            let recursiveItem = [];
            let contentAndRelation = [];
            const contentObject = lodash_1.default.keyBy(contentList, 'id');
            contentVersionList.forEach((content) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                const dependMissing = [];
                if (content.dependMissing && content.dependMissing.length > 0) {
                    dependMissing.concat(content.dependMissing);
                }
                if (content.recursiveItem) {
                    recursiveItem.push(content.recursiveItem);
                }
                if ((_b = (_a = content.relations) === null || _a === void 0 ? void 0 : _a.templates) === null || _b === void 0 ? void 0 : _b[0]) {
                    content.relations.templates[0] = lodash_1.default.merge({}, content.relations.templates[0], contentMockObject[content.relations.templates[0].id] || {});
                }
                const mockRelations = ((_c = contentMockObject[content.id]) === null || _c === void 0 ? void 0 : _c.relations) || {};
                content.relations = this.service.version.relation.moveMockRelations(content.relations, mockRelations);
                contentAndRelation.push(Object.assign({}, lodash_1.default.pick(content, ['relations']), {
                    content: Object.assign({}, content.content, {
                        dslVersion: content.dslVersion || constant_1.DSL_VERSION,
                        name: ((_e = contentObject[(_d = content === null || content === void 0 ? void 0 : content.content) === null || _d === void 0 ? void 0 : _d.id]) === null || _e === void 0 ? void 0 : _e.title) || '',
                        version: content.version,
                        versionNumber: this.service.version.number.createNumberFromVersion(content.version || '0.0.1'),
                        fileId: ((_g = contentObject[(_f = content === null || content === void 0 ? void 0 : content.content) === null || _f === void 0 ? void 0 : _f.id]) === null || _g === void 0 ? void 0 : _g.fileId) || '',
                        extension: ((_h = contentMockObject[content.id]) === null || _h === void 0 ? void 0 : _h.extension) || {},
                    }),
                    mock: ((_j = contentMockObject[content.id]) === null || _j === void 0 ? void 0 : _j.mock) || {},
                }));
            });
            if (dependMissing.length > 0) {
                return Response.error(new Error(dependMissing.join(',')), app_config_1.i18n.page.pageDependMissing, 3050901);
            }
            if (recursiveItem.length > 0) {
                return Response.error(new Error(recursiveItem.join(',')), app_config_1.i18n.page.pageHasRecursiveDepend, 3050902);
            }
            return Response.success(contentAndRelation, 1050901);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.condition.getAppPageFailed, 3050903);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/live-infos'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppPagesLiveInfo,
        description: '',
        tags: ['Page'],
        operationId: 'get-page-live-version-info-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, page_validate_types_1.AppContentVersionReq]),
    __metadata("design:returntype", Promise)
], GetAppPageLiveInfoList.prototype, "index", null);
GetAppPageLiveInfoList = __decorate([
    (0, routing_controllers_1.JsonController)('pages'),
    __metadata("design:paramtypes", [])
], GetAppPageLiveInfoList);
exports.GetAppPageLiveInfoList = GetAppPageLiveInfoList;
