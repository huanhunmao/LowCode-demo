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
exports.VersionInfoService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const tools_1 = require("../../utils/tools");
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class VersionInfoService extends base_service_1.BaseService {
    constructor() {
        super(Model.version);
    }
    /**
     * Single instance
     * @returns VersionInfoService
     */
    static getInstance() {
        this._instance || (this._instance = new VersionInfoService());
        return this._instance;
    }
    /**
     * New version details are added, only query statements required by the transaction are generated,
     * and the details of the created version are returned
     * @param  {Partial<ContentVersion>} params
     * @returns ContentVersion
     */
    create(params, options) {
        var _a;
        const invalidRelations = Service.version.check.relation(((_a = params.content) === null || _a === void 0 ? void 0 : _a.relation) || {});
        if (invalidRelations.length > 0) {
            throw new Error('Invalid content relation:' + invalidRelations.join(', '));
        }
        const versionDetail = {
            id: params.id || (0, tools_1.generationId)(constant_1.PRE.CONTENT_VERSION),
            contentId: params.contentId || '',
            version: params.version || '0.0.1',
            versionNumber: params.versionNumber || 1,
            status: (params.status || constant_1.VERSION.STATUS_BASE),
            content: Object.assign({ id: params.contentId }, params.content || {}),
            creator: params.creator || options.ctx.userInfo.id,
        };
        options.ctx.transactions.push(Model.version.addDetailQuery(versionDetail));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.CREATE, versionDetail, {
            actionType: options.actionType || [constant_1.LOG.CREATE, constant_1.TYPE.VERSION].join('_'),
            category: {
                type: constant_1.TYPE.VERSION,
                versionId: versionDetail.id,
                contentId: params.contentId || '',
            },
        }));
        return versionDetail;
    }
    /**
     * Update version details, including version number
     * Get the maximum effective version data of the specified content (possibly base or other status)
     * 1, If it is base, update directly,
     * 2, If it is other status or no data, create a base and then update
     * @param  {UpdateContentVersion} params
     * @returns Promise
     */
    async updateVersionDetail(params, options) {
        if (params.content && params.content.relation) {
            const invalidRelations = Service.version.check.relation(params.content.relation || {});
            if (invalidRelations.length > 0) {
                return { code: 5, data: invalidRelations };
            }
        }
        const [contentDetail, versionDetail] = await Promise.all([
            Service.content.info.getDetailById(params.id),
            Service.version.info.getMaxContentVersionDetail(params.id, { ctx: options.ctx }),
        ]);
        // Check required fields
        if (!contentDetail) {
            return { code: 1 };
        }
        // Check if the version already exists
        if (params.version && (!versionDetail || params.version !== versionDetail.version)) {
            const versionExist = await Service.version.check.versionExist(params.id, params.version);
            if (versionExist) {
                return { code: 3 };
            }
        }
        const missingFields = await Service.version.check.contentFields(contentDetail.fileId, params.content);
        if (missingFields.length > 0) {
            return { code: 4, data: missingFields };
        }
        let versionId = (versionDetail === null || versionDetail === void 0 ? void 0 : versionDetail.id) || '';
        let version = params.version || (versionDetail === null || versionDetail === void 0 ? void 0 : versionDetail.version) || '0.0.1';
        // Create a new base version
        if (!versionDetail || versionDetail.status !== constant_1.VERSION.STATUS_BASE) {
            const newVersionDetail = await this.createNewContentVersion(params.id, { ctx: options.ctx });
            version = newVersionDetail.version;
            versionId = newVersionDetail.id;
        }
        // Update
        params.content.id = params.id;
        params.content.version = '0.0.1'; // default dsl version
        options.ctx.transactions.push(Model.version.updateDetailQuery(versionId, {
            version: version,
            versionNumber: Service.version.number.createNumberFromVersion(version),
            content: params.content,
        }));
        // Save logs
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.VERSION_UPDATE, versionDetail, {
            actionType: options.actionType || [constant_1.LOG.UPDATE, constant_1.TYPE.VERSION].join('_'),
            category: {
                type: constant_1.TYPE.VERSION,
                versionId: versionDetail.id,
                contentId: contentDetail.id,
                fileId: contentDetail.fileId,
            },
        }));
        return { code: 0, data: versionId };
    }
    /**
     * Update the specified data directly
     * @param  {string} id
     * @param  {Partial<Content>} params
     * @returns void
     */
    updateVersionItem(id, params, options) {
        if (params.content.relation) {
            const invalidRelations = Service.version.check.relation(params.content.relation || {});
            if (invalidRelations.length > 0) {
                throw new Error('Invalid content relation:' + invalidRelations.join(', '));
            }
        }
        options.ctx.transactions.push(Model.version.updateDetailQuery(id, params));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.VERSION_UPDATE, Object.assign({ id }, params), {
            actionType: options.actionType || [constant_1.LOG.UPDATE, constant_1.TYPE.VERSION].join('_'),
            category: {
                type: constant_1.TYPE.VERSION,
                versionId: id,
                contentId: params.contentId || '',
                fileId: options.fileId || '',
            },
        }));
    }
    /**
     * Get the maximum version information of the specified page
     * If the largest version is invalid, whether to create a new version
     * @param  {string} contentId
     * @param  {boolean=false} createNew
     * @returns Promise
     */
    async getMaxContentVersionDetail(contentId, options) {
        const createNew = options.createNew || false;
        let versionDetail = await Model.version.getMaxVersionDetailById(contentId);
        if (createNew &&
            (!versionDetail || versionDetail.status !== constant_1.VERSION.STATUS_BASE || versionDetail.deleted)) {
            versionDetail = await this.createNewContentVersion(contentId, { ctx: options.ctx });
        }
        return versionDetail || {};
    }
    /**
     * Get the latest base version details of the specified content
     * @param  {string} contentId
     * @returns Promise
     */
    async getMaxBaseContentVersionDetail(contentId) {
        return Model.version.getMaxVersionDetailById(contentId, { status: constant_1.VERSION.STATUS_BASE });
    }
    /**
     * Through contentId, create a new version details
     * The new version number is determined by the latest valid version under the content
     * @param {string} contentId
     * @returns {Promise<ContentVersion>}
     * @memberof VersionService
     */
    async createNewContentVersion(contentId, options) {
        const newVersionDetail = (await this.getContentLatestVersion({ contentId })) || {};
        // Set new version information
        newVersionDetail.id = (0, tools_1.generationId)(constant_1.PRE.CONTENT_VERSION);
        newVersionDetail.contentId = contentId;
        newVersionDetail.content = (newVersionDetail === null || newVersionDetail === void 0 ? void 0 : newVersionDetail.content) || { id: contentId };
        newVersionDetail.status = constant_1.VERSION.STATUS_BASE;
        newVersionDetail.version = Service.version.number.getNewVersion(newVersionDetail === null || newVersionDetail === void 0 ? void 0 : newVersionDetail.version);
        newVersionDetail.versionNumber = Service.version.number.createNumberFromVersion(newVersionDetail === null || newVersionDetail === void 0 ? void 0 : newVersionDetail.version);
        newVersionDetail.creator = options.ctx.userInfo.id;
        // Save
        options.ctx.transactions.push(Model.version.addDetailQuery(newVersionDetail));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.CREATE, newVersionDetail, {
            actionType: options.actionType || [constant_1.LOG.CREATE, constant_1.TYPE.VERSION].join('_'),
            category: { type: constant_1.TYPE.VERSION, versionId: newVersionDetail.id, contentId },
        }));
        return lodash_1.default.cloneDeep(newVersionDetail);
    }
    /**
     * Set the delete status of the version.
     * If the version is live version, you need to check whether the content is referenced
     * @param  {TypeStatus} params
     * @returns Promise
     */
    async setVersionDeleteStatus(params, options) {
        const versionDetail = await this.getDetailById(params.id);
        if (!versionDetail) {
            return { code: 1 }; // Invalid version information
        }
        const contentDetail = await Service.content.info.getDetailById(versionDetail.contentId);
        // TODO In the current version of the live state, you need to check whether the content is referenced
        if (params.status && (contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.liveVersionNumber) === versionDetail.versionNumber) {
            return { code: 2 }; // Can not be deleted
        }
        // Set the enabled state
        options.ctx.transactions.push(this.setDeleteStatus(params.id, params.status));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.VERSION_REMOVE, [versionDetail], {
            actionType: options.actionType || [constant_1.LOG.DELETE, constant_1.TYPE.VERSION].join('_'),
            fileId: contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.fileId,
        }));
        return { code: 0 };
    }
    /**
     * Set the delete status of the specified version in batches,
     * @param  {ContentVersion[]} versionList
     * @returns void
     */
    batchSetVersionDeleteStatus(versionList, options) {
        const status = !(options.status === false);
        options.ctx.transactions.push(this.setDeleteStatus(lodash_1.default.map(versionList, 'id'), status));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.VERSION_REMOVE, versionList, {
            actionType: options.actionType || [constant_1.LOG.DELETE, constant_1.TYPE.VERSION].join('_'),
            category: { type: constant_1.TYPE.VERSION },
        }));
    }
    /**
     * Get version details by file name and content version.
     * The data is the case where the file name and content name are the same,
     * and there is only one content under the file, such as components
     * @param  {string} applicationId
     * @param  {NameVersion[]} nameVersions
     * @returns Promise
     */
    async getVersionDetailByFileNameVersion(applicationId, type, nameVersions) {
        const fileList = await Service.file.info.getFileIdByNames({
            applicationId,
            type,
            fileNames: lodash_1.default.map(nameVersions, 'name'),
        });
        const contentList = await Service.content.file.getContentByFileIds(lodash_1.default.map(fileList, 'id'));
        const versionList = await Service.version.number.getContentVersionByNumberOrVersion(nameVersions, contentList);
        const contentObject = lodash_1.default.keyBy(contentList, 'id');
        const contentNameObject = lodash_1.default.keyBy(contentList, 'title');
        const contentVersionList = lodash_1.default.map(versionList, (version) => Object.assign({}, version, lodash_1.default.pick(contentObject[version.contentId], ['title', 'versionNumber'])));
        const contentVersionObject = lodash_1.default.keyBy(contentVersionList, (item) => item.title + item.versionNumber);
        const nameLiveVersions = lodash_1.default.map(nameVersions, (item) => {
            var _a;
            return Object.assign({}, item, {
                versionNumber: item.version
                    ? Service.version.number.createNumberFromVersion(item.version)
                    : (_a = contentNameObject[item.name]) === null || _a === void 0 ? void 0 : _a.liveVersionNumber,
            });
        });
        const nameVersionContent = nameLiveVersions.map((item) => Object.assign(lodash_1.default.pick(item, ['name', 'version']), lodash_1.default.pick(contentVersionObject[item.name + item.versionNumber], ['content'])));
        return nameVersionContent;
    }
    /**
     * Get the latest version information of the page content
     * @param  {SearchLatestVersion} params
     * @returns {ContentVersion} Promise
     */
    async getContentLatestVersion(params) {
        const version = await Model.version.getLatestVersionInfo(params);
        return version;
    }
    /**
     * Get details of the specified page version or live version
     * @param  {ContentVersionNumber} params
     * @returns Promise
     */
    async getContentVersionDetail(params) {
        const { versionNumber = 0, contentId } = params;
        let versionDetail;
        if (versionNumber) {
            versionDetail = await this.getDetail(params);
        }
        else {
            // Get the live version information of content
            const contentDetail = await Service.content.info.getDetailById(contentId);
            versionDetail = await Service.version.number.getContentByNumber({
                contentId,
                versionNumber: (contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.liveVersionNumber) || 1,
            });
        }
        return versionDetail;
    }
    /**
     * Through contentList and contentVersionList information,
     * match contentId+version corresponding to the version details corresponding to different versions.
     * And contains the version details corresponding to the live version with contentId as the key.
     * Return information with content+version as the key
     * @param  {Content[]} contentList
     * @param  {ContentVersion[]} contentVersionList
     * @returns StringObject
     */
    mappingContentVersionInfo(contentList, contentVersionList) {
        const contentVersionObject = {};
        const contentIdObject = lodash_1.default.keyBy(contentList, 'id');
        contentVersionList.forEach((content) => {
            contentVersionObject[content.contentId + content.version] = content;
            if (contentIdObject[content.contentId] &&
                contentIdObject[content.contentId].liveVersionNumber === content.versionNumber) {
                contentVersionObject[content.contentId] = content;
            }
        });
        return contentVersionObject;
    }
    /**
     * Find the templateId through the version data of the page, and get the live version data of the template
     * @param  {string} applicationId
     * @param  {ContentVersion} pageVersion
     * @returns Promise
     */
    async getTemplateDetailFromPage(applicationId, pageVersion, options) {
        var _a, _b, _c, _d;
        let templateId = '';
        const liveTemplateVersion = !lodash_1.default.isNil(options === null || options === void 0 ? void 0 : options.isLive) ? options === null || options === void 0 ? void 0 : options.isLive : true;
        const key = lodash_1.default.findKey(((_a = pageVersion === null || pageVersion === void 0 ? void 0 : pageVersion.content) === null || _a === void 0 ? void 0 : _a.relation) || {}, (item) => item.type === constant_1.TYPE.TEMPLATE);
        templateId = key !== '' ? (_d = (_c = (_b = pageVersion === null || pageVersion === void 0 ? void 0 : pageVersion.content) === null || _b === void 0 ? void 0 : _b.relation) === null || _c === void 0 ? void 0 : _c[key]) === null || _d === void 0 ? void 0 : _d.id : '';
        let templateVersion = {};
        if (templateId) {
            if (liveTemplateVersion) {
                const templateVersions = await Service.version.live.getContentLiveDetails({
                    applicationId: applicationId,
                    type: constant_1.TYPE.TEMPLATE,
                    contentIds: [templateId],
                });
                templateVersion = templateVersions[0] || {};
            }
            else {
                const versionObject = await Service.version.list.getContentMaxVersionDetail([templateId]);
                templateVersion = versionObject[templateId] || {};
            }
        }
        return templateVersion;
    }
    /**
     * Copy version information from the specified content version
     * 1, update the structureId in the source version
     * 2, replace the relationId in the source version
     * @param  {DSL} sourceContentVersion
     * @param  {string} contentId: New content ID
     * @param  {
     *  relations:Record<string>
     *  tempRelations: Record<string, Record<string, string>>,
     *  create?: boolean
     *  versionId?: string
     * } options
     * create: true if for copy and create version, false is for copy and update version
     * versionId: when create is false, then update this version id's detail
     * @returns
     */
    copyContentVersion(sourceContentVersion, contentId, options) {
        const dsl = lodash_1.default.cloneDeep(sourceContentVersion);
        dsl.id = contentId;
        // Process the structureId value in schemes and replace the content id value in relation
        const dslSchemaAndIdMap = this.changeDSLStructureIdRecursive(sourceContentVersion.schemas, options.idMaps);
        dsl.schemas = dslSchemaAndIdMap.schemas;
        const idMaps = dslSchemaAndIdMap.idMaps || {};
        if (dsl.relation) {
            for (const key in dsl.relation) {
                if (options.relations[dsl.relation[key].id]) {
                    dsl.relation[key].id = options.relations[dsl.relation[key].id].newId;
                }
                else if (options.tempRelations[dsl.relation[key].id]) {
                    dsl.relation[key].id = options.tempRelations[dsl.relation[key].id].newId;
                    options.relations[dsl.relation[key].id] = options.tempRelations[dsl.relation[key].id];
                }
                else {
                    const contentId = (0, tools_1.generationId)(constant_1.PRE.CONTENT);
                    const contentName = key.split(':')[0] || '';
                    options.relations[dsl.relation[key].id] = {
                        newId: contentId,
                        oldName: contentName,
                        newName: [contentName, (0, tools_1.randStr)(4)].join('_'),
                    };
                    dsl.relation[key].id = contentId;
                }
            }
        }
        // Update relation name in schemas
        const newDSL = this.replaceVersionSchemaRelationNames(dsl.schemas, dsl.relation, options.relations);
        dsl.schemas = newDSL.schemas;
        dsl.relation = newDSL.relation;
        // Create version
        if (options.create) {
            this.create({
                id: (0, tools_1.generationId)(constant_1.PRE.CONTENT_VERSION),
                contentId: contentId,
                version: '0.0.1',
                versionNumber: 1,
                status: (options.setLive ? constant_1.VERSION.STATUS_RELEASE : constant_1.VERSION.STATUS_BASE),
                content: dsl,
            }, { ctx: options.ctx });
        }
        else {
            options.ctx.transactions.push(Model.version.updateDetailQuery(options.versionId || '', { content: dsl }));
        }
        return { relations: options.relations, idMaps };
    }
    /**
     * Update the structureId value in the dsl schema
     * @param  {DslSchemas[]} schemas
     * @returns DslSchemas
     */
    changeDSLStructureIdRecursive(schemas, idMaps = {}, parentId) {
        // TODO structure id in props need to replace too
        (schemas || []).forEach((structure) => {
            var _a, _b;
            if (!idMaps[structure.id]) {
                const newStructureId = (0, tools_1.generationId)(constant_1.PRE.STRUCTURE);
                idMaps[structure.id] = newStructureId;
                structure.id = newStructureId;
            }
            else {
                structure.id = idMaps[structure.id];
            }
            if ((_a = structure.extension) === null || _a === void 0 ? void 0 : _a.parentId) {
                if (!idMaps[structure.extension.parentId]) {
                    idMaps[structure.extension.parentId] = (0, tools_1.generationId)(constant_1.PRE.STRUCTURE);
                }
                structure.extension.parentId = idMaps[structure.extension.parentId] || parentId;
            }
            if ((_b = structure.extension) === null || _b === void 0 ? void 0 : _b.extendId) {
                if (!idMaps[structure.extension.extendId]) {
                    idMaps[structure.extension.extendId] = (0, tools_1.generationId)(constant_1.PRE.STRUCTURE);
                }
                structure.extension.extendId = idMaps[structure.extension.extendId] || '';
            }
            if (structure.wrapper) {
                structure.wrapper = parentId;
            }
            if (structure.children && structure.children.length > 0) {
                this.changeDSLStructureIdRecursive(structure.children, idMaps, idMaps[structure.id]);
            }
        });
        return { schemas, idMaps };
    }
    /**
     * replace the special schemas relation name and ids
     * @param  {DslSchemas[]} schemas
     * @param  {Record<string, DslRelation>} relation
     * @param  {Record<string,Record<string,string>>} relations
     * @returns
     */
    replaceVersionSchemaRelationNames(schemas = [], relation = {}, relations = {}) {
        var _a;
        let schemasString = JSON.stringify(schemas);
        const relationMatches = schemasString.match(/\{\{.*?\}\}/g);
        // Replace relation in schemas
        relationMatches &&
            relationMatches.forEach((match) => {
                var _a;
                const matchStr = lodash_1.default.replace(lodash_1.default.replace(match, '{{', ''), '}}', '');
                const matchArr = matchStr.split(':');
                const matchRelationName = matchArr[0] || '';
                if (matchRelationName) {
                    const matchReg = lodash_1.default.replace(match, /\$/g, '\\$');
                    for (const key in relations) {
                        if ([constant_1.TYPE.TEMPLATE, constant_1.TYPE.CONDITION, constant_1.TYPE.FUNCTION].indexOf((_a = relation[matchStr]) === null || _a === void 0 ? void 0 : _a.type) !== -1 &&
                            key === matchArr[1]) {
                            matchArr[1] = relations[key].newId;
                            schemasString = lodash_1.default.replace(schemasString, new RegExp(matchReg, 'gm'), '{{' + matchArr.join(':') + '}}');
                            break;
                        }
                        else if (relations[key].oldName === matchRelationName) {
                            matchArr[0] = relations[key].newName;
                            schemasString = lodash_1.default.replace(schemasString, new RegExp(matchReg, 'gm'), '{{' + matchArr.join(':') + '}}');
                            break;
                        }
                    }
                }
            });
        // Replace key name in relation
        for (const key in relation) {
            const relationArr = key.split(':');
            for (const item in relations) {
                if ([constant_1.TYPE.TEMPLATE, constant_1.TYPE.CONDITION, constant_1.TYPE.FUNCTION].indexOf((_a = relation[key]) === null || _a === void 0 ? void 0 : _a.type) !== -1 &&
                    item === relationArr[1]) {
                    relationArr[1] = relations[item].newId;
                    relation[relationArr.join(':')] = relation[key];
                    delete relation[key];
                    break;
                }
                else if (relations[item].oldName === relationArr[0]) {
                    relationArr[0] = relations[item].newName;
                    relation[relationArr.join(':')] = relation[key];
                    delete relation[key];
                    break;
                }
            }
        }
        return { schemas: JSON.parse(schemasString), relation: relation || {} };
    }
    /**
     * Get the version's relation and component details
     * @param versionDetail
     * @param options
     * @returns
     */
    async getPageVersionInfo(versionDetail, options) {
        var _a;
        const versionSchemas = ((_a = versionDetail === null || versionDetail === void 0 ? void 0 : versionDetail.content) === null || _a === void 0 ? void 0 : _a.schemas) || [];
        let componentDetailList = [];
        let mockObject = [];
        [mockObject, componentDetailList] = await Promise.all([
            !options.isLive
                ? Service.content.mock.getMockBuildVersions([versionDetail.contentId])
                : Service.content.mock.getMockLiveVersions([versionDetail.contentId]),
            Service.content.component.getComponentsFromDSL(options.applicationId, versionSchemas),
        ]);
        let componentList = lodash_1.default.flatten(componentDetailList);
        const editorComponentList = await Service.content.component.getEditorDetailFromComponent(options.applicationId, componentList);
        componentList = componentList.concat(editorComponentList);
        const idVersionList = Service.component.getEditorAndDependenceFromComponent(componentList);
        const dependencies = await Service.component.getComponentDetailByIdVersion(idVersionList);
        componentList = componentList.concat(lodash_1.default.map(dependencies, (depend) => (depend === null || depend === void 0 ? void 0 : depend.content) || {}));
        const componentIds = Service.content.component.getComponentResourceIds(componentList);
        const [resourceObject, relationObject, componentFileObject, contentAllParents] = await Promise.all([
            Service.content.resource.getResourceContentByIds(componentIds),
            Service.version.relation.getVersionRelations({ [versionDetail.contentId]: versionDetail }, false),
            Service.file.list.getContentFileByIds(lodash_1.default.map(componentList, 'id')),
            Service.content.list.getContentAllParents(componentIds),
        ]);
        const appResource = await Service.application.getAppResourceFromContent(contentAllParents);
        const contentResource = Service.content.info.getContentResourceTypeInfo(appResource, contentAllParents);
        // Add the resource to the component, add the editor-entry and the name of the dependencies in the component
        componentList = Service.component.addNameToEditorAndDepends(componentList, componentFileObject);
        componentList = Service.content.component.replaceComponentResourceIdWithContent(componentList, resourceObject, contentResource);
        const relations = await Service.relation.formatRelationResponse(relationObject);
        return { versionDetail, componentList, relations, mockObject };
    }
}
exports.VersionInfoService = VersionInfoService;
