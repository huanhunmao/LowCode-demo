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
exports.ResourceService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const app_config_1 = require("../../app.config");
const constant_1 = require("../../config/constant");
const Service = __importStar(require("../services"));
const tools_1 = require("../utils/tools");
const plugin_services_1 = require("./plugin-services");
class ResourceService {
    constructor() {
        const pluginInstance = plugin_services_1.PluginService.getInstance();
        this.plugins = pluginInstance.plugins;
    }
    /**
     * Single instance
     * @returns ResourceService
     */
    static getInstance() {
        this._instance || (this._instance = new ResourceService());
        return this._instance;
    }
    async getResourceRemoteUrl(type, groupConfig) {
        const remoteUrls = await this.plugins.resourceRemoteUrl(Object.assign({ resourceConfig: app_config_1.config.resourceConfig }, {
            groupConfig,
            type
        }));
        if (lodash_1.default.isArray(remoteUrls)) {
            const typeUrl = lodash_1.default.find(remoteUrls, { type });
            return (typeUrl === null || typeUrl === void 0 ? void 0 : typeUrl.url) || '';
        }
        return '';
    }
    /**
     * Get resource list
     * @param  {any} options
     * @returns Promise
     */
    async getResourceList(options) {
        if (lodash_1.default.has(this.plugins, 'resourceList')) {
            const resourceData = await this.plugins.resourceList(options);
            let typeResource = undefined;
            if (lodash_1.default.isArray(resourceData)) {
                typeResource = lodash_1.default.find(resourceData, { type: options.type });
            }
            return typeResource || { group: '', packages: [] };
        }
        else {
            return { group: '', packages: [] };
        }
    }
    /**
     * Get the special resource group latest version from remote
     * @param  {string} groupFolderId
     * @param  {any} options
     * @returns Promise
     */
    async getResourceGroupLatestVersion(groupFolderId, options) {
        var _a, _b, _c, _d, _e, _f;
        const config = await this.getGroupConfig(groupFolderId);
        const [remoteGroupResources, localeGroupResources] = await Promise.all([
            this.getResourceList(Object.assign(config, options)),
            this.getGroupResourceMaxVersion(groupFolderId),
        ]);
        // Check if resource has new version
        let isNewVersion = false;
        let resourceList = [];
        for (const resource of remoteGroupResources.packages || []) {
            isNewVersion = false;
            if (((_a = resource.foxpage) === null || _a === void 0 ? void 0 : _a.resourceName) &&
                (!localeGroupResources[resource.foxpage.resourceName] ||
                    localeGroupResources[resource.foxpage.resourceName].version !== ((_b = resource.foxpage) === null || _b === void 0 ? void 0 : _b.version))) {
                isNewVersion = true;
            }
            resourceList.push(Object.assign(lodash_1.default.pick(resource.foxpage, ['name', 'version', 'resourceName', 'meta', 'schema']), {
                id: ((_d = localeGroupResources[((_c = resource.foxpage) === null || _c === void 0 ? void 0 : _c.resourceName) || '']) === null || _d === void 0 ? void 0 : _d.id) || undefined,
                latestVersion: ((_f = localeGroupResources[((_e = resource.foxpage) === null || _e === void 0 ? void 0 : _e.resourceName) || '']) === null || _f === void 0 ? void 0 : _f.version) || '',
                files: resource.files || {},
                isNew: isNewVersion,
            }));
        }
        return lodash_1.default.orderBy(resourceList, ['isNew', 'name'], ['desc', 'asc']);
    }
    /**
     * Get the resource group configs, include app config, group config and common resource config
     * @param  {string} groupFolderId
     * @returns Promise
     */
    async getGroupConfig(groupFolderId) {
        var _a;
        const folderDetail = await Service.folder.info.getDetailById(groupFolderId);
        let resourceId = '';
        let groupConfig = {};
        ((folderDetail === null || folderDetail === void 0 ? void 0 : folderDetail.tags) || []).forEach((tag) => {
            if (tag.type === constant_1.TAG.RESOURCE_GROUP) {
                resourceId = tag.resourceId;
            }
            else if (tag.type === constant_1.TAG.RESOURCE_CONFIG) {
                groupConfig = lodash_1.default.omit(tag, ['type']);
            }
        });
        let groupType = '';
        let appConfig = {};
        const groupName = folderDetail.name;
        if (resourceId && folderDetail.applicationId) {
            const appDetail = await Service.application.getDetailById(folderDetail.applicationId);
            const appResourceDetail = ((_a = lodash_1.default.filter(appDetail.resources || [], { id: resourceId })) === null || _a === void 0 ? void 0 : _a[0]) || {};
            appConfig = appResourceDetail.detail;
            groupType = appResourceDetail.name || '';
        }
        return {
            type: groupType.toLowerCase(),
            name: groupName,
            resourceConfig: app_config_1.config.resourceConfig,
            groupConfig,
            appConfig,
        };
    }
    /**
     * Get the special resource group child max version info
     * response {'resourceId': {id,name,version}}
     * @param  {string} groupFolderId
     * @returns Promise
     */
    async getGroupResourceMaxVersion(groupFolderId) {
        var _a;
        const resourceList = await Service.folder.list.find({ parentFolderId: groupFolderId, deleted: false });
        const resourceIds = lodash_1.default.map(resourceList, 'id');
        const resourceMaxVersion = await this.getResourceMaxVersion(resourceIds);
        let resourceVersionObject = {};
        for (const resource of resourceList) {
            resourceVersionObject[resource.name] = {
                id: resource.id,
                name: resource.name,
                version: ((_a = resourceMaxVersion[resource.id]) === null || _a === void 0 ? void 0 : _a.version) || '',
            };
        }
        return resourceVersionObject;
    }
    /**
     * Check if remote resource exist in db, include check version [folder level]
     * @param  {NewResourceDetail[]} resourceList
     * @param  {{applicationId:string;id:string}} options
     * @returns Promise
     */
    async checkRemoteResourceExist(resourceList, options) {
        let idVersions = [];
        let resourceNames = [];
        (resourceList || []).forEach((resource) => {
            resource.id
                ? idVersions.push(lodash_1.default.pick(resource, ['id', 'version', 'resourceName']))
                : resourceNames.push(resource.resourceName);
        });
        // Check resource with id, version
        let checkResourceVersionParams = [];
        for (const item of idVersions) {
            checkResourceVersionParams.push({ parentFolderId: item.id, name: item.version });
        }
        let existIdVersions = [];
        if (checkResourceVersionParams.length > 0) {
            existIdVersions = await Service.folder.list.find({
                applicationId: options.applicationId,
                $or: checkResourceVersionParams,
                deleted: false
            });
        }
        if (existIdVersions.length > 0) {
            // Get all children content ids
            const versionFolderIds = lodash_1.default.map(existIdVersions, 'id');
            const childrenData = await Service.folder.list.getAllChildrenRecursive({
                folderIds: versionFolderIds,
                depth: 5,
                hasContent: true,
            });
            let versionContentIdObject = {};
            for (const existVersion of existIdVersions) {
                const contentPathObject = this.formatRecursiveToPath(childrenData[existVersion.id]);
                versionContentIdObject[existVersion.parentFolderId] = lodash_1.default.invert(contentPathObject);
            }
            return { code: 1, data: lodash_1.default.map(existIdVersions, 'name'), contentPath: versionContentIdObject };
        }
        // Check resource with name
        let existResourceNames = [];
        if (resourceNames.length > 0) {
            existResourceNames = await Service.folder.list.find({
                applicationId: options.applicationId,
                parentFolderId: options.id,
                name: { $in: resourceNames },
                deleted: false,
            });
        }
        if (existResourceNames.length > 0) {
            return { code: 2, data: lodash_1.default.map(existResourceNames, 'name') };
        }
        return { code: 0 };
    }
    /**
     * Bulk save resources, include resources all children details
     * @param  {any[]} resourceList
     * @param  {{ctx:FoxCtx;applicationId:string;folderId:string}} options
     * @returns void
     */
    saveResources(resourceList, options) {
        let resourceContentIdMap = {};
        for (const resource of resourceList) {
            let resourceId = resource.id || '';
            if (!resourceId) {
                // Create resource
                const resourceDetail = Service.folder.info.create({
                    name: resource.resourceName || '',
                    intro: resource.name || '',
                    applicationId: options.applicationId || '',
                    parentFolderId: options.folderId || '',
                }, { ctx: options.ctx });
                resourceId = resourceDetail.id;
            }
            // Create resource version
            const versionFolderDetail = Service.folder.info.create({
                name: resource.version || '',
                applicationId: options.applicationId || '',
                parentFolderId: resourceId,
            }, { ctx: options.ctx });
            // Create resource file and version
            resourceContentIdMap[resource.resourceName] = this.addResourceChildrenRecursive(resource.files, {
                ctx: options.ctx,
                folderId: versionFolderDetail.id,
                applicationId: options.applicationId,
            });
        }
        return resourceContentIdMap;
    }
    /**
     * Create resource children details, include folder, file, content and version infos
     * @param  {any} resourceChildren
     * @param  {{ctx:FoxCtx;applicationId:string;folderId:string}} options
     * @returns response content id and path mapping object, eg
     * {umd:{'style.css':'cont_xxxx'},cjs:{'production.js':'cont_xxxx'}}
     */
    addResourceChildrenRecursive(resourceChildren, options) {
        let contentIdMap = {};
        for (const name in resourceChildren) {
            if (lodash_1.default.isString(resourceChildren[name])) {
                const fileDetail = Service.file.info.create({
                    name: name,
                    applicationId: options.applicationId,
                    folderId: options.folderId || '',
                    type: constant_1.TYPE.RESOURCE,
                }, { ctx: options.ctx });
                // Create content
                const contentId = (0, tools_1.generationId)(constant_1.PRE.CONTENT);
                contentIdMap[name] = contentId;
                Service.content.info.create({ id: contentId, title: name, fileId: fileDetail.id }, { ctx: options.ctx });
                // Create version
                Service.version.info.create({
                    contentId: contentId,
                    content: { id: contentId, realPath: resourceChildren[name] },
                }, { ctx: options.ctx });
            }
            else {
                const folderDetail = Service.folder.info.create({
                    name: name,
                    applicationId: options.applicationId || '',
                    folderPath: (0, tools_1.formatToPath)(name),
                    parentFolderId: options.folderId,
                }, { ctx: options.ctx });
                // Recursive create children
                const childrenContentIdMap = this.addResourceChildrenRecursive(resourceChildren[name], {
                    ctx: options.ctx,
                    folderId: folderDetail.id,
                    applicationId: options.applicationId,
                });
                contentIdMap[name] = childrenContentIdMap;
            }
        }
        return contentIdMap;
    }
    /**
     * Get the special resource folder data, include version folder, file
     * then format to path, eg.
     *  fold_xxx:[
     *   {id:'cont_xxx1', path: 'resourceGroup/bg-banner-container/0.2.0/schema.json'},
     *   {id:'cont_xxx2', path: 'resourceGroup/bg-banner-container/0.2.0/cjs/production.js'}
     *   {id:'cont_xxx3', path: 'resourceGroup/bg-banner-container/0.2.0/umd/style.css'}
     *  ]
     * @param  {string} groupId
     * @param  {{id:string;version:string}[]} idVersions
     * @param  {} Record<string
     * @returns Promise
     */
    async getResourceVersionDetail(groupId, idVersions) {
        var _a;
        const searchParams = lodash_1.default.map(idVersions, (item) => {
            return { parentFolderId: item.id, name: item.version };
        });
        const [resourceGroupInfo, resourceFolderList, resourceParentFolderList] = await Promise.all([
            Service.folder.info.getDetailById(groupId),
            Service.folder.list.find({ $or: searchParams, deleted: false }),
            Service.folder.list.getDetailByIds(lodash_1.default.map(idVersions, 'id')),
        ]);
        const groupPath = (resourceGroupInfo === null || resourceGroupInfo === void 0 ? void 0 : resourceGroupInfo.folderPath) || '';
        const resourceVersionIds = lodash_1.default.map(resourceFolderList, 'id');
        const resourceFolderObject = lodash_1.default.keyBy(resourceFolderList, 'id');
        const resourceParentFolderObject = lodash_1.default.keyBy(resourceParentFolderList, 'id');
        // Get resource version all children folder, file, content and version info
        const childrenInfo = await Service.folder.list.getAllChildrenRecursive({
            folderIds: resourceVersionIds,
            depth: 5,
            hasContent: true,
        });
        let resourcePathObject = {};
        for (const folderId in childrenInfo) {
            const parentFolderId = ((_a = resourceFolderObject[folderId]) === null || _a === void 0 ? void 0 : _a.parentFolderId) || '';
            if (parentFolderId) {
                const resourcePath = this.formatRecursiveToPath(childrenInfo[folderId]);
                resourcePathObject[parentFolderId] = [];
                lodash_1.default.forIn(resourcePath, (path, key) => {
                    var _a;
                    resourcePathObject[parentFolderId].push({
                        contentId: key,
                        path: [
                            groupPath,
                            ((_a = resourceParentFolderObject === null || resourceParentFolderObject === void 0 ? void 0 : resourceParentFolderObject[parentFolderId]) === null || _a === void 0 ? void 0 : _a.folderPath) || '',
                            resourceFolderObject[folderId].folderPath,
                            path,
                        ].join('/'),
                    });
                });
            }
        }
        return resourcePathObject;
    }
    formatRecursiveToPath(childrenInfo) {
        let resourcePath = {};
        if (((childrenInfo === null || childrenInfo === void 0 ? void 0 : childrenInfo.files) || []).length > 0) {
            childrenInfo.files.forEach((file) => {
                var _a, _b;
                ((_b = (_a = file.contents) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id) && (resourcePath[file.contents[0].id] = file.name);
            });
        }
        if (((childrenInfo === null || childrenInfo === void 0 ? void 0 : childrenInfo.folders) || []).length > 0) {
            childrenInfo.folders.forEach((child) => {
                if (child === null || child === void 0 ? void 0 : child.children) {
                    const childResourcePath = this.formatRecursiveToPath(child.children);
                    lodash_1.default.forIn(childResourcePath, (item, key) => {
                        childResourcePath[key] = child.folderPath + '/' + item;
                    });
                    resourcePath = lodash_1.default.merge(resourcePath, childResourcePath);
                }
            });
        }
        return resourcePath;
    }
    /**
     * Get resource content id by path
     * @param parentId
     * @param pathArr
     * @returns
     */
    async getContentIdByPath(parentId, pathArr) {
        let contentId = '';
        if (pathArr && pathArr.length > 1) {
            const folderDetail = await Service.folder.info.getDetail({ parentFolderId: parentId, name: pathArr[0], deleted: false });
            contentId = await this.getContentIdByPath(folderDetail.id, lodash_1.default.drop(pathArr));
        }
        else if (pathArr && pathArr.length === 1) {
            const fileDetail = await Service.file.info.getDetail({ folderId: parentId, name: pathArr[0], deleted: false });
            contentId = await this.getContentIdByPath(fileDetail.id);
        }
        else {
            const contentDetail = await Service.content.info.getDetail({ fileId: parentId, deleted: false });
            contentId = (contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.id) || '';
        }
        return contentId;
    }
    /**
     * Get resource max version infos
     * @param resourceIds
     * @returns
     */
    async getResourceMaxVersion(resourceIds) {
        const resourceVersions = await Service.folder.list.find({
            parentFolderId: { $in: resourceIds },
            deleted: false,
        });
        let maxResourceVersion = {};
        resourceVersions.forEach(version => {
            const versionNumber = Service.version.number.createNumberFromVersion(lodash_1.default.trim(version.name));
            if (!maxResourceVersion[version.parentFolderId]) {
                maxResourceVersion[version.parentFolderId] = { version: version.name, versionNumber };
            }
            else if (maxResourceVersion[version.parentFolderId].versionNumber < versionNumber) {
                maxResourceVersion[version.parentFolderId] = { version: version.name, versionNumber };
            }
        });
        return maxResourceVersion;
    }
}
exports.ResourceService = ResourceService;
