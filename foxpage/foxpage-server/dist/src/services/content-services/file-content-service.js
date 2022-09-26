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
exports.FileContentService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class FileContentService extends base_service_1.BaseService {
    constructor() {
        super(Model.content);
    }
    /**
     * Single instance
     * @returns ContentService
     */
    static getInstance() {
        this._instance || (this._instance = new FileContentService());
        return this._instance;
    }
    /**
     * Get content details through fileIds
     * @param  {string[]} fileIds
     * @returns {Content[]} Promise
     */
    async getContentByFileIds(fileIds) {
        return Model.content.getDetailByFileIds(fileIds);
    }
    /**
     * Get a list of contents paged under the specified file, including the total amount of data
     * @param  {PageContentSearch} params
     * @returns ContentInfo
     */
    async getFilePageContent(params) {
        const [contentCount, contentList] = await Promise.all([
            Model.content.getCountDocuments({ fileId: params.fileId, deleted: false }),
            this.getFileContentList(params),
        ]);
        return { count: contentCount, list: contentList };
    }
    /**
     * Get a list of contents under the file, including user name information
     * @param  {ContentSearch} params
     * @returns {ContentInfo[]} Promise
     */
    async getFileContentList(params) {
        Service.content.info.setPageSize(params);
        let ContentUserList = [];
        const contentList = await Model.content.getPageList(params);
        if (contentList && contentList.length > 0) {
            // Get user details
            const userIds = lodash_1.default.map(contentList, 'creator');
            const userObject = await Service.user.getUserBaseObjectByIds(userIds);
            ContentUserList = contentList.map((content) => {
                return Object.assign(lodash_1.default.omit(content, 'creator'), {
                    version: content.liveVersionNumber > 0
                        ? Service.version.number.getVersionFromNumber(content.liveVersionNumber)
                        : '',
                    creator: userObject[content.creator],
                });
            });
        }
        return ContentUserList;
    }
}
exports.FileContentService = FileContentService;
