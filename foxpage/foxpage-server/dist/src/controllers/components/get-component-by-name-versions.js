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
exports.GetAppComponentListByNameVersion = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetAppComponentListByNameVersion = class GetAppComponentListByNameVersion extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the component content of the specified name and version under the application,
     * response format:
     * {
     *   name,
     *   version,
     *   package:{
     *    name,version,type,...
     *   }
     * }:
     *    The name and version of the first layer are the data in the request parameters,
     *    and the name and version in the package are the actual data of the specific content.
     *    type refers to the type of page，eg. component
     * @param  {AppNameVersionPackagesReq} params
     * @returns {NameVersionPackage[]}
     */
    async index(ctx, params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            // Get the information of the specified component and the specified version
            let contentList = [];
            contentList = await this.service.content.component.getAppComponentByNameVersion({
                applicationId: params.applicationId,
                contentNameVersion: params.nameVersions,
                type: constant_1.TYPE.COMPONENT,
            });
            let contentPackags = [];
            for (const content of contentList) {
                if (params.type && params.type.length > 0 && params.type.indexOf((_a = content.package) === null || _a === void 0 ? void 0 : _a.type) === -1) {
                    continue;
                }
                contentPackags.push(content === null || content === void 0 ? void 0 : content.package);
            }
            let componentIds = this.service.content.component.getComponentResourceIds(contentPackags);
            const dependenciesIdVersions = this.service.component.getComponentEditorAndDependends(contentPackags);
            const dependencies = await this.service.component.getComponentDetailByIdVersion(dependenciesIdVersions);
            const dependenciesList = lodash_1.default.toArray(dependencies);
            const dependComponentIds = this.service.content.component.getComponentResourceIds(lodash_1.default.map(dependenciesList, 'content'));
            componentIds = componentIds.concat(dependComponentIds);
            const [resourceObject, contentAllParents] = await Promise.all([
                this.service.content.resource.getResourceContentByIds(componentIds),
                this.service.content.list.getContentAllParents(componentIds),
            ]);
            const [appResource, fileContentObject] = await Promise.all([
                this.service.application.getAppResourceFromContent(contentAllParents),
                this.service.file.list.getContentFileByIds(lodash_1.default.map(dependenciesList, 'contentId')),
            ]);
            const contentResource = this.service.content.info.getContentResourceTypeInfo(appResource, contentAllParents);
            dependenciesList.forEach((depend) => {
                var _a;
                depend.content.resource = this.service.version.component.assignResourceToComponent(((_a = depend === null || depend === void 0 ? void 0 : depend.content) === null || _a === void 0 ? void 0 : _a.resource) || {}, resourceObject, { contentResource });
            });
            const dependenceObject = lodash_1.default.keyBy(dependenciesList, 'contentId');
            let components = [];
            for (const content of contentList) {
                if (!content.package) {
                    content.package = {};
                }
                // Exclude non-specified types of component data
                if (params.type && params.type.length > 0 && params.type.indexOf((_b = content.package) === null || _b === void 0 ? void 0 : _b.type) === -1) {
                    continue;
                }
                // The default setting, you need to replace it from other returned data later
                content.package.isLive = true;
                content.package.components = [];
                content.package.resource = this.service.version.component.assignResourceToComponent(((_c = content === null || content === void 0 ? void 0 : content.package) === null || _c === void 0 ? void 0 : _c.resource) || {}, resourceObject, { contentResource });
                const editorDependences = lodash_1.default.concat(((_d = content.package.resource) === null || _d === void 0 ? void 0 : _d['editor-entry']) || [], ((_e = content.package.resource) === null || _e === void 0 ? void 0 : _e.dependencies) || []);
                // Attach the resource details of the dependent component to the component
                if (editorDependences.length > 0) {
                    // Append the name of the dependency to dependencies
                    this.service.component.addNameToEditorAndDepends([content.package], fileContentObject);
                    for (const editorDepend of editorDependences) {
                        content.package.components.push(Object.assign({
                            name: ((_f = fileContentObject === null || fileContentObject === void 0 ? void 0 : fileContentObject[editorDepend.id]) === null || _f === void 0 ? void 0 : _f.name) || '',
                            id: editorDepend.id,
                            versionId: ((_g = dependenceObject[editorDepend.id]) === null || _g === void 0 ? void 0 : _g.id) || '',
                            version: ((_h = dependenceObject[editorDepend.id]) === null || _h === void 0 ? void 0 : _h.version) || '',
                        }, ((_j = dependenceObject[editorDepend.id]) === null || _j === void 0 ? void 0 : _j.content) || {}));
                    }
                }
                content.package.schema = undefined;
                components.push(content);
            }
            return Response.success(components, 1110401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.getAppComponentListFailed, 3110401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/version-infos'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppNameVersionPackages,
        description: '',
        tags: ['Component'],
        operationId: 'get-app-name-version-packages',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(component_validate_types_1.AppComponentsRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, component_validate_types_1.AppNameVersionPackagesReq]),
    __metadata("design:returntype", Promise)
], GetAppComponentListByNameVersion.prototype, "index", null);
GetAppComponentListByNameVersion = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], GetAppComponentListByNameVersion);
exports.GetAppComponentListByNameVersion = GetAppComponentListByNameVersion;
