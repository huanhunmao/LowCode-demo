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
exports.FileInfoService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const tools_1 = require("../../utils/tools");
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class FileInfoService extends base_service_1.BaseService {
    constructor() {
        super(Model.file);
    }
    /**
     * Single instance
     * @returns ContentInfoService
     */
    static getInstance() {
        this._instance || (this._instance = new FileInfoService());
        return this._instance;
    }
    /**
     * Add file details, only generate query statements needed for transactions,
     * and return the details of the created content
     * @param  {Partial<File>} params
     * @returns File
     */
    create(params, options) {
        const fileDetail = {
            id: params.id || (0, tools_1.generationId)(constant_1.PRE.FILE),
            applicationId: params.applicationId || '',
            name: lodash_1.default.trim(params.name) || '',
            intro: params.intro || '',
            suffix: params.suffix || '',
            folderId: params.folderId || '',
            tags: params.tags || [],
            type: params.type,
            creator: params.creator || options.ctx.userInfo.id,
        };
        options.ctx.transactions.push(Model.file.addDetailQuery(fileDetail));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.CREATE, fileDetail, {
            actionType: options.actionType || [constant_1.LOG.CREATE, constant_1.TYPE.FILE].join('_'),
            category: {
                type: constant_1.TYPE.FILE,
                fileId: fileDetail.id,
                folderId: params.folderId || '',
                applicationId: params.applicationId || '',
            },
        }));
        return fileDetail;
    }
    /**
     * Create file details, the content of the specified type file, version information
     * @param  {NewFileInfo} params
     * @returns Record
     */
    async addFileDetail(params, options) {
        const newFileCheck = lodash_1.default.pick(params, ['applicationId', 'folderId', 'name', 'type', 'suffix']);
        newFileCheck.deleted = false;
        const [appDetail, fileExist] = await Promise.all([
            Service.application.getDetailById(params.applicationId),
            this.checkExist(newFileCheck),
        ]);
        // Check the validity of the application ID, check the existence of the file
        if (!appDetail || appDetail.deleted || fileExist) {
            return fileExist ? { code: 2 } : { code: 1 };
        }
        // Check if pathname is duplicate
        if (params.type === constant_1.TYPE.PAGE) {
            const pathnameExist = await Service.file.check.pathNameExist({
                applicationId: params.applicationId,
                tags: params.tags || [],
                fileId: '',
            });
            if (pathnameExist) {
                return { code: 3 }; // pathname already exists
            }
        }
        // Create document details
        const fileDetail = {
            id: (0, tools_1.generationId)(constant_1.PRE.FILE),
            applicationId: params.applicationId,
            name: params.name,
            intro: params.intro || '',
            folderId: params.folderId || '',
            type: params.type,
            tags: params.tags || [],
            suffix: params.suffix || '',
            creator: params.creator || options.ctx.userInfo.id,
        };
        options.ctx.transactions.push(Model.file.addDetailQuery(fileDetail));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.CREATE, fileDetail, {
            actionType: options.actionType || [constant_1.LOG.CREATE, constant_1.TYPE.FILE].join('_'),
            category: {
                type: constant_1.TYPE.FILE,
                fileId: fileDetail.id,
                folderId: params.folderId || '',
                applicationId: params.applicationId,
            },
        }));
        const fileContentDetail = Object.assign({}, fileDetail, { contentId: '' });
        // Create content details
        if ([constant_1.TYPE.PAGE, constant_1.TYPE.TEMPLATE].indexOf(params.type) === -1) {
            const contentDetail = Service.content.info.addContentDetail({ title: params.name, fileId: fileDetail.id }, { ctx: options.ctx, type: params.type, content: params.content });
            fileContentDetail.contentId = contentDetail.id;
        }
        return { code: 0, data: fileContentDetail };
    }
    /**
     * Update file details
     * @param  {AppTypeFileUpdate} params
     * @returns Promise
     */
    async updateFileDetail(params, options) {
        const fileDetail = await this.getDetailById(params.id);
        if (!fileDetail || fileDetail.deleted) {
            return { code: 1 }; // Invalid file id
        }
        // Check if the file name already exists
        if (params.name && fileDetail.name !== params.name) {
            const fileExist = await Service.file.check.checkFileNameExist(params.id, Object.assign({ name: fileDetail.name }, lodash_1.default.pick(params, ['applicationId', 'folderId', 'name', 'type', 'suffix'])));
            if (fileExist) {
                return { code: 2 }; // New file name already exists
            }
        }
        // Check if pathname is duplicate
        if (fileDetail.type === constant_1.TYPE.PAGE) {
            const pathnameExist = await Service.file.check.pathNameExist({
                applicationId: params.applicationId,
                tags: params.tags || [],
                fileId: params.id,
            });
            if (pathnameExist) {
                return { code: 3 }; // pathname already exists
            }
            // Record file update log
            if (params.tags && params.tags !== fileDetail.tags) {
                options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.FILE_TAG, fileDetail, {
                    actionType: options.actionType || [constant_1.LOG.FILE_TAG, constant_1.TYPE.FILE].join('_'),
                    category: {
                        type: constant_1.TYPE.FILE,
                        fileId: fileDetail.id,
                        folderId: fileDetail.folderId,
                        applicationId: fileDetail.applicationId,
                    },
                }));
            }
        }
        // Update file
        options.ctx.transactions.push(Model.file.updateDetailQuery(params.id, lodash_1.default.pick(params, ['name', 'intro', 'type', 'tags'])));
        // Update content name
        if ([constant_1.TYPE.VARIABLE, constant_1.TYPE.CONDITION].indexOf(fileDetail.type) !== -1) {
            const contentList = await Service.content.file.getContentByFileIds([fileDetail.id]);
            contentList[0] && Service.content.info.updateDetailQuery(contentList[0].id, { title: params.name });
        }
        // Save logs
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.FILE_UPDATE, fileDetail, {
            actionType: options.actionType || [constant_1.LOG.UPDATE, constant_1.TYPE.FILE].join('_'),
            category: { type: constant_1.TYPE.FILE, fileId: fileDetail.id, applicationId: fileDetail.applicationId },
        }));
        return { code: 0 };
    }
    /**
     * Update the specified data directly
     * @param  {string} id
     * @param  {Partial<Content>} params
     * @returns void
     */
    updateFileItem(id, params, options) {
        options.ctx.transactions.push(Model.file.updateDetailQuery(id, params));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.FILE_UPDATE, Object.assign({ id }, params), { fileId: params.id }));
    }
    /**
     * Update the deletion status of the file. When deleting,
     * you need to check whether there is any content being referenced.
     * When you enable it, you don’t need to check
     * @param  {TypeStatus} params
     * @returns Promise
     */
    async setFileDeleteStatus(params, options) {
        const fileDetail = await this.getDetailById(params.id);
        if (!fileDetail) {
            return { code: 1 }; // Invalid file information
        }
        // Get all content and version under the file
        const contentVersion = await Service.content.list.getContentAndVersionListByFileIds([params.id]);
        // Check if there is information that content is referenced under file
        const relations = await Service.relation.getContentRelationalByIds(params.id, lodash_1.default.map(contentVersion.contentList, 'id'));
        if (relations.length > 0) {
            return { code: 2 }; // There is referenced relation information
        }
        // Set file enable state, set file, delete state of content and version
        options.ctx.transactions.push(this.setDeleteStatus(params.id, params.status), Service.content.info.batchUpdateDetailQuery({ fileId: params.id }, { deleted: true }), Service.version.info.setDeleteStatus(lodash_1.default.map(contentVersion.versionList, 'id'), true));
        // Save logs
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.FILE_REMOVE, [fileDetail], {
            actionType: options.actionType || [constant_1.LOG.DELETE, constant_1.TYPE.FILE].join('_'),
            category: { type: constant_1.TYPE.FILE, fileId: params.id, applicationId: fileDetail.applicationId },
        }), ...Service.log.addLogItem(constant_1.LOG.CONTENT_REMOVE, (contentVersion === null || contentVersion === void 0 ? void 0 : contentVersion.contentList) || [], {
            actionType: options.actionType || [constant_1.LOG.DELETE, constant_1.TYPE.CONTENT].join('_'),
            category: { type: constant_1.TYPE.CONTENT, fileId: params.id, applicationId: fileDetail.applicationId },
        }));
        return { code: 0 };
    }
    /**
     * Set the delete status of specified files in batches,
     * @param  {File[]} fileList
     * @returns void
     */
    batchSetFileDeleteStatus(fileList, options) {
        const status = !(options.status === false);
        options.ctx.transactions.push(this.setDeleteStatus(lodash_1.default.map(fileList, 'id'), status));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.FILE_REMOVE, fileList || [], {
            actionType: options.actionType || [constant_1.LOG.DELETE, constant_1.TYPE.FILE].join('_'),
            category: { type: constant_1.TYPE.FILE },
        }));
    }
    /**
     * Obtain file information by file name
     * @param  {FileNameSearch} params
     * @returns {File[]} Promise
     */
    async getFileIdByNames(params) {
        return Model.file.getDetailByNames(params);
    }
    /**
     * Get file information by name
     * @param  {FilePathSearch} params
     * @param  {boolean=false} createNew
     * @returns Promise
     */
    async getFileDetailByNames(params, options) {
        const createNew = (options === null || options === void 0 ? void 0 : options.createNew) || false;
        params.pathList = lodash_1.default.pull(params.pathList, '');
        let folderId = params.parentFolderId;
        let fileDetail = {};
        if (params.pathList && params.pathList.length > 0) {
            folderId = await Service.folder.info.getFolderIdByPathRecursive({
                applicationId: params.applicationId,
                parentFolderId: folderId,
                pathList: params.pathList,
            }, options);
        }
        if (folderId) {
            fileDetail = await this.getDetail({
                applicationId: params.applicationId,
                folderId: folderId,
                name: params.fileName,
            });
        }
        if ((lodash_1.default.isEmpty(fileDetail) || fileDetail.deleted) && createNew) {
            fileDetail = this.create({
                applicationId: params.applicationId,
                name: params.fileName,
                folderId: folderId,
                type: constant_1.TYPE.PAGE,
            }, { ctx: options.ctx });
        }
        return fileDetail;
    }
    /**
     * Create file content and content version information
     * return fileId,contentId,versionId
     * @param  {File} params
     * @returns Promise
     */
    createFileContentVersion(params, options) {
        // Create page content information
        const contentId = (0, tools_1.generationId)(constant_1.PRE.CONTENT);
        const contentDetail = {
            id: contentId,
            title: params.name || '',
            liveVersionNumber: 0,
            tags: [],
            fileId: params.id,
            creator: params.creator || '',
        };
        // Added default version information
        const contentVersionId = (0, tools_1.generationId)(constant_1.PRE.CONTENT_VERSION);
        const contentVersionDetail = {
            id: contentVersionId,
            contentId: contentId,
            version: options.hasVersion ? '0.0.1' : '',
            versionNumber: options.hasVersion ? 1 : 0,
            creator: params.creator || '',
            content: options.content || {},
        };
        this.create(params, { ctx: options.ctx });
        Service.content.info.create(contentDetail, { ctx: options.ctx });
        Service.version.info.create(contentVersionDetail, { ctx: options.ctx });
        // TODO Save logs
        return { fileId: params.id, contentId, contentVersionId };
    }
    /**
     * Recursively get the file id in the hierarchical file directory
     * @param  {{folders:FolderChildren[];files:File[]}} params
     * @returns string
     */
    getFileIdFromResourceRecursive(params) {
        const { folders = [], files = [] } = params;
        let fileIds = lodash_1.default.map(files, 'id');
        folders.forEach((folder) => {
            if (folder.children) {
                fileIds.concat(this.getFileIdFromResourceRecursive(folder.children));
            }
        });
        return fileIds;
    }
    /**
     * Recursively put content details into the corresponding file
     * @param  {FileFolderContentChildren} params
     * @param  {Record<string} contentObject
     * @param  {Record<string} versionObject
     * @returns FileFolderContentChildren
     */
    addContentToFileRecursive(params, contentObject, versionObject) {
        var _a, _b;
        if (((_a = params.files) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            params.files.forEach((file) => {
                file.contentId = contentObject[file.id] ? contentObject[file.id].id : '';
                file.content = contentObject[file.id] ? versionObject[contentObject[file.id].id].content : {};
            });
        }
        if (((_b = params.folders) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            params.folders.forEach((folder) => {
                var _a, _b;
                if (((_b = (_a = folder === null || folder === void 0 ? void 0 : folder.children) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                    folder.children = this.addContentToFileRecursive(folder.children, contentObject, versionObject);
                }
            });
        }
        return params;
    }
    /**
     * Get file details through pathName
     * @param  {string} applicationId
     * @param  {string} pathName
     * @returns Promise
     */
    async getFileDetailByPathname(applicationId, pathName) {
        // Get files that match the pathname tag
        let fileDetail;
        const fileList = await Service.file.list.find({
            applicationId: applicationId,
            tags: { $elemMatch: { pathname: pathName } },
            deleted: false,
        });
        fileDetail = fileList.find((file) => {
            var _a;
            return (((_a = file.tags) === null || _a === void 0 ? void 0 : _a.findIndex((tag) => {
                if (tag.pathname && tag.pathname === pathName && (lodash_1.default.isNil(tag.status) || tag.status)) {
                    return true;
                }
            })) !== -1);
        });
        return fileDetail || {};
    }
    /**
     * Copy files
     * Get all the contents of the source file, or the contents of the live version
     * Copy the details of each content to the content of the new page
     * If there are dependencies in the content that already exist in the relations,
     *  use the relation information directly
     *
     * setLive: set the first version to live after clone from store
     * @param  {string} sourceFileId
     * @param  {string} options?
     * @returns Promise
     */
    async copyFile(sourceFileId, targetApplicationId, options) {
        var _a;
        if (!options.relations) {
            options.relations = {};
        }
        !options.folderId && (options.folderId = '');
        !options.type && (options.type = constant_1.CONT_STORE);
        options.hasLive === undefined && (options.hasLive = true);
        // Get a list of source file contents
        let [fileDetail, contentList] = await Promise.all([
            this.getDetailById(sourceFileId),
            Service.content.list.find({ fileId: sourceFileId }),
        ]);
        if (options.hasLive) {
            contentList = contentList.filter((content) => content.liveVersionNumber > 0);
        }
        if (contentList.length === 0) {
            return options.relations;
        }
        // Get the version details of all content
        const contentVersionList = await Service.version.live.getContentAndRelationVersion(lodash_1.default.map(contentList, 'id'), true);
        let relationsContentIds = [];
        let contentDSLObject = {};
        contentVersionList.forEach((content) => {
            var _a;
            contentDSLObject[(_a = content.content) === null || _a === void 0 ? void 0 : _a.id] = content.content;
            if (content.relations) {
                const contentRelations = lodash_1.default.flatten(lodash_1.default.toArray(content.relations));
                contentDSLObject = lodash_1.default.merge(contentDSLObject, lodash_1.default.keyBy(contentRelations, 'id'));
                relationsContentIds.push(...lodash_1.default.map(contentRelations, 'id'));
            }
        });
        const [relationsFileObject, relationContentList] = await Promise.all([
            Service.file.list.getContentFileByIds(relationsContentIds),
            Service.content.list.getDetailByIds(relationsContentIds),
        ]);
        const fileList = lodash_1.default.toArray(relationsFileObject);
        contentList = contentList.concat(relationContentList);
        fileList.unshift(fileDetail);
        // Create a new file, and file associated data file
        for (const file of fileList) {
            if (!options.relations[file.id]) {
                const newFileDetail = Service.file.info.create({
                    applicationId: targetApplicationId,
                    name: options.type === constant_1.CONT_STORE ? file.name : [file.name, (0, tools_1.randStr)(4)].join('_'),
                    intro: file.intro,
                    suffix: file.suffix,
                    tags: [
                        {
                            type: constant_1.TAG.DELIVERY_CLONE,
                            clone: { id: file.id, applicationId: file.applicationId },
                        },
                    ],
                    type: file.type,
                    folderId: options.folderId || '',
                }, { ctx: options.ctx });
                options.relations[file.id] = { newId: newFileDetail.id };
            }
        }
        // Add copy file to app setting
        Service.application.addAppSetting({
            applicationId: targetApplicationId,
            type: fileDetail.type,
            typeId: ((_a = options.relations[fileDetail.id]) === null || _a === void 0 ? void 0 : _a.newId) || '',
            typeName: fileDetail.name || '',
        }, { ctx: options.ctx });
        // Pre-match content Id
        let tempRelations = {};
        for (const content of contentList) {
            !options.relations[content.id] &&
                (tempRelations[content.id] = {
                    newId: (0, tools_1.generationId)(constant_1.PRE.CONTENT_VERSION),
                    oldName: content.title,
                    newName: [content.title, (0, tools_1.randStr)(4)].join('_'),
                });
        }
        // Create file content
        let idMaps = {};
        for (const content of contentList) {
            const relationAndIdMaps = Service.content.info.copyContent(content, contentDSLObject[content.id] || {}, {
                ctx: options.ctx,
                relations: options.relations || {},
                tempRelations: {},
                setLive: options.setLive || false,
                idMaps,
            });
            options.relations = relationAndIdMaps.relations;
            idMaps = relationAndIdMaps.idMaps;
        }
        return options.relations || {};
    }
    /**
     * add reference file
     * check file exist, if not, create it
     * @param sourceFileId
     * @param sourceApplicationId
     * @param options
     * @returns
     */
    async referenceFile(sourceFileId, sourceApplicationId, options) {
        // Check reference file has in folder or not
        let fileDetail = await this.getDetail({
            folderId: options.targetFolderId,
            deleted: false,
            tags: { $elemMatch: { $and: [{ type: constant_1.TAG.DELIVERY_REFERENCE, 'reference.id': sourceFileId }] } },
        });
        // create reference file
        if (!fileDetail || lodash_1.default.isEmpty(fileDetail)) {
            fileDetail = Service.file.info.create({
                applicationId: options.targetApplicationId,
                name: options.fileName,
                type: options.type,
                folderId: options.targetFolderId,
                tags: [
                    {
                        type: constant_1.TAG.DELIVERY_REFERENCE,
                        reference: { id: sourceFileId, applicationId: sourceApplicationId },
                    },
                ],
            }, { ctx: options.ctx });
        }
        return fileDetail;
    }
    /**
     * @param  {any[]} tagList
     * @param  {string[]} tagIndexes
     * @returns any
     */
    removeTags(tagList, tagIndexes) {
        tagList.forEach((tag, index) => {
            tag = lodash_1.default.omit(tag, tagIndexes);
            if (lodash_1.default.isEmpty(tag)) {
                delete tagList[index];
            }
        });
        return tagList;
    }
    /**
     * filter reference file map
     * @param fileList
     * @returns
     */
    filterReferenceFile(fileList) {
        let referenceFileMap = {};
        fileList.map((file) => {
            var _a;
            const tag = Service.content.tag.getTagsByKeys(file.tags, ['reference']);
            if ((_a = tag.reference) === null || _a === void 0 ? void 0 : _a.id) {
                referenceFileMap[tag.reference.id] = file.id;
            }
        });
        return referenceFileMap;
    }
}
exports.FileInfoService = FileInfoService;
