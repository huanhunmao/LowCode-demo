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
exports.ComponentContentService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const tools_1 = require("../../utils/tools");
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class ComponentContentService extends base_service_1.BaseService {
    constructor() {
        super(Model.content);
    }
    /**
     * Single instance
     * @returns ContentService
     */
    static getInstance() {
        this._instance || (this._instance = new ComponentContentService());
        return this._instance;
    }
    /**
     * Get all data information from DSL
     * @param  {applicationId} string
     * @param  {DslSchemas[]} schemas
     * @returns Promise
     */
    async getComponentsFromDSL(applicationId, schemas) {
        // Get component name infos
        const componentInfos = this.getComponentInfoRecursive(schemas);
        const componentList = await this.getComponentDetails(applicationId, componentInfos);
        return componentList;
    }
    /**
     * Recursively obtain component information of all levels in the DSL
     * @param  {DslSchemas[]} components
     * @returns NameVersion
     */
    getComponentInfoRecursive(schemas) {
        let componentInfo = [];
        schemas === null || schemas === void 0 ? void 0 : schemas.forEach((schema) => {
            schema.name && componentInfo.push({ name: schema.name, version: schema.version || '' });
            if (schema.children && schema.children.length > 0) {
                const children = this.getComponentInfoRecursive(schema.children);
                componentInfo = componentInfo.concat(children);
            }
        });
        return componentInfo;
    }
    /**
     * Get the component details under the specified application through the component name and version
     * @param  {string} applicationId
     * @param  {NameVersion[]} componentInfos
     * @returns Promise
     */
    async getComponentDetails(applicationId, componentInfos, showLiveVersion = true) {
        // Get the file corresponding to the component
        const fileList = await Service.file.info.find({
            applicationId,
            name: { $in: lodash_1.default.map(componentInfos, 'name') },
            deleted: false,
        });
        // replace reference component
        fileList.forEach(file => {
            if (file.tags && file.tags.length > 0) {
                const referTag = lodash_1.default.find(file.tags, { type: 'reference' });
                (referTag === null || referTag === void 0 ? void 0 : referTag.reference) && (file.id = referTag.reference.id || '');
            }
        });
        // Get the corresponding contentIds under the file
        let contentVersionString = [];
        let contentVersionNumber = [];
        const contentList = await Service.content.file.getContentByFileIds(lodash_1.default.map(fileList, 'id'));
        const contentNameObject = lodash_1.default.keyBy(contentList, 'title');
        componentInfos.forEach((component) => {
            if (contentNameObject[component.name] && component.version) {
                contentVersionString.push({
                    contentId: contentNameObject[component.name].id,
                    version: component.version,
                });
            }
            else {
                contentVersionNumber.push(lodash_1.default.pick(contentNameObject[component.name], ['id', 'liveVersionNumber']));
            }
        });
        // Get content containing different versions of the same component
        const versionList = await Promise.all([
            Service.version.list.getContentInfoByIdAndNumber(contentVersionNumber),
            Service.version.list.getContentInfoByIdAndVersion(contentVersionString),
        ]);
        const contentIdObject = lodash_1.default.keyBy(contentList, 'id');
        const liveVersionObject = lodash_1.default.keyBy(contentVersionNumber, 'id');
        const componentList = lodash_1.default.flatten(versionList).map((version) => {
            var _a;
            return Object.assign({
                name: contentIdObject[version.contentId].title,
                version: showLiveVersion ||
                    version.versionNumber !== ((_a = liveVersionObject[version.contentId]) === null || _a === void 0 ? void 0 : _a.liveVersionNumber)
                    ? version.version
                    : '',
                type: constant_1.TYPE.COMPONENT,
            }, version.content);
        });
        return componentList;
    }
    /**
     * Get the resource ids set by the component from the component list
     * @param  {ContentVersion[]} componentList
     * @returns Promise
     */
    getComponentResourceIds(componentList, types) {
        let componentIds = [];
        componentList.forEach((component) => {
            var _a;
            let item = ((_a = component === null || component === void 0 ? void 0 : component.resource) === null || _a === void 0 ? void 0 : _a.entry) || {};
            if (types && types.length > 0) {
                item = lodash_1.default.pick(item, types || []);
            }
            componentIds = componentIds.concat(lodash_1.default.pull(lodash_1.default.values(item), ''));
        });
        return lodash_1.default.filter(componentIds, (id) => lodash_1.default.isString(id));
    }
    /**
     * Replace the resource id in the component with the resource details
     * @param  {ContentVersion[]} componentList
     * @param  {Record<string} resourceObject
     * @param  {} object>
     * @returns ContentVersion
     */
    replaceComponentResourceIdWithContent(componentList, resourceObject, contentResource = {}) {
        let newComponentList = lodash_1.default.cloneDeep(componentList);
        newComponentList.forEach((component) => {
            var _a;
            const item = ((_a = component === null || component === void 0 ? void 0 : component.resource) === null || _a === void 0 ? void 0 : _a.entry) || {};
            Object.keys(item).forEach((typeKey) => {
                var _a, _b, _c;
                const path = ((_a = resourceObject[item[typeKey]]) === null || _a === void 0 ? void 0 : _a.realPath) || '';
                const contentId = item[typeKey] || '';
                item[typeKey] = contentId
                    ? {
                        host: ((_b = contentResource === null || contentResource === void 0 ? void 0 : contentResource[contentId]) === null || _b === void 0 ? void 0 : _b.detail.host) || '',
                        downloadHost: ((_c = contentResource === null || contentResource === void 0 ? void 0 : contentResource[contentId]) === null || _c === void 0 ? void 0 : _c.detail.downloadHost) || '',
                        path: lodash_1.default.pull(path.split('/'), '').join('/'),
                        contentId,
                    }
                    : {};
            });
        });
        return newComponentList;
    }
    /**
     * Get the id of the component editor from the component details, version
     * @param  {Component[]} componentList
     * @returns string
     */
    getComponentEditors(componentList) {
        let editorIdVersion = [];
        componentList.forEach((component) => {
            var _a;
            editorIdVersion = editorIdVersion.concat(((_a = component === null || component === void 0 ? void 0 : component.resource) === null || _a === void 0 ? void 0 : _a['editor-entry']) || []);
        });
        return editorIdVersion;
    }
    /**
     * Get the editor information from the component, and return the component details of the editor
     * @param  {string} applicationId
     * @param  {Component[]} componentList
     * @returns Promise
     */
    async getEditorDetailFromComponent(applicationId, componentList) {
        const editorIdVersion = Service.content.component.getComponentEditors(componentList);
        const editorFileObject = await Service.file.list.getContentFileByIds(lodash_1.default.map(editorIdVersion, 'id'));
        const editorComponentIds = lodash_1.default.pull(lodash_1.default.map(lodash_1.default.toArray(editorFileObject), 'id'), '');
        if (editorComponentIds.length > 0) {
            editorIdVersion.forEach((editor) => { var _a; return (editor.name = ((_a = editorFileObject[editor.id]) === null || _a === void 0 ? void 0 : _a.name) || ''); });
        }
        return Service.content.component.getComponentDetails(applicationId, editorIdVersion);
    }
    /**
     * Recursively get the details of the component,
     * Check the validity of the components
     * Check whether the component has a circular dependency
     * @param  {string} applicationId
     * @param  {NameVersion[]} componentInfos
     * @param  {Record<string} componentDependents
     * @param  {} string[]>={}
     * @returns Promise
     */
    async getComponentDetailRecursive(applicationId, componentInfos, componentDependents = {}) {
        let componentList = await Service.version.info.getVersionDetailByFileNameVersion(applicationId, constant_1.TYPE.COMPONENT, componentInfos);
        // Check the component, whether the version is returned
        let missingComponents = [];
        const componentListObject = lodash_1.default.keyBy(componentList, (component) => component.name + component.version);
        componentInfos === null || componentInfos === void 0 ? void 0 : componentInfos.forEach((component) => {
            !componentListObject[component.name + component.version] && missingComponents.push(component);
        });
        if (missingComponents.length > 0) {
            return { componentList, dependence: {}, recursiveItem: '', missingComponents };
        }
        const dependence = Service.version.component.getComponentDependsFromVersions(componentList);
        const componentDepend = Service.content.check.checkCircularDependence(componentDependents, dependence);
        let dependenceObject = componentDepend.dependencies;
        const nextDepends = lodash_1.default.flatten(Object.values(dependence)).map((depend) => {
            return { name: depend, version: '' };
        });
        if (!componentDepend.recursiveItem && nextDepends.length > 0) {
            const dependDependence = await this.getComponentDetailRecursive(applicationId, nextDepends, dependenceObject);
            componentList = componentList.concat(dependDependence.componentList);
            componentDepend.recursiveItem = dependDependence.recursiveItem;
            dependenceObject = dependDependence.dependence;
            missingComponents = dependDependence.missingComponents;
        }
        componentList = lodash_1.default.toArray(lodash_1.default.keyBy(componentList, (component) => [component.name, component.version].join('_')));
        return {
            componentList,
            dependence: dependenceObject,
            recursiveItem: componentDepend.recursiveItem,
            missingComponents,
        };
    }
    /**
     * Get the component details by name, version,
     * and return the object with the passed name_version as the key name
     * @param  {ComponentNameVersion} params
     * @returns Promise
     */
    async getComponentDetailByNameVersion(params) {
        const fileList = await Service.file.info.getFileIdByNames({
            applicationId: params.applicationId,
            fileNames: lodash_1.default.map(params.nameVersions, 'name'),
            type: params.type || [],
        });
        // Get content information through fileId, and the version details corresponding to the specified name version
        const contentList = await Service.content.file.getContentByFileIds(lodash_1.default.map(fileList, 'id'));
        const [contentVersionList, contentFileObject] = await Promise.all([
            Service.version.list.getContentVersionListByNameVersion(contentList, params.nameVersions),
            Service.file.list.getContentFileByIds(lodash_1.default.map(contentList, 'id')),
        ]);
        let versionObject = {};
        const contentObject = lodash_1.default.keyBy(contentList, 'id');
        let nameLive = {};
        contentVersionList.forEach((version) => {
            var _a, _b, _c;
            const componentName = ((_a = contentFileObject[version.contentId]) === null || _a === void 0 ? void 0 : _a.name) || '';
            const liveVersion = ((_b = contentObject[version.contentId]) === null || _b === void 0 ? void 0 : _b.liveVersionNumber) || 0;
            if (componentName) {
                nameLive[componentName] = version.versionNumber === liveVersion ? version.version : '';
                versionObject[[componentName, version.version].join('_')] = Object.assign({
                    name: componentName,
                    type: ((_c = contentFileObject[version.contentId]) === null || _c === void 0 ? void 0 : _c.type) || '',
                    isLive: version.versionNumber === liveVersion,
                    version: version.version,
                }, version.content || {});
            }
        });
        let nameVersionDetail = {};
        params.nameVersions.forEach((item) => {
            const key = [item.name, item.version].join('_');
            if (item.version) {
                nameVersionDetail[key] = Object.assign(item, { content: versionObject[key] || {} });
            }
            else {
                nameVersionDetail[key] = Object.assign(item, {
                    content: versionObject[[item.name, nameLive[item.name]].join('_')] || {},
                });
            }
        });
        return nameVersionDetail;
    }
    /**
     * Get the content version details of the component through the content name and version,
     *  the same name has different versions of data
     * Prerequisite: The content name is the same as the file name (for example: component type content),
     *  and there is only 1 content information under the file
     *
     * Get the versionNumber of the content with the version,
     *  and get the versionNumber of the live if there is no version,
     * Get content details through contentId, versionNumber
     * @param  {AppNameVersion} params
     * @returns {NameVersionPackage[]} Promise
     */
    async getAppComponentByNameVersion(params) {
        // Get the fileIds of the specified name of the specified application
        const fileList = await Service.file.info.getFileIdByNames({
            applicationId: params.applicationId,
            type: params.type || '',
            fileNames: lodash_1.default.map(params.contentNameVersion, 'name'),
        });
        // Get content information through fileId
        const contentList = await Service.content.file.getContentByFileIds(lodash_1.default.map(fileList, 'id'));
        // Get the version details corresponding to the specified name version
        const contentVersionList = await Service.version.list.getContentVersionListByNameVersion(contentList, params.contentNameVersion);
        // Get the details corresponding to different versions of contentId,
        // including live details with contentId as the key
        const contentVersionObject = Service.version.info.mappingContentVersionInfo(contentList, contentVersionList);
        // Match data
        let contentId = '';
        let version = '';
        let componentContentList = [];
        const fileObject = lodash_1.default.keyBy(fileList, 'id');
        const contentIdObject = lodash_1.default.keyBy(contentList, 'id');
        const contentNameObject = lodash_1.default.keyBy(contentList, 'title');
        params.contentNameVersion.forEach((content) => {
            var _a, _b;
            contentId = ((_a = contentNameObject[content.name]) === null || _a === void 0 ? void 0 : _a.id) || '';
            version = content.version || '';
            if (contentVersionObject[contentId + version]) {
                componentContentList.push(Object.assign({ version }, content, {
                    package: Object.assign({}, contentVersionObject[contentId + version].content, {
                        name: content.name,
                        version: contentVersionObject[contentId + version].version,
                        type: (_b = fileObject[contentIdObject[contentId].fileId]) === null || _b === void 0 ? void 0 : _b.type,
                    }),
                }));
            }
            else {
                componentContentList.push(content);
            }
        });
        return componentContentList;
    }
    /**
     * Get the live version details of the component content under the specified application,
     * and return the content version details
     * @param  {AppTypeContent} params
     * @returns {NameVersionPackage[]} Promise
     */
    async getComponentVersionLiveDetails(params) {
        const contentIds = params.contentIds || [];
        let contentInfo = [];
        // Get contentIds
        if (contentIds.length === 0) {
            contentInfo = await Service.content.list.getAppContentList(lodash_1.default.pick(params, ['applicationId', 'type']));
        }
        else {
            // Check whether contentIds is under the specified appId
            contentInfo = await Service.content.list.getDetailByIds(contentIds);
            contentInfo = lodash_1.default.filter(contentInfo, { deleted: false });
        }
        // Get live details
        let contentVersionList = [];
        if (contentInfo.length > 0) {
            const contentLiveIds = contentInfo.map((content) => lodash_1.default.pick(content, ['id', 'liveVersionNumber']));
            contentVersionList = await Service.version.list.getContentInfoByIdAndNumber(contentLiveIds);
        }
        const contentObject = lodash_1.default.keyBy(contentInfo, 'id');
        // Data returned by splicing
        return contentVersionList.map((contentVersion) => {
            return Object.assign({ name: contentObject[contentVersion.contentId].title }, { version: contentVersion.version, package: contentVersion.content });
        });
    }
    /**
     * Clone package content
     * @param targetFileId
     * @param sourceFileId
     * @param options
     */
    async cloneContent(targetFileId, sourceFileId, options) {
        const contentList = await Service.content.file.getContentByFileIds([sourceFileId]);
        const contentInfo = contentList[0] || {};
        const contentId = (contentInfo === null || contentInfo === void 0 ? void 0 : contentInfo.id) || '';
        if (contentId) {
            const contentDetail = Service.content.info.create({
                id: (0, tools_1.generationId)(constant_1.PRE.CONTENT),
                title: lodash_1.default.trim(contentInfo === null || contentInfo === void 0 ? void 0 : contentInfo.title) || '',
                fileId: targetFileId,
                creator: options.ctx.userInfo.id,
            }, options);
            const versionInfo = await Service.version.info.getDetail({ contentId, versionNumber: contentInfo === null || contentInfo === void 0 ? void 0 : contentInfo.liveVersionNumber });
            Service.version.info.create({
                id: (0, tools_1.generationId)(constant_1.PRE.CONTENT_VERSION),
                contentId: contentDetail.id,
                version: versionInfo.version || '0.0.1',
                versionNumber: versionInfo.versionNumber || 1,
                content: Object.assign({ id: contentDetail.id }, versionInfo.content || {}),
                creator: options.ctx.userInfo.id,
            }, options);
        }
    }
}
exports.ComponentContentService = ComponentContentService;
