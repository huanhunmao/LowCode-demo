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
exports.FolderInfoService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const tools_1 = require("../../utils/tools");
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class FolderInfoService extends base_service_1.BaseService {
    constructor() {
        super(Model.folder);
    }
    /**
     * Single instance
     * @returns ContentInfoService
     */
    static getInstance() {
        this._instance || (this._instance = new FolderInfoService());
        return this._instance;
    }
    /**
     * Add the details of the new folder, return to the new query
     * @param  {Partial<Folder>} params
     * @returns Folder
     */
    create(params, options) {
        const folderDetail = {
            id: params.id || (0, tools_1.generationId)(constant_1.PRE.FOLDER),
            name: lodash_1.default.trim(params.name) || '',
            intro: params.intro || '',
            applicationId: params.applicationId || '',
            folderPath: params.folderPath || (0, tools_1.formatToPath)(params.name),
            parentFolderId: params.parentFolderId || '',
            tags: params.tags || [],
            creator: params.creator || options.ctx.userInfo.id,
            deleted: false,
        };
        options.ctx.transactions.push(Model.folder.addDetailQuery(folderDetail));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.CREATE, folderDetail, {
            actionType: options.actionType || [constant_1.LOG.CREATE, constant_1.TYPE.FOLDER].join('_'),
            category: {
                type: constant_1.TYPE.FOLDER,
                applicationId: params.applicationId || '',
                folderId: folderDetail.id,
            },
        }));
        return folderDetail;
    }
    /**
     * Get the id of the specified default folder of the specified application
     * @param  {AppFolderType} params
     * @returns Promise
     */
    async getAppTypeFolderId(params) {
        const folderIds = await this.getAppDefaultFolderIds({
            applicationIds: [params.applicationId],
            type: params.type,
        });
        return [...folderIds][0] || '';
    }
    /**
     * Get app multi default folder ids
     * @param  {AppsFolderType} params
     * @returns Promise {appId: folderId}
     */
    async getAppsTypeFolderId(params) {
        const folderList = await Model.folder.find({
            applicationId: { $in: params.applicationIds },
            parentFolderId: '',
            'tags.type': params.type,
        });
        const appFolderMap = {};
        lodash_1.default.map(folderList, (folder) => {
            var _a, _b;
            if (((_b = (_a = folder.tags) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) === params.type) {
                appFolderMap[folder.applicationId] = folder.id;
            }
        });
        return appFolderMap;
    }
    /**
     * Get the default folder Ids of the specified type under the specified application
     * @param  {AppDefaultFolderSearch} params
     * @returns {string[]} Promise
     */
    async getAppDefaultFolderIds(params) {
        const folderDetails = await this.getAppsTypeFolderId(params);
        return new Set(lodash_1.default.values(folderDetails));
    }
    /**
     * Get the id of the folder by path
     * @param  {string} parentFolderId
     * @param  {string[]} pathList
     * @returns Promise
     */
    async getFolderIdByPathRecursive(params, options) {
        const folderPath = params.pathList.shift() || '';
        if (!folderPath) {
            return '';
        }
        const createFolder = options.createFolder || false;
        let folderDetail = await this.getDetail({
            parentFolderId: params.parentFolderId,
            folderPath: folderPath,
            deleted: false,
        });
        // Create folder
        if (!folderDetail && createFolder) {
            folderDetail = this.create({
                applicationId: params.applicationId,
                name: folderPath,
                folderPath,
                parentFolderId: params.parentFolderId,
            }, { ctx: options.ctx });
        }
        let folderId = (folderDetail === null || folderDetail === void 0 ? void 0 : folderDetail.id) || '';
        if (folderId && params.pathList.length > 0) {
            folderId = await this.getFolderIdByPathRecursive({
                applicationId: params.applicationId,
                parentFolderId: folderId,
                pathList: params.pathList,
            }, { ctx: options.ctx, createFolder });
        }
        return folderId;
    }
    /**
     * Add folders of specified types under the application, such as items, variables, conditions, etc.
     * @param  {Folder} folderDetail
     * @param  {Record<string, number | Folder>} type
     * @param  {Record<string, any>} distinctParams, filter same data
     * @returns Promise
     */
    async addTypeFolderDetail(folderDetail, options) {
        // Get the folder Id of the specified type under the application
        const typeDetail = await Model.folder.findOne({
            applicationId: folderDetail.applicationId,
            parentFolderId: '',
            'tags.type': options.type,
            deleted: false,
        });
        if (!typeDetail) {
            return { code: 1 };
        }
        // Check if the folder is duplicate
        (!options.distinctParams || lodash_1.default.isEmpty(options.distinctParams)) &&
            (options.distinctParams = { name: folderDetail.name });
        const existFolder = await Model.folder.findOne(Object.assign({
            applicationId: folderDetail.applicationId,
            parentFolderId: typeDetail.id,
            deleted: false,
        }, options.distinctParams));
        if (existFolder) {
            return { code: 2, data: existFolder };
        }
        // Create folder
        folderDetail.parentFolderId = typeDetail.id;
        const newFolderDetail = this.create(folderDetail, {
            ctx: options.ctx,
            actionType: options.actionType,
        });
        return { code: 0, data: newFolderDetail };
    }
    /**
     * Update the file details of the specified type under the application
     * @param  {AppTypeFolderUpdate} folderDetail
     * @param  {AppFolderTypes} type
     * @returns Promise
     */
    async updateTypeFolderDetail(folderDetail, options) {
        // Get current folder details
        const typeDetail = await this.model.findOne({
            id: folderDetail.id,
            applicationId: folderDetail.applicationId,
        });
        if (!typeDetail) {
            return { code: 2 }; // Invalid folder
        }
        if (folderDetail.name && folderDetail.name !== typeDetail.name) {
            const existDetail = await Model.folder.findOne({
                parentFolderId: typeDetail.parentFolderId,
                applicationId: folderDetail.applicationId,
                name: folderDetail.name,
                deleted: false,
            });
            if (existDetail) {
                return { code: 3 }; // Check if the name is duplicate
            }
        }
        // update folder detail
        const updateDetail = lodash_1.default.omit(folderDetail, ['applicationId', 'id']);
        if (!lodash_1.default.isEmpty(updateDetail)) {
            options.ctx.transactions.push(Model.folder.updateDetailQuery(folderDetail.id, updateDetail));
            options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.UPDATE, folderDetail, {
                actionType: options.actionType || [constant_1.LOG.UPDATE, constant_1.TYPE.FOLDER].join('_'),
                category: {
                    type: constant_1.TYPE.FOLDER,
                    applicationId: folderDetail.applicationId || '',
                    folderId: folderDetail.id,
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
        options.ctx.transactions.push(Model.folder.updateDetailQuery(id, params));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.UPDATE, Object.assign({ id }, params)));
    }
    /**
     * Update the delete status of the folder.
     * When deleting, you need to check whether there is any content being referenced.
     * When you enable it, you don’t need to check
     * @param  {TypeStatus} params
     * @param  {number} checkType, 1: check reference, 2: check children, "Bit and"
     * @returns Promise
     */
    async setFolderDeleteStatus(params, options) {
        const folderDetail = await this.getDetailById(params.id);
        if (!folderDetail) {
            return { code: 1 }; // Invalid file information
        }
        const checkType = options.checkType || 0;
        // TODO Check whether there is information referenced by content under the folder
        if (checkType & 1) {
        }
        // Check if folder has valid child, response warning if exist
        if (checkType & 2) {
            const children = await Promise.all([
                Service.file.list.find({ folderId: params.id, deleted: false }, 'id'),
                this.find({ parentFolderId: params.id, deleted: false }, 'id'),
            ]);
            if (lodash_1.default.flatten(children).length > 0) {
                return { code: 2 };
            }
        }
        // Set the enabled state
        options.ctx.transactions.push(this.setDeleteStatus(params.id, params.status));
        // TODO Save logs
        return { code: 0 };
    }
    /**
     * Set the delete status of specified folders in batches,
     * @param  {Folder[]} folderList
     * @returns void
     */
    batchSetFolderDeleteStatus(folderList, options) {
        const status = !(options.status === false);
        options.ctx.transactions.push(this.setDeleteStatus(lodash_1.default.map(folderList, 'id'), status));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.DELETE, folderList, {
            actionType: [constant_1.LOG.DELETE, options.type || constant_1.TYPE.FOLDER].join('_'),
            category: { type: constant_1.TYPE.FOLDER },
        }));
    }
}
exports.FolderInfoService = FolderInfoService;
