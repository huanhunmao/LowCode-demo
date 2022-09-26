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
exports.GetAppComponentListInfos = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetAppComponentListInfos = class GetAppComponentListInfos extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the live version details of the components under the application
     *
     * Note: Pay attention to the difference between distinction and /live-versions
     * @param  {AppPackagesReq} params
     * @returns {NameVersionPackage[]}
     */
    async index(ctx, params) {
        var _a, _b, _c, _d, _e;
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            // Get App all components live info
            const contentList = await this.service.content.component.getComponentVersionLiveDetails({
                applicationId: params.applicationId,
                type: params.type || constant_1.TYPE.COMPONENT,
                contentIds: params.componentIds,
            });
            const contentFileObject = await this.service.file.list.getContentFileByIds(lodash_1.default.map(contentList, (content) => { var _a; return ((_a = content.package) === null || _a === void 0 ? void 0 : _a.id) || ''; }), params.applicationId);
            let components = [];
            let componentCells = [];
            contentList.map(content => {
                content.package && componentCells.push(content.package);
            });
            let componentIds = this.service.content.component.getComponentResourceIds(componentCells);
            const dependenciesIdVersions = this.service.component.getComponentEditorAndDependends(componentCells);
            // Get component dependents editor or component
            const [dependencies, fileContentObject, appDetail] = await Promise.all([
                this.service.component.getComponentDetailByIdVersion(dependenciesIdVersions),
                this.service.file.list.getContentFileByIds(lodash_1.default.map(dependenciesIdVersions, 'id'), params.applicationId),
                this.service.application.getDetailById(params.applicationId),
            ]);
            const dependenciesList = lodash_1.default.toArray(dependencies);
            const dependComponentIds = this.service.content.component.getComponentResourceIds(lodash_1.default.map(dependenciesList, 'content'));
            // Get component's resource info
            componentIds = componentIds.concat(dependComponentIds);
            const [resourceObject, contentAllParents, fileObject] = await Promise.all([
                this.service.content.resource.getResourceContentByIds(componentIds),
                this.service.content.list.getContentAllParents(componentIds),
                this.service.file.list.getContentFileByIds(lodash_1.default.map(dependenciesList, 'contentId'), params.applicationId),
            ]);
            const appResource = await this.service.application.getAppResourceFromContent(contentAllParents);
            const contentResource = this.service.content.info.getContentResourceTypeInfo(appResource, contentAllParents);
            dependenciesList.forEach((depend) => {
                var _a;
                depend.content.resource = this.service.version.component.assignResourceToComponent(((_a = depend === null || depend === void 0 ? void 0 : depend.content) === null || _a === void 0 ? void 0 : _a.resource) || {}, resourceObject, { contentResource });
            });
            const componentSettingObject = lodash_1.default.keyBy(((_a = appDetail.setting) === null || _a === void 0 ? void 0 : _a[constant_1.TYPE.COMPONENT]) || [], 'id');
            for (let content of contentList) {
                const componentCell = (content.package || {});
                componentCell.type = ((_b = contentFileObject[componentCell.id]) === null || _b === void 0 ? void 0 : _b.type) || '';
                componentCell.name = content.name;
                componentCell.version = content.version;
                componentCell.components = [];
                componentCell.category = (((_d = componentSettingObject[((_c = contentFileObject[componentCell.id]) === null || _c === void 0 ? void 0 : _c.id) || '']) === null || _d === void 0 ? void 0 : _d.category) || {});
                componentCell.resource = this.service.version.component.assignResourceToComponent(componentCell.resource || {}, resourceObject, { contentResource });
                this.service.component.addNameToEditorAndDepends([componentCell], fileContentObject);
                let dependIds = lodash_1.default.map(lodash_1.default.concat(componentCell.resource['editor-entry'], componentCell.resource.dependencies), 'id');
                if (dependIds.length > 0) {
                    for (const depend of dependenciesList) {
                        if (dependIds.indexOf(depend.contentId) !== -1) {
                            componentCell.components.push(Object.assign({ name: ((_e = fileObject === null || fileObject === void 0 ? void 0 : fileObject[depend.contentId]) === null || _e === void 0 ? void 0 : _e.name) || '', versionId: depend.id }, (depend === null || depend === void 0 ? void 0 : depend.content) || {}));
                            lodash_1.default.pull(dependIds, depend.contentId);
                        }
                        if (dependIds.length === 0) {
                            break;
                        }
                    }
                }
                // Guarantee to return id and name fields
                componentCell && components.push(componentCell);
            }
            return Response.success(components, 1110701);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.getAppComponentFailed, 3110701);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/live-version-infos'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppComponentLiveVersionInfo,
        description: '/components',
        tags: ['Component'],
        operationId: 'get-application-components-live-version-info',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(component_validate_types_1.AppComponentsRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, component_validate_types_1.AppComponentsReq]),
    __metadata("design:returntype", Promise)
], GetAppComponentListInfos.prototype, "index", null);
GetAppComponentListInfos = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], GetAppComponentListInfos);
exports.GetAppComponentListInfos = GetAppComponentListInfos;
