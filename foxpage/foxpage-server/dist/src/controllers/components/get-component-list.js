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
exports.GetAppComponentList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetAppComponentList = class GetAppComponentList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the live version details of the components under the application
     * @param  {AppPackagesReq} params
     * @returns {NameVersionPackage[]}
     */
    async index(ctx, params) {
        var _a, _b, _c, _d, _e, _f;
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            const contentList = await this.service.content.component.getComponentVersionLiveDetails({
                applicationId: params.applicationId,
                type: params.type || constant_1.TYPE.COMPONENT,
                contentIds: params.componentIds || [],
            });
            const contentIds = lodash_1.default.pull(lodash_1.default.map(contentList, (content) => { var _a; return (_a = content === null || content === void 0 ? void 0 : content.package) === null || _a === void 0 ? void 0 : _a.id; }), '', undefined);
            const contentFileObject = await this.service.file.list.getContentFileByIds(contentIds);
            const componentCells = [];
            for (let content of contentList) {
                // Exclude non-specified type of component data, and dependent information cannot appear non-specified component data
                if (params.type && params.type.indexOf((_b = contentFileObject[(_a = content === null || content === void 0 ? void 0 : content.package) === null || _a === void 0 ? void 0 : _a.id]) === null || _b === void 0 ? void 0 : _b.type) === -1) {
                    continue;
                }
                componentCells.push((content.package || {}));
            }
            let componentIds = this.service.content.component.getComponentResourceIds(componentCells, [
                'browser',
                'node',
                'css',
            ]);
            const dependenciesIdVersions = this.service.component.getComponentEditorAndDependends(componentCells, [
                'dependencies',
            ]);
            let dependencies = await this.service.component.getComponentDetailByIdVersion(dependenciesIdVersions);
            const dependenceList = lodash_1.default.toArray(dependencies);
            const dependComponentIds = this.service.content.component.getComponentResourceIds(lodash_1.default.map(dependenceList, 'content'), ['browser', 'node', 'css']);
            componentIds = componentIds.concat(dependComponentIds);
            const [resourceObject, contentAllParents, dependFileContentObject] = await Promise.all([
                this.service.content.resource.getResourceContentByIds(componentIds),
                this.service.content.list.getContentAllParents(componentIds),
                this.service.file.list.getContentFileByIds(lodash_1.default.map(dependenceList, 'contentId')),
            ]);
            const appResource = await this.service.application.getAppResourceFromContent(contentAllParents);
            const contentResource = this.service.content.info.getContentResourceTypeInfo(appResource, contentAllParents);
            this.service.component.addNameToEditorAndDepends(componentCells, dependFileContentObject);
            dependenceList.forEach((depend) => {
                var _a;
                depend.content.resource = this.service.version.component.assignResourceToComponent(((_a = depend === null || depend === void 0 ? void 0 : depend.content) === null || _a === void 0 ? void 0 : _a.resource) || {}, resourceObject, { contentResource });
            });
            let dependenceObject = lodash_1.default.keyBy(dependenceList, 'contentId');
            let components = [];
            for (let content of contentList) {
                // Exclude non-specified type of component data, and dependent information cannot appear non-specified component data
                if (params.type && params.type.indexOf((_d = contentFileObject[(_c = content === null || content === void 0 ? void 0 : content.package) === null || _c === void 0 ? void 0 : _c.id]) === null || _d === void 0 ? void 0 : _d.type) === -1) {
                    continue;
                }
                const componentCell = (content.package || {});
                componentCell.resource = this.service.version.component.assignResourceToComponent(componentCell.resource || {}, resourceObject, { contentResource });
                componentCell.resource['editor-entry'] = [];
                componentCell.type = (_f = contentFileObject[(_e = content === null || content === void 0 ? void 0 : content.package) === null || _e === void 0 ? void 0 : _e.id]) === null || _f === void 0 ? void 0 : _f.type;
                componentCell.name = content.name;
                componentCell.version = content.version;
                componentCell.isLive = true;
                componentCell.schema = '';
                componentCell.components = [];
                if (componentCell.resource.dependencies && componentCell.resource.dependencies.length > 0) {
                    componentCell.resource.dependencies.forEach((depend) => {
                        var _a, _b, _c, _d;
                        componentCell.components.push(Object.assign({
                            id: depend.id,
                            name: ((_a = dependFileContentObject === null || dependFileContentObject === void 0 ? void 0 : dependFileContentObject[depend.id]) === null || _a === void 0 ? void 0 : _a.name) || '',
                            versionId: (_b = dependenceObject[depend.id]) === null || _b === void 0 ? void 0 : _b.id,
                            version: (_c = dependenceObject[depend.id]) === null || _c === void 0 ? void 0 : _c.version,
                        }, ((_d = dependenceObject[depend.id]) === null || _d === void 0 ? void 0 : _d.content) || {}, { schema: {} }));
                    });
                }
                // Guarantee to return id and name fields
                componentCell && components.push(componentCell);
            }
            return Response.success(components, 1110801);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.getAppComponentFailed, 3110801);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/live-versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppComponent,
        description: '/components',
        tags: ['Component'],
        operationId: 'get-application-components-live-version',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(component_validate_types_1.AppComponentsRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, component_validate_types_1.AppComponentsReq]),
    __metadata("design:returntype", Promise)
], GetAppComponentList.prototype, "index", null);
GetAppComponentList = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], GetAppComponentList);
exports.GetAppComponentList = GetAppComponentList;
