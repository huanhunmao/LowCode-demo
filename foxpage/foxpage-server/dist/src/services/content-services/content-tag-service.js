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
exports.ContentTagService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const foxpage_shared_1 = require("@foxpage/foxpage-shared");
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class ContentTagService extends base_service_1.BaseService {
    constructor() {
        super(Model.content);
    }
    /**
     * Single instance
     * @returns ContentTagService
     */
    static getInstance() {
        this._instance || (this._instance = new ContentTagService());
        return this._instance;
    }
    /**
     * Get the content information of the specified tags under the application
     * @param  {AppTag} params
     * @returns {SDKTagContentData} Promise
     */
    async getAppContentByTags(params) {
        let fileDetail = {};
        if (params.fileId) {
            fileDetail = await Service.file.info.getDetailById(params.fileId);
        }
        else {
            fileDetail = await Service.file.info.getFileDetailByPathname(params.applicationId, params.pathname);
        }
        if (lodash_1.default.isEmpty(fileDetail)) {
            return [];
        }
        const contentLiveInfo = await this.getAppContentLiveInfoByTags(fileDetail.id, params.tags);
        // Get live details
        let contentVersionList = [];
        if (!lodash_1.default.isEmpty(contentLiveInfo)) {
            contentVersionList = await Service.version.list.getContentInfoByIdAndNumber([contentLiveInfo]);
        }
        const contentLiveInfoObject = lodash_1.default.keyBy([contentLiveInfo], 'id');
        // Put tags into contentVersionList
        return contentVersionList.map((content) => {
            var _a;
            return Object.assign({ id: content.contentId, content: content.content, version: content.version }, { tags: ((_a = contentLiveInfoObject[content.contentId]) === null || _a === void 0 ? void 0 : _a.tags) || [] });
        });
    }
    /**
     * Get the content that matches the specified tags
     * 1, match pathname tag in file (tag in file only matches pathname)
     * 2, Get all the content in the file in 1 (tag in content can match locale and query)
     * 3, the content tags obtained from 2 match locale and query
     * @param  {AppTag} params
     * @returns {ContentTagLiveVersion[]} Promise
     */
    async getAppContentLiveInfoByTags(fileId, tags) {
        // Get all content under file
        let contentList = await Service.content.file.getContentByFileIds([fileId]);
        // Can only match the published content
        contentList = contentList.filter((content) => content.liveVersionNumber > 0);
        // Match tags in content, only match the first matching content
        const matchTag = foxpage_shared_1.tag.matchContent(contentList, tags);
        return matchTag || {};
    }
    /**
     * Get tag value
     * response { id: tagValue }
     * @param tagsContent
     * @param tagName
     * @returns
     */
    getContentCopyTags(tagsContent, tagName) {
        let tagMap = {};
        tagsContent.forEach(item => {
            if (item.tags && item.tags.length > 0) {
                item.tags.forEach(cell => {
                    if (cell[tagName]) {
                        tagMap[item.id] = cell[tagName];
                    }
                });
            }
        });
        return tagMap;
    }
    /**
     * Get tags key values
     * @param tags
     * @param keys
     * @returns
     */
    getTagsByKeys(tags, keys) {
        let extendInfo = {};
        (tags || []).forEach(tag => {
            extendInfo = lodash_1.default.merge(extendInfo, lodash_1.default.pick(tag, keys));
        });
        return extendInfo;
    }
    /**
     * update content tag, if exist, update it, or add tag
     * @param contentId
     * @param tag
     * @param options
     */
    async updateExtensionTag(contentId, tags, options) {
        const contentDetail = await this.getDetailById(contentId);
        const contentTags = contentDetail.tags || [];
        const tagKeys = lodash_1.default.keys(tags);
        contentTags.forEach(tag => {
            tagKeys.forEach(key => {
                if (tag[key] !== undefined) {
                    tag[key] = tags[key];
                    tags = lodash_1.default.omit(tags, [key]);
                }
            });
        });
        if (!lodash_1.default.isEmpty(tags)) {
            contentTags.push(tags);
        }
        options.ctx.transactions.push(this.updateDetailQuery(contentId, { tags: contentTags }));
    }
}
exports.ContentTagService = ContentTagService;
