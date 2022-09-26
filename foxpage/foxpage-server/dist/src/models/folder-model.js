"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderModel = void 0;
const folder_1 = __importDefault(require("./schema/folder"));
const base_model_1 = require("./base-model");
/**
 * Folder repository related classes
 *
 * @export
 * @class FolderModel
 * @extends {BaseModel<Folder>}
 */
class FolderModel extends base_model_1.BaseModel {
    constructor() {
        super(folder_1.default);
    }
    /**
     * Single instance
     * @returns FolderModel
     */
    static getInstance() {
        this._instance || (this._instance = new FolderModel());
        return this._instance;
    }
    /**
     * Get all folders under the specified folder
     * @param  {any} params
     * @returns Promise
     */
    async getFolderListByParentIds(params) {
        const { page = 1, size = 10, parentFolderIds = [] } = params;
        const filter = {
            parentFolderId: { $in: parentFolderIds },
            deleted: false,
        };
        if (params.userIds && params.userIds.length > 0) {
            filter.creator = { $in: params.userIds };
        }
        if (params.search) {
            filter.name = { $regex: new RegExp(params.search, 'i') };
        }
        return this.model
            .find(filter, '-_id -tags._id')
            .sort(params.sort || { _id: -1 })
            .skip((page - 1) * size)
            .limit(size)
            .lean();
    }
    /**
     * Get the number of folders under the specified folder
     * @param  {any} params
     * @returns Promise
     */
    async getFolderCountByParentIds(params) {
        const { parentFolderIds = [] } = params;
        const filter = {
            parentFolderId: { $in: parentFolderIds },
            deleted: false,
        };
        if (params.userIds && params.userIds.length > 0) {
            filter.creator = { $in: params.userIds };
        }
        if (params.search) {
            filter.name = { $regex: new RegExp(params.search, 'i') };
        }
        return this.model.countDocuments(filter);
    }
    /**
     * Search the data of each page of the folder
     * @param  {FolderPageSearch} params
     * @returns {Folder[]} Promise
     */
    async getPageList(params) {
        const from = params.from || 0;
        const to = params.to || 0;
        let searchParams = {
            applicationId: params.applicationId,
            deleted: false,
        };
        if (params.search) {
            searchParams['$or'] = [{ name: { $regex: new RegExp(params.search, 'i') } }, { id: params.search }];
        }
        searchParams['parentFolderId'] = params.parentFolderId || '';
        return this.model
            .find(searchParams, '-_id -tags._id')
            .sort({ createTime: 1 })
            .skip(from)
            .limit(to - from)
            .lean();
    }
    /**
     * Get the total number of folders
     * @param  {FolderPageSearch} params
     * @returns {number} Promise
     */
    async getCount(params) {
        let searchParams = {
            applicationId: params.applicationId,
            deleted: false,
        };
        if (params.search) {
            searchParams['$or'] = [{ name: { $regex: new RegExp(params.search, 'i') } }, { id: params.search }];
        }
        searchParams['parentFolderId'] = params.parentFolderId || '';
        return this.model.countDocuments(searchParams);
    }
    /**
     * Get user special type folder list
     * @param  {WorkspaceFolderSearch} params
     * @returns Promise
     */
    async getWorkspaceFolderList(params) {
        const page = params.page || 1;
        const size = params.size || 10;
        let searchParams = {
            creator: params.creator,
            'tags.type': params.types.length === 1 ? params.types[0] : { $in: params.types },
            deleted: params.deleted || false,
        };
        if (params.applicationIds && params.applicationIds.length > 0) {
            searchParams.applicationId = { $in: params.applicationIds };
        }
        if (params.search) {
            searchParams.name = { $regex: new RegExp(params.search, 'i') };
        }
        return this.model
            .find(searchParams, '-_id -tags._id')
            .sort(params.sort || { _id: -1 })
            .skip((page - 1) * size)
            .limit(size)
            .lean();
    }
    /**
     * Get the count of user special type folder list
     * @param  {WorkspaceFolderSearch} params
     * @returns Promise
     */
    async getWorkspaceFolderCount(params) {
        let searchParams = {
            creator: params.creator,
            'tags.type': params.types.length === 1 ? params.types[0] : { $in: params.types },
            deleted: params.deleted || false,
        };
        if (params.search) {
            searchParams.name = { $regex: new RegExp(params.search, 'i') };
        }
        if (params.applicationIds && params.applicationIds.length > 0) {
            searchParams.applicationId = { $in: params.applicationIds };
        }
        return this.model.countDocuments(searchParams);
    }
}
exports.FolderModel = FolderModel;
