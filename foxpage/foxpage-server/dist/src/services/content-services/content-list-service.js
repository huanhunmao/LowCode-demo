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
exports.ContentListService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const p_limit_1 = __importDefault(require("p-limit"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class ContentListService extends base_service_1.BaseService {
    constructor() {
        super(Model.content);
    }
    /**
     * Single instance
     * @returns ContentListService
     */
    static getInstance() {
        this._instance || (this._instance = new ContentListService());
        return this._instance;
    }
    /**
     * Get all content information of the specified type under the specified application.
     * If the file is component file and it reference from store,
     * then need replace file id to get content info
     * @param  {AppFileType} params
     * @returns {Content} Promise
     */
    async getAppContentList(params) {
        let contentObject = {};
        // Get all files id of the specified type under the App
        const fileList = await Service.file.list.getAppTypeFileList(params);
        if (fileList.length > 0) {
            // Check if file is a reference
            let referenceFileObject = {};
            fileList.forEach((file) => {
                var _a;
                (_a = file.tags) === null || _a === void 0 ? void 0 : _a.forEach((tag) => {
                    if (tag.type === constant_1.TAG.DELIVERY_REFERENCE) {
                        referenceFileObject[file.id] = tag.reference.id;
                    }
                });
            });
            // Concurrently 1 time each time, 200 fileIds are requested each time
            const referenceIds = lodash_1.default.values(referenceFileObject);
            const fileIds = lodash_1.default.concat(lodash_1.default.pullAll(lodash_1.default.map(fileList, 'id'), lodash_1.default.keys(referenceFileObject)), referenceIds);
            let promises = [];
            const limit = (0, p_limit_1.default)(1);
            lodash_1.default.chunk(fileIds, 200).forEach((fileIds) => {
                promises.push(limit(() => Model.content.getDetailByFileIds(fileIds)));
            });
            contentObject = lodash_1.default.keyBy(lodash_1.default.flatten(await Promise.all(promises)), 'id');
            // replace referenced file id, use fileId as key is to avoid has multi same reference content id
            if (referenceIds.length > 0) {
                let referenceContentObject = lodash_1.default.pick(contentObject, referenceIds);
                contentObject = lodash_1.default.omit(contentObject, referenceIds);
                for (const fileId in referenceFileObject) {
                    if (referenceContentObject[referenceFileObject[fileId]]) {
                        contentObject[fileId] = Object.assign({}, referenceContentObject[referenceFileObject[fileId]], { fileId });
                    }
                }
            }
        }
        return lodash_1.default.toArray(contentObject);
    }
    /**
     * Get the corresponding content and version details through fileIds
     * @param  {string[]} fileIds
     * @returns ContentVersion
     */
    async getContentAndVersionListByFileIds(fileIds) {
        let versionList = [];
        const contentList = await Service.content.file.getContentByFileIds(fileIds);
        if (contentList.length > 0) {
            versionList = await Service.version.list.getDetailByIds(lodash_1.default.map(contentList, 'id'));
        }
        return { contentList: contentList, versionList };
    }
    /**
     * Get file content list
     * @param fileIds
     * @returns
     */
    async getFileContentList(fileIds, options) {
        if (fileIds.length === 0) {
            return {};
        }
        let fileList = (options === null || options === void 0 ? void 0 : options.fileList) || [];
        if (!fileList || fileList.length === 0) {
            fileList = await Service.file.list.getDetailByIds(fileIds);
        }
        // Get reference file ids
        const referenceFileMap = Service.file.info.filterReferenceFile(fileList);
        const contentList = await Service.content.file.getContentByFileIds(lodash_1.default.concat(fileIds, lodash_1.default.keys(referenceFileMap)));
        let fileContentList = {};
        contentList.forEach(content => {
            const fileId = referenceFileMap[content.fileId] || content.fileId;
            !fileContentList[fileId] && (fileContentList[fileId] = []);
            fileContentList[fileId].push(Object.assign({}, content, { fileId }));
        });
        return fileContentList;
    }
    /**
     * Get content details through fileId,
     * only support the situation that there is only one content under the fileId
     * Return content details with fileId as the key name
     * @param  {string[]} fileIds
     * @returns Promise
     */
    async getContentObjectByFileIds(fileIds) {
        if (fileIds.length === 0) {
            return {};
        }
        const contentList = await Service.content.file.getContentByFileIds(fileIds);
        return lodash_1.default.keyBy(contentList, 'fileId');
    }
    /**
     * Get content live number information through contentIds
     * @param  {string[]} contentIds
     * @returns {ContentLiveVersion[]} Promise
     */
    async getContentLiveInfoByIds(contentIds) {
        if (contentIds.length === 0) {
            return [];
        }
        return Model.content.getContentLiveInfoByIds(contentIds);
    }
    /**
     * Get all the superior information of the specified content, including files and folders
     * @param  {string[]} contentIds
     * @returns Promise
     */
    async getContentAllParents(contentIds) {
        const contentList = await this.getDetailByIds(contentIds);
        const fileList = await Service.file.list.getDetailByIds(lodash_1.default.uniq(lodash_1.default.map(contentList, 'fileId')));
        const folderIds = lodash_1.default.map(fileList, 'folderId');
        const fileObject = lodash_1.default.keyBy(fileList, 'id');
        const allParentFolderList = await Service.folder.list.getAllParentsRecursive(folderIds);
        let contentParents = {};
        for (const content of contentList) {
            let data = [content];
            if (fileObject[content.fileId]) {
                data.unshift(fileObject[content.fileId]);
            }
            if (allParentFolderList[fileObject[content.fileId].folderId]) {
                data.unshift(...allParentFolderList[fileObject[content.fileId].folderId]);
            }
            contentParents[content.id] = data;
        }
        return contentParents;
    }
    /**
     * Get content id, and get the content reference file id
     * then, set the content info's fileId to reference file id
     * @param contentList
     * @returns
     */
    async setContentReferenceFileId(applicationId, contentList) {
        const fileIds = lodash_1.default.map(contentList, 'fileId');
        const fileContentObject = lodash_1.default.keyBy(contentList, 'fileId');
        if (fileIds.length > 0) {
            const fileList = await Service.file.list.find({
                applicationId,
                deleted: false,
                'tags.reference.id': { $in: fileIds }
            });
            (fileList || []).forEach(file => {
                var _a;
                const referenceFileTag = lodash_1.default.find(file.tags, { type: constant_1.TAG.DELIVERY_REFERENCE });
                if (((_a = referenceFileTag === null || referenceFileTag === void 0 ? void 0 : referenceFileTag.reference) === null || _a === void 0 ? void 0 : _a.id) && fileContentObject[referenceFileTag.reference.id]) {
                    fileContentObject[referenceFileTag.reference.id].fileId = file.id;
                }
            });
        }
        return lodash_1.default.toArray(fileContentObject);
    }
}
exports.ContentListService = ContentListService;
