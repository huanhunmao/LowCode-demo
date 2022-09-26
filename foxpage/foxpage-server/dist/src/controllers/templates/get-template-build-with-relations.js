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
exports.GetAppTemplateBuildInfoList = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetAppTemplateBuildInfoList = class GetAppTemplateBuildInfoList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the details of the build version of the specified template under the application,
     * and include the details of all the relations, the relation details of the already relations
     * Response [{content:{},relations:{templates:[],variables:[],conditions:[],functions:[],...}}]
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            if (params.ids.length === 0) {
                return Response.success([], 1070601);
            }
            const contentFileObject = await this.service.file.list.getContentFileByIds(params.ids);
            const validContentIds = [];
            for (const contentId in contentFileObject) {
                if (contentFileObject[contentId].applicationId === params.applicationId) {
                    validContentIds.push(contentId);
                }
            }
            // Get the live details of the specified contentIds and the relation details
            const contentVersionList = await this.service.version.live.getContentAndRelationVersion(validContentIds, true);
            let templateIds = [];
            contentVersionList.forEach(content => {
                var _a;
                if (((_a = content.relations) === null || _a === void 0 ? void 0 : _a.templates) && content.relations.templates.length > 0) {
                    templateIds.push(content.relations.templates[0].id);
                }
            });
            // get mock build content and template live version
            const [mockObject, templateMockObject] = await Promise.all([
                this.service.content.mock.getMockBuildVersions(params.ids),
                this.service.content.mock.getMockLiveVersions(templateIds),
            ]);
            let dependMissing = [];
            let recursiveItem = [];
            let contentAndRelation = [];
            contentVersionList.forEach((content) => {
                var _a, _b, _c, _d;
                const dependMissing = [];
                if (content.dependMissing && content.dependMissing.length > 0) {
                    dependMissing.concat(content.dependMissing);
                }
                if (content.recursiveItem) {
                    recursiveItem.push(content.recursiveItem);
                }
                if (((_a = content.relations) === null || _a === void 0 ? void 0 : _a.templates) && content.relations.templates.length > 0) {
                    const templateId = content.relations.templates[0].id;
                    content.relations.templates[0].extension = ((_b = templateMockObject[templateId]) === null || _b === void 0 ? void 0 : _b.extension) || {};
                    content.relations.templates[0].mock = ((_c = templateMockObject[templateId]) === null || _c === void 0 ? void 0 : _c.mock) || {};
                }
                contentAndRelation.push({
                    content: Object.assign({}, content.content || {}, {
                        dslVersion: content.dslVersion || constant_1.DSL_VERSION,
                    }),
                    relations: content.relations || {},
                    mock: ((_d = mockObject[content.id]) === null || _d === void 0 ? void 0 : _d.mock) || {},
                });
            });
            if (dependMissing.length > 0) {
                return Response.error(new Error(dependMissing.join(',')), app_config_1.i18n.page.pageDependMissing, 3070601);
            }
            if (recursiveItem.length > 0) {
                return Response.error(new Error(recursiveItem.join(',')), app_config_1.i18n.page.pageHasRecursiveDepend, 3070602);
            }
            return Response.success(contentAndRelation, 1070601);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.condition.getAppPageFailed, 3070603);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/draft-infos'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppTemplatesBuildInfo,
        description: '',
        tags: ['Template'],
        operationId: 'get-template-build-version-info-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, page_validate_types_1.AppContentVersionReq]),
    __metadata("design:returntype", Promise)
], GetAppTemplateBuildInfoList.prototype, "index", null);
GetAppTemplateBuildInfoList = __decorate([
    (0, routing_controllers_1.JsonController)('templates'),
    __metadata("design:paramtypes", [])
], GetAppTemplateBuildInfoList);
exports.GetAppTemplateBuildInfoList = GetAppTemplateBuildInfoList;
