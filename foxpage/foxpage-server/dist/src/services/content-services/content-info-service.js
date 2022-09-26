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
exports.ContentInfoService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const tools_1 = require("../../utils/tools");
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class ContentInfoService extends base_service_1.BaseService {
    constructor() {
        super(Model.content);
    }
    /**
     * Single instance
     * @returns ContentInfoService
     */
    static getInstance() {
        this._instance || (this._instance = new ContentInfoService());
        return this._instance;
    }
    /**
     * New content details, only query statements required by the transaction are generated,
     * and details of the created content are returned
     * @param  {Partial<Content>} params
     * @returns Content
     */
    create(params, options) {
        const contentDetail = {
            id: params.id || (0, tools_1.generationId)(constant_1.PRE.CONTENT),
            title: lodash_1.default.trim(params === null || params === void 0 ? void 0 : params.title) || '',
            fileId: params.fileId || '',
            tags: (params === null || params === void 0 ? void 0 : params.tags) || [],
            liveVersionNumber: params.liveVersionNumber || 0,
            creator: (params === null || params === void 0 ? void 0 : params.creator) || options.ctx.userInfo.id,
        };
        options.ctx.transactions.push(Model.content.addDetailQuery(contentDetail));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.CREATE, contentDetail, {
            actionType: options.actionType || [constant_1.LOG.CREATE, constant_1.TYPE.CONTENT].join('_'),
            category: {
                type: constant_1.TYPE.CONTENT,
                contentId: contentDetail.id,
                fileId: params.fileId || '',
            },
        }));
        return contentDetail;
    }
    /**
     * Create content details, if it is not component content, create version information by default
     * @param  {Partial<Content>} params
     * @param  {FileTypes} type
     * @param  {any} content?
     * @returns Content
     */
    addContentDetail(params, options) {
        const contentDetail = this.create(params, { ctx: options.ctx, actionType: options.actionType });
        if ([constant_1.TYPE.COMPONENT, constant_1.TYPE.EDITOR, constant_1.TYPE.LIBRARY].indexOf(options.type) === -1) {
            Service.version.info.create({ contentId: contentDetail.id, content: (options === null || options === void 0 ? void 0 : options.content) || {} }, { ctx: options.ctx, fileId: params.fileId, actionType: options.actionType });
        }
        return contentDetail;
    }
    /**
     * Update content details
     * @param  {UpdateTypeContent} params
     * @returns Promise
     */
    async updateContentDetail(params, options) {
        const contentDetail = await this.getDetailById(params.id);
        if (!contentDetail || contentDetail.deleted) {
            return { code: 1 }; // Invalid content ID
        }
        const fileDetail = await Service.file.info.getDetailById(contentDetail.fileId);
        if (!fileDetail || fileDetail.deleted || fileDetail.type !== params.type) {
            return { code: 2 }; // Check whether the file type is consistent with the specified type
        }
        if (params.title && contentDetail.title !== params.title) {
            const contentExist = await Service.content.check.nameExist(contentDetail.id, {
                fileId: contentDetail.fileId,
                title: params.title,
            });
            if (contentExist) {
                return { code: 3 }; // Duplicate content name
            }
        }
        // Update content information
        options.ctx.transactions.push(Model.content.updateDetailQuery(params.id, lodash_1.default.pick(params, ['title', 'tags'])));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.CONTENT_UPDATE, [contentDetail], {
            actionType: options.actionType || [constant_1.LOG.UPDATE, constant_1.TYPE.CONTENT].join('_'),
            category: {
                type: constant_1.TYPE.CONTENT,
                contentId: contentDetail.id,
                fileId: contentDetail.fileId,
                folderId: fileDetail.folderId,
                applicationId: fileDetail.applicationId,
            },
        }));
        // tag update log
        if (contentDetail.liveVersionNumber > 0 && params.tags !== contentDetail.tags) {
            options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.CONTENT_TAG, [contentDetail], {
                actionType: options.actionType || [constant_1.LOG.CONTENT_TAG, constant_1.TYPE.CONTENT].join('_'),
                category: {
                    type: constant_1.TYPE.CONTENT,
                    contentId: contentDetail.id,
                    fileId: contentDetail.fileId,
                    folderId: fileDetail.folderId,
                },
            }));
        }
        return { code: 0 };
    }
    /**
     * Update the specified data directly
     * @param  {string} id
     * @param  {Partial<Content>} params
     * @returns void
     */
    updateContentItem(id, params, options) {
        options.ctx.transactions.push(Model.content.updateDetailQuery(id, params));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.UPDATE, Object.assign({ id }, params), {
            actionType: options.actionType || [constant_1.LOG.UPDATE, constant_1.TYPE.CONTENT].join('_'),
            category: { type: constant_1.TYPE.CONTENT, contentId: id, fileId: (options === null || options === void 0 ? void 0 : options.fileId) || '' },
        }));
    }
    /**
     * Set the specified content to be deleted
     * @param  {string} contentId
     * @returns Promise
     */
    async setContentDeleteStatus(params, options) {
        // Get content details
        const contentDetail = await this.getDetailById(params.id);
        if (!contentDetail) {
            return { code: 1 }; // Invalid content information
        }
        // If there is a live version, you need to check whether it is referenced by other content
        if (params.status && contentDetail.liveVersionNumber) {
            const relations = await Service.relation.getContentRelationalByIds(contentDetail.fileId, [params.id]);
            if (relations.length > 0) {
                return { code: 2 }; // There is referenced relation information
            }
        }
        const versionList = await Service.version.list.getVersionByContentIds([params.id]);
        // Set the enabled status, or update the status directly if there is no live version
        options.ctx.transactions.push(this.setDeleteStatus(params.id, params.status));
        options.ctx.transactions.push(Service.version.info.batchUpdateDetailQuery({ contentId: params.id }, { deleted: true }));
        // Save logs
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.CONTENT_REMOVE, [contentDetail], {
            actionType: options.actionType || [constant_1.LOG.DELETE, constant_1.TYPE.CONTENT].join('_'),
            category: { type: constant_1.TYPE.CONTENT, contentId: params.id, fileId: contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.fileId },
        }), ...Service.log.addLogItem(constant_1.LOG.VERSION_REMOVE, versionList, {
            actionType: options.actionType || [constant_1.LOG.DELETE, constant_1.TYPE.VERSION].join('_'),
            category: { type: constant_1.TYPE.VERSION, contentId: params.id, fileId: contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.fileId },
        }));
        return { code: 0 };
    }
    /**
     * Set the delete status of the specified content in batches,
     * @param  {Content[]} contentList
     * @returns void
     */
    batchSetContentDeleteStatus(contentList, options) {
        const status = !(options.status === false);
        options.ctx.transactions.push(this.setDeleteStatus(lodash_1.default.map(contentList, 'id'), status));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.CONTENT_REMOVE, contentList, {
            actionType: options.actionType || [constant_1.LOG.DELETE, constant_1.TYPE.CONTENT].join('_'),
            category: { type: constant_1.TYPE.CONTENT },
        }));
    }
    /**
     * Get the resource type from all the parents of content, and get the corresponding application resource details
     * @param  {AppResource[]} appResource
     * @param  {Record<string} contentParentObject
     * @param  {} FolderFileContent[]>
     * @returns Record
     */
    getContentResourceTypeInfo(appResource, contentParentObject) {
        const appResourceObject = lodash_1.default.keyBy(appResource, 'id');
        let contentResource = {};
        for (const contentId in contentParentObject) {
            for (const folder of contentParentObject[contentId]) {
                folder.tags &&
                    folder.tags.forEach((tag) => {
                        if (tag.resourceId) {
                            contentResource[contentId] = appResourceObject[tag.resourceId] || {};
                        }
                    });
                if (contentResource[contentId]) {
                    break;
                }
            }
        }
        return contentResource;
    }
    /**
     * Copy content from specified content information
     * At the same time copy the version information from the specified content version information
     * @param  {Content} sourceContentInfo
     * @param  {DSL} sourceContentVersion
     * @param  {{relations:Record<string} options
     * @param  {Record<string} string>;tempRelations
     * @param  {} string>}
     * @returns Record
     */
    copyContent(sourceContentInfo, sourceContentVersion, options) {
        var _a, _b, _c, _d;
        // Create new content page information
        const contentId = ((_a = options.relations[sourceContentInfo.id]) === null || _a === void 0 ? void 0 : _a.newId) ||
            ((_b = options.tempRelations[sourceContentInfo.id]) === null || _b === void 0 ? void 0 : _b.newId) ||
            (0, tools_1.generationId)(constant_1.PRE.CONTENT);
        options.relations[sourceContentInfo.id] = {
            newId: contentId,
            oldName: sourceContentInfo.title,
            newName: ((_c = options.tempRelations[sourceContentInfo.id]) === null || _c === void 0 ? void 0 : _c.title) || [sourceContentInfo.title, (0, tools_1.randStr)(4)].join('_'),
        };
        // extendId
        const extendTag = Service.content.tag.getTagsByKeys(sourceContentInfo.tags, ['extendId']);
        if (extendTag.extendId) {
            if (!options.relations[extendTag.extendId]) {
                options.relations[extendTag.extendId] = { newId: (0, tools_1.generationId)(constant_1.PRE.CONTENT) };
            }
            sourceContentInfo.tags = sourceContentInfo.tags.filter((tag) => {
                return !tag.extendId;
            });
            sourceContentInfo.tags.push({ extendId: (_d = options.relations[extendTag.extendId]) === null || _d === void 0 ? void 0 : _d.newId });
        }
        Service.content.info.create({
            id: contentId,
            title: options.relations[sourceContentInfo.id].newName,
            fileId: options.relations[sourceContentInfo.fileId].newId || '',
            tags: (sourceContentInfo.tags || []).concat({ copyFrom: sourceContentVersion.id }),
            liveVersionNumber: options.setLive ? 1 : 0, // default set the first version to live while copy from store
        }, { ctx: options.ctx });
        // Create new content version information
        const relationsAndIdMaps = Service.version.info.copyContentVersion(sourceContentVersion, contentId, Object.assign({ create: true }, options));
        return { relations: relationsAndIdMaps.relations, idMaps: relationsAndIdMaps.idMaps };
    }
    /**
     * get content extension from detail,eg extendId, mockId
     * @param contentDetail
     * @returns
     */
    getContentExtension(contentDetail, extensionName = ['extendId']) {
        return Service.content.tag.getTagsByKeys((contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.tags) || [], extensionName);
    }
}
exports.ContentInfoService = ContentInfoService;
