"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentModel = void 0;
const content_1 = __importDefault(require("./schema/content"));
const base_model_1 = require("./base-model");
/**
 *Page content repository related classes
 */
class ContentModel extends base_model_1.BaseModel {
    constructor() {
        super(content_1.default);
    }
    /**
     * Single instance
     * @returns ContentModel
     */
    static getInstance() {
        this._instance || (this._instance = new ContentModel());
        return this._instance;
    }
    /**
     * Get the file list under the page
     * @param  {ContentSearch} params
     * @returns {Content[]]} Promise
     */
    async getPageList(params) {
        const page = params.page || 1;
        const size = params.size || 20;
        const from = (page - 1) * size;
        const searchParams = {
            fileId: params.fileId,
            deleted: params.deleted || false,
        };
        if (params.search) {
            searchParams['$or'] = [{ title: { $regex: new RegExp(params.search, 'i') } }, { id: params.search }];
        }
        return this.model
            .find(searchParams, '-_id -tags._id')
            .sort('createTime')
            .skip(from)
            .limit(size)
            .lean();
    }
    /**
     * Get the live version of the specified content
     * @param  {string[]} contentIds
     * @returns {ContentLiveVersion[]} Promise
     */
    async getLiveNumberByIds(contentIds) {
        return this.model.find({ id: { $in: contentIds }, deleted: false }, '-_id id liveVersionNumber').lean();
    }
    /**
     * Get the live content information of the specified file
     * @param  {string[]} fileIds
     * @returns {ContentLiveVersion} Promise
     */
    async getAppFilesContent(fileIds) {
        return this.model
            .find({ fileId: { $in: fileIds }, liveVersionNumber: { $gt: 0 }, deleted: false }, '-_id id liveVersionNumber')
            .lean();
    }
    /**
     * Get the live number information of the specified published content
     * @param  {string[]} contentIds
     * @returns {ContentLiveVersion[]} Promise
     */
    async getContentLiveInfoByIds(contentIds) {
        return this.model
            .find({ id: { $in: contentIds }, liveVersionNumber: { $gt: 0 }, deleted: false }, '-_id id liveVersionNumber')
            .lean();
    }
    /**
     * Get published content Id information through fileIds, tags.
     * All the excluded fields are processed here, because tags need to be returned,
     *  but _id under tags is not returned. If -tags._id tags are used.
     * Path collision error will be reported.
     * @param  {FileTagContent} params
     * @returns {ContentTagLiveVersion[]} Promise
     */
    async getContentLiveInfoByFileIds(params) {
        const tagsFilter = [];
        params.tags.forEach((tag) => {
            tagsFilter.push({ tags: { $elemMatch: tag } });
        });
        return this.model
            .find({ fileId: { $in: params.fileIds }, $and: tagsFilter, liveVersionNumber: { $gt: 0 }, deleted: false }, '-_id -tags._id -deleted -title -fileId -creator -createTime -updateTime')
            .lean();
    }
    /**
     * Get content information through fileId
     * @param  {string[]} fileIds
     * @returns {Content[]} Promise
     */
    async getDetailByFileIds(fileIds) {
        return this.model.find({ fileId: { $in: fileIds }, deleted: false }, '-_id -tags._id').lean();
    }
}
exports.ContentModel = ContentModel;
