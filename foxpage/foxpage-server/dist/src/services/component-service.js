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
exports.ComponentService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../config/constant");
const Model = __importStar(require("../models"));
const Service = __importStar(require("./index"));
class ComponentService {
    constructor() { }
    /**
     * Single instance
     * @returns ComponentService
     */
    static getInstance() {
        this._instance || (this._instance = new ComponentService());
        return this._instance;
    }
    /**
     * Update component version details, including version number
     * @param  {UpdateContentVersion} params
     * @returns Promise
     */
    async updateVersionDetail(params, options) {
        const versionDetail = await Service.version.info.getDetailById(params.id);
        const contentDetail = await Service.content.info.getDetailById(versionDetail.contentId || '');
        const missingFields = await Service.version.check.contentFields(contentDetail.fileId, params.content);
        if (missingFields.length > 0) {
            return { code: 1, data: missingFields }; // Check required fields
        }
        // Update
        params.content.id = versionDetail.contentId || '';
        options.ctx.transactions.push(Service.version.info.updateDetailQuery(params.id, {
            version: params.version,
            versionNumber: Service.version.number.createNumberFromVersion(params.version),
            content: params.content,
        }));
        // Save logs
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.VERSION_UPDATE, versionDetail, { fileId: contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.fileId }));
        return { code: 0 };
    }
    /**
     * Get component details through id and version
     * If the component specifies the version, such as: 1.1.2, then get the version of 1.1.2
     * If the component does not specify the version or other circumstances, the live version is taken
     *
     * Recursively obtain component information that the component depends on
     *
     * Taking into account the problem of obtaining different versions of the same component,
     * and the ids are all using contentId, it is impossible to distinguish the attribution of
     * different versions of the same component in the returned results
     * So, for the time being, if there are multiple versions of the same component,
     * the details will be obtained separately
     * @param  {any[]} componentInfos The information of all acquired components is used to exclude
     * the acquired version information of the components
     * @returns Promise Returns the component details information object with contentId_version as the key
     */
    async getComponentDetailByIdVersion(idVersions, componentInfos = {}) {
        const idNumbers = await this.getComponentVersionNumberFromVersion(idVersions);
        if (idNumbers.length === 0) {
            return {};
        }
        const idVersionNumbers = idNumbers.map((item) => {
            return { id: item.id, liveVersionNumber: item.versionNumber };
        });
        // Get component details
        const versionList = await Service.version.list.getContentInfoByIdAndNumber(idVersionNumbers);
        componentInfos = Object.assign(componentInfos, lodash_1.default.keyBy(versionList, (version) => [version.contentId, version.version].join('_')));
        // Get the dependency information in the component, and exclude the component information that has been obtained
        let dependencies = this.getComponentEditorAndDependends(lodash_1.default.map(versionList, 'content'));
        dependencies = lodash_1.default.dropWhile(dependencies, (item) => componentInfos[[item.id, (item === null || item === void 0 ? void 0 : item.version) || ''].join('_')]);
        // Recursively get component details
        if (dependencies.length > 0) {
            const dependenciesComponents = await this.getComponentDetailByIdVersion(dependencies, componentInfos);
            componentInfos = Object.assign(componentInfos, dependenciesComponents);
        }
        return componentInfos;
    }
    /**
     * Get the versionNumber corresponding to version by id, version
     * If version is empty or undefined, take the live version corresponding to id
     * Return:
     * [
     *  {id:xxx, versionNumbers: [1]},
     *  {id:xxx, version:0.0.2, versionNumbers: [2]},
     * ]
     * @param  {IdVersion[]} idVersions
     * @returns Promise
     */
    async getComponentVersionNumberFromVersion(idVersions) {
        let idVersionNumbers = [];
        let liveIdVersions = [];
        idVersions.forEach((item) => {
            if (item.version) {
                const versionNumber = Service.version.number.createNumberFromVersion(item.version);
                idVersionNumbers.push(Object.assign({}, item, { versionNumber }));
            }
            else {
                liveIdVersions.push(item); // Get the live version
            }
        });
        if (liveIdVersions.length > 0) {
            const contentList = await Service.content.list.getDetailByIds(lodash_1.default.map(liveIdVersions, 'id'));
            contentList.forEach((content) => {
                idVersionNumbers.push({ id: content.id, version: '', versionNumber: content.liveVersionNumber });
            });
        }
        return idVersionNumbers;
    }
    /**
     * Obtain the id and version information of editor and dependencies from the component version
     * @param  {ContentVersion[]} versionList
     * @returns IdVersion
     */
    getComponentEditorAndDependends(versionList, types) {
        let componentIdVersion = [];
        versionList.forEach((version) => {
            var _a, _b;
            if (!types || types.indexOf('editor-entry') !== -1) {
                componentIdVersion = componentIdVersion.concat(((_a = version === null || version === void 0 ? void 0 : version.resource) === null || _a === void 0 ? void 0 : _a['editor-entry']) || []);
            }
            if (!types || types.indexOf('dependencies') !== -1) {
                componentIdVersion = componentIdVersion.concat(((_b = version === null || version === void 0 ? void 0 : version.resource) === null || _b === void 0 ? void 0 : _b.dependencies) || []);
            }
        });
        return lodash_1.default.uniqWith(componentIdVersion, lodash_1.default.isEqual);
    }
    /**
     * Obtain the id and version information of editor and dependencies from the component version
     * @param  {ContentVersion[]} versionList
     * @returns IdVersion
     */
    getEditorAndDependenceFromComponent(componentList) {
        let componentIdVersion = [];
        componentList.forEach((component) => {
            var _a, _b;
            componentIdVersion = componentIdVersion.concat(((_a = component === null || component === void 0 ? void 0 : component.resource) === null || _a === void 0 ? void 0 : _a['editor-entry']) || []);
            componentIdVersion = componentIdVersion.concat(((_b = component === null || component === void 0 ? void 0 : component.resource) === null || _b === void 0 ? void 0 : _b.dependencies) || []);
        });
        return componentIdVersion;
    }
    /**
     * Add the name field to the editor-entry and dependencies data in the component
     * Support reference modification
     * @param  {Component[]} componentList
     * @param  {Record<string} componentFileObject
     * @param  {} File>
     * @returns Component
     */
    addNameToEditorAndDepends(componentList, componentFileObject) {
        componentList.forEach((component) => {
            var _a, _b, _c;
            if (!component.name && componentFileObject[component.id]) {
                component.name = ((_a = componentFileObject[component.id]) === null || _a === void 0 ? void 0 : _a.name) || '';
            }
            (((_b = component === null || component === void 0 ? void 0 : component.resource) === null || _b === void 0 ? void 0 : _b.dependencies) || []).forEach((depend) => {
                var _a;
                depend.name = ((_a = componentFileObject[depend.id]) === null || _a === void 0 ? void 0 : _a.name) || '';
            });
            (((_c = component === null || component === void 0 ? void 0 : component.resource) === null || _c === void 0 ? void 0 : _c['editor-entry']) || []).forEach((editor) => {
                var _a;
                editor.name = ((_a = componentFileObject[editor.id]) === null || _a === void 0 ? void 0 : _a.name) || '';
            });
        });
        return componentList;
    }
    /**
     * Get component resource host and path by content ids
     *
     * entry: { node:'cont_gyEx3GoTu5cCMGY' }
     * =>
     * entry: {
     *  node: {
          "host": "http://app.ares.fx.xxx.com/",
          "downloadHost": "http://app.ares.fx.xxx.com/",
          "path": "ares-test/flight-searchbox-container/0.3.1/umd/production.min.js",
          "contentId": "cont_gyEx3GoTu5cCMGY",
          "origin": "ARES"
        }
     * }
     * @param  {ComponentDSL} versionContent
     * @returns Promise
     */
    async getComponentResourcePath(versionContent) {
        // Get the corresponding resource information in the component
        const contentIds = Service.content.component.getComponentResourceIds([versionContent]);
        const idVersion = this.getComponentEditorAndDependends([versionContent]);
        const editorContentIds = lodash_1.default.map(idVersion, 'id');
        const fileContentObject = await Service.file.list.getContentFileByIds(editorContentIds);
        contentIds.push(...editorContentIds);
        // Append the name of the dependency to dependencies
        Service.component.addNameToEditorAndDepends([versionContent], fileContentObject);
        const contentList = await Service.content.list.getDetailByIds(contentIds);
        const fileList = await Service.file.info.getDetailByIds(lodash_1.default.map(contentList, 'fileId'));
        const [allFoldersObject, contentAllParents] = await Promise.all([
            Service.folder.list.getAllParentsRecursive(lodash_1.default.uniq(lodash_1.default.map(fileList, 'folderId'))),
            Service.content.list.getContentAllParents(contentIds),
        ]);
        const appResource = await Service.application.getAppResourceFromContent(contentAllParents);
        const contentResource = Service.content.info.getContentResourceTypeInfo(appResource, contentAllParents);
        const folderPath = {};
        // Splicing folder path
        Object.keys(allFoldersObject).forEach((folderId) => {
            folderPath[folderId] = '/' + lodash_1.default.map(lodash_1.default.drop(allFoldersObject[folderId]), 'folderPath').join('/');
        });
        const filePath = {};
        fileList.forEach((file) => {
            filePath[file.id] = (folderPath[file.folderId] || '') + '/' + file.name;
        });
        const resourceObject = {};
        contentList.forEach((content) => {
            resourceObject[content.id] = { realPath: filePath[content.fileId] || '' };
        });
        versionContent.resource = Service.version.component.assignResourceToComponent((versionContent === null || versionContent === void 0 ? void 0 : versionContent.resource) || {}, resourceObject, { contentResource });
        return versionContent;
    }
    /**
    * Get component file info by app id and component name
    * @param applicationId
    * @param componentName
    * @returns
    */
    async getComponentInfoByNames(applicationId, componentNames) {
        return Service.file.info.find({ applicationId, type: constant_1.TYPE.COMPONENT, name: { $in: componentNames }, deleted: false });
    }
    /**
     * Set the reference component new live status log
     * @param fileId
     * @param options
     */
    async updateReferLiveVersion(contentId, fileId, options) {
        // Get referenced applications file id
        const referenceFileList = await Service.file.list.find({
            type: constant_1.TYPE.COMPONENT,
            deleted: false,
            tags: { $elemMatch: { type: constant_1.TAG.DELIVERY_REFERENCE, 'reference.id': fileId } },
        });
        (referenceFileList || []).forEach(file => {
            options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.LIVE, ({ id: contentId, contentId }), {
                fileId: file.id,
                category: { type: constant_1.TYPE.APPLICATION, id: file.applicationId },
                dataType: constant_1.TYPE.COMPONENT,
            }));
        });
    }
    /**
     * Get category components list
     * @param params
     * @returns
     */
    async getPageCategoryComponents(params) {
        const { page, size } = Service.file.info.setPageSize(params);
        const searchParams = {
            applicationId: params.applicationId,
            deleted: false,
            type: constant_1.TYPE.COMPONENT,
            'tags.type': constant_1.TAG.COMPONENT_CATEGORY
        };
        if (params.search) {
            searchParams['$or'] = [
                {
                    'name': { $regex: new RegExp(params.search, 'i') }
                },
                {
                    'tags.type': constant_1.TAG.COMPONENT_CATEGORY,
                    '$or': [{
                            'tags.name': { $regex: new RegExp(params.search, 'i') }
                        }, {
                            'tags.categoryName': { $regex: new RegExp(params.search, 'i') }
                        }, {
                            'tags.groupName': { $regex: new RegExp(params.search, 'i') }
                        }]
                }
            ];
        }
        const skip = (page - 1) * size;
        const [list, count] = await Promise.all([
            Model.file.find(searchParams, '', { sort: { createTime: 1 }, skip, limit: size }),
            Model.file.getCountDocuments(searchParams),
        ]);
        return { list, count };
    }
}
exports.ComponentService = ComponentService;
