"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModel = void 0;
const lodash_1 = __importDefault(require("lodash"));
const file_1 = __importDefault(require("./schema/file"));
const base_model_1 = require("./base-model");
/**
 * File repository related classes
 *
 * @export
 * @class FileModel
 * @extends {BaseModel<File>}
 */
class FileModel extends base_model_1.BaseModel {
    constructor() {
        super(file_1.default);
    }
    /**
     * Single instance
     * @returns FileModel
     */
    static getInstance() {
        this._instance || (this._instance = new FileModel());
        return this._instance;
    }
    /**
     * Get the data of each page of the file
     * @param  {FilePageSearch} params
     * @returns {File[]} Promise
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
        if (params.folderId) {
            searchParams['folderId'] = params.folderId;
        }
        if (params.type) {
            const typeList = lodash_1.default.map(params.type.split(','), lodash_1.default.trim);
            searchParams['type'] = typeList.length > 0 ? { $in: typeList } : typeList[0];
        }
        return this.model
            .find(searchParams, '-_id')
            .sort(params.sort || { _id: -1 })
            .skip(from)
            .limit(to - from)
            .lean();
    }
    /**
     * Get the total number of files under specified conditions
     * @param  {FilePageSearch} params
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
        if (params.folderId) {
            searchParams['folderId'] = params.folderId;
        }
        if (params.type) {
            const typeList = lodash_1.default.map(params.type.split(','), lodash_1.default.trim);
            searchParams['type'] = typeList.length > 0 ? { $in: typeList } : typeList[0];
        }
        return this.model.countDocuments(searchParams);
    }
    /**
     * Get file information by name
     * @param  {FileNameSearch} params
     * @returns {File]} Promise
     */
    async getDetailByNames(params) {
        return this.model
            .find({
            applicationId: params.applicationId,
            type: params.type && lodash_1.default.isArray(params.type) ? { $in: params.type } : params.type,
            name: { $in: params.fileNames },
            deleted: false,
        }, '-_id')
            .lean();
    }
    /**
     * Get all file information of a specified type under a specified application
     * @param  {AppFileType} params
     * @returns Promise
     */
    async getAppFileList(params) {
        let searchParams = {
            applicationId: params.applicationId,
            type: lodash_1.default.isString(params.type) ? params.type : { $in: params.type },
            deleted: false,
        };
        return this.model.find(searchParams, '-_id').lean();
    }
}
exports.FileModel = FileModel;
