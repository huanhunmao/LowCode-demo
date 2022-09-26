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
exports.GetRemoteComponent = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetRemoteComponent = class GetRemoteComponent extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get remote component data
     *
     * Get the component list with special conditions
     * Get the component latest version detail
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    async index(params) {
        var _a;
        try {
            // Get remote resource list
            const [resourceList, groupInfo, maxComponentVersion] = await Promise.all([
                this.service.resource.getResourceGroupLatestVersion(params.groupId, { packageName: params.name }),
                this.service.folder.info.getDetailById(params.groupId),
                this.service.version.list.getMaxVersionByFileIds([params.id]),
            ]);
            // Get component last version resource
            let lastVersionResource = {};
            if (maxComponentVersion[params.id]) {
                lastVersionResource = await this.service.component.getComponentResourcePath(maxComponentVersion[params.id].content);
                maxComponentVersion[params.id].content = lastVersionResource;
            }
            const componentMaxVersion = ((_a = maxComponentVersion[params.id]) === null || _a === void 0 ? void 0 : _a.versionNumber) || 0;
            const newComponentVersion = this.service.version.number.getVersionFromNumber(componentMaxVersion + 1);
            // filter resources by name
            let mapResourceList = [];
            let resourceVersionIds = [];
            const packageName = params.name.toLowerCase();
            resourceList.forEach((resource) => {
                if (resource.name.indexOf(packageName) !== -1) {
                    mapResourceList.push(resource);
                    resource.id && resourceVersionIds.push({ id: resource.id, version: resource.version });
                }
            });
            // Get Exist resource all content and path
            // let resourcePath: Record<string, ContentPath[]> = {};
            // if (resourceVersionIds.length > 0) {
            //   resourcePath = await this.service.resource.getResourceVersionDetail(
            //     params.groupId,
            //     resourceVersionIds,
            //   );
            // }
            // Set default component and resource mapping
            const groupName = (groupInfo === null || groupInfo === void 0 ? void 0 : groupInfo.name) || '';
            let componentResourceList = [];
            let resourcePathPre = '';
            mapResourceList.forEach((res) => {
                var _a;
                resourcePathPre = [groupName, res.resourceName, res.version].join('/');
                // const resourceFolderObject = _.keyBy(resourcePath[<string>res.id], 'path');
                const browserPath = lodash_1.default.has(res, ['files', 'cjs', 'production.js'])
                    ? resourcePathPre + '/umd/production.min.js'
                    : '';
                const cssPath = lodash_1.default.has(res, ['files', 'umd', 'style.css']) ? resourcePathPre + '/umd/style.css' : '';
                const debugPath = lodash_1.default.has(res, ['files', 'umd', 'development.js'])
                    ? resourcePathPre + '/umd/development.js'
                    : '';
                const nodePath = lodash_1.default.has(res, ['files', 'umd', 'production.min.js'])
                    ? resourcePathPre + '/cjs/production.js'
                    : '';
                const editorPath = lodash_1.default.has(res, ['files', 'umd', 'editor.js'])
                    ? resourcePathPre + '/umd/editor.js'
                    : '';
                // DO not response asset int resource
                ((_a = res.files) === null || _a === void 0 ? void 0 : _a.assets) && delete res.files.assets;
                componentResourceList.push({
                    resource: Object.assign({ groupId: params.groupId, groupName }, res),
                    component: {
                        id: params.id,
                        version: newComponentVersion,
                        content: {
                            resource: {
                                entry: {
                                    browser: { path: browserPath },
                                    css: { path: cssPath },
                                    debug: { path: debugPath },
                                    node: { path: nodePath },
                                    editor: { path: editorPath }
                                },
                                'editor-entry': [],
                            },
                            meta: res.meta || {},
                            schema: res.schema || {},
                        },
                    },
                });
            });
            return Response.success({
                components: componentResourceList,
                lastVersion: maxComponentVersion[params.id] || null,
            }, 1111201);
        }
        catch (err) {
            return Response.error(err, '', 3111201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/remote'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getRemoteComponents,
        description: '',
        tags: ['Component'],
        operationId: 'get-remote-component-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(component_validate_types_1.RemotePackageRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [component_validate_types_1.RemotePackageReq]),
    __metadata("design:returntype", Promise)
], GetRemoteComponent.prototype, "index", null);
GetRemoteComponent = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], GetRemoteComponent);
exports.GetRemoteComponent = GetRemoteComponent;
