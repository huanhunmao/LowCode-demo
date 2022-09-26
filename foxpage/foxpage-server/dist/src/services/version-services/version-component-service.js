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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionComponentService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class VersionComponentService extends base_service_1.BaseService {
    constructor() {
        super(Model.version);
    }
    /**
     * Single instance
     * @returns VersionComponentService
     */
    static getInstance() {
        this._instance || (this._instance = new VersionComponentService());
        return this._instance;
    }
    /**
     * Obtain the dependency information of the component from the version
     * @param  {any[]} nameVersionContent
     * @returns Record
     */
    getComponentDependsFromVersions(nameVersionContent) {
        let dependenceObject = {};
        nameVersionContent.forEach((version) => {
            var _a;
            dependenceObject[version.name] = lodash_1.default.map(((_a = version === null || version === void 0 ? void 0 : version.content) === null || _a === void 0 ? void 0 : _a.dependence) || [], 'name');
        });
        return dependenceObject;
    }
    /**
     * Get the associated resource ids from the entry of the component
     * @param  {Record<string} resource
     * @param  {} string>
     * @returns string
     */
    getComponentResourceIds(resource) {
        let resourceIds = [];
        Object.keys((resource === null || resource === void 0 ? void 0 : resource.entry) || {}).forEach((value) => {
            lodash_1.default.isString(value) && resourceIds.push(value);
        });
        return resourceIds;
    }
    /**
     * Get the resource id associated with the component from the component details,
     * and get the resource information,
     * and then attach it to the location corresponding to the resource id
     * @param  {ContentVersion[]} componentList
     * @returns Promise
     */
    async mappingResourceToComponent(componentList) {
        let resourceContentIds = [];
        componentList.forEach((component) => {
            var _a;
            resourceContentIds = resourceContentIds.concat(this.getComponentResourceIds(((_a = component.content) === null || _a === void 0 ? void 0 : _a.resource) || {}));
        });
        // Get resource details
        let newResourceObject = {};
        const resourceObject = await Service.content.resource.getResourceContentByIds(resourceContentIds);
        lodash_1.default.forIn(resourceObject, (value, key) => {
            lodash_1.default.forIn(value, (path) => (newResourceObject[key] = path));
        });
        // Matching component resources
        componentList.forEach((component) => {
            if (component.content && component.content.resource) {
                component.content.resource = this.assignResourceToComponent(component.content.resource, newResourceObject);
            }
        });
        return componentList;
    }
    /**
     * Match the resource details to the component information through contentId,
    * The returned entry needs to distinguish between the returned object, contentId, or only realPath,
    * such as:
    * {
        "host": "https://www.unpkg.com/",
        "downloadHost": "https://www.unpkg.com/",
        "path": "@fox-design/xxxx/dist/umd/production.min.js",
        "contentId": "cont_xxxx"
      }
     * @param  {Record<string} resource
     * @param  {Record<string} resourceObject
     * @returns Record
     */
    assignResourceToComponent(resource, resourceObject, options = {}) {
        Object.keys(resource.entry || {}).forEach((key) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const contentId = resource.entry[key] || '';
            if (resourceObject[contentId]) {
                resource.entry[key] = {
                    host: ((_c = (_b = (_a = options === null || options === void 0 ? void 0 : options.contentResource) === null || _a === void 0 ? void 0 : _a[contentId]) === null || _b === void 0 ? void 0 : _b.detail) === null || _c === void 0 ? void 0 : _c.host) || '',
                    downloadHost: ((_f = (_e = (_d = options === null || options === void 0 ? void 0 : options.contentResource) === null || _d === void 0 ? void 0 : _d[contentId]) === null || _e === void 0 ? void 0 : _e.detail) === null || _f === void 0 ? void 0 : _f.downloadHost) || '',
                    path: ((_j = lodash_1.default.pull((_h = (_g = resourceObject[contentId]) === null || _g === void 0 ? void 0 : _g.realPath) === null || _h === void 0 ? void 0 : _h.split('/'), '')) === null || _j === void 0 ? void 0 : _j.join('/')) || '',
                    contentId,
                    origin: ((_l = (_k = options === null || options === void 0 ? void 0 : options.contentResource) === null || _k === void 0 ? void 0 : _k[contentId]) === null || _l === void 0 ? void 0 : _l.name) || '',
                };
            }
            else {
                resource.entry[key] = {};
            }
        });
        (resource['editor-entry'] || []).forEach((editor) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const contentId = editor.id;
            if (resourceObject[contentId]) {
                editor = lodash_1.default.merge(editor, {
                    host: ((_c = (_b = (_a = options === null || options === void 0 ? void 0 : options.contentResource) === null || _a === void 0 ? void 0 : _a[contentId]) === null || _b === void 0 ? void 0 : _b.detail) === null || _c === void 0 ? void 0 : _c.host) || '',
                    downloadHost: ((_f = (_e = (_d = options === null || options === void 0 ? void 0 : options.contentResource) === null || _d === void 0 ? void 0 : _d[contentId]) === null || _e === void 0 ? void 0 : _e.detail) === null || _f === void 0 ? void 0 : _f.downloadHost) || '',
                    path: ((_j = lodash_1.default.pull((_h = (_g = resourceObject[contentId]) === null || _g === void 0 ? void 0 : _g.realPath) === null || _h === void 0 ? void 0 : _h.split('/'), '')) === null || _j === void 0 ? void 0 : _j.join('/')) || '',
                    contentId,
                    origin: ((_l = (_k = options === null || options === void 0 ? void 0 : options.contentResource) === null || _k === void 0 ? void 0 : _k[contentId]) === null || _l === void 0 ? void 0 : _l.name) || '',
                });
            }
        });
        return resource;
    }
}
exports.VersionComponentService = VersionComponentService;
