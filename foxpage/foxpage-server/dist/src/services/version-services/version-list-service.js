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
exports.VersionListService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const p_limit_1 = __importDefault(require("p-limit"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class VersionListService extends base_service_1.BaseService {
    constructor() {
        super(Model.version);
    }
    /**
     * Single instance
     * @returns VersionListService
     */
    static getInstance() {
        this._instance || (this._instance = new VersionListService());
        return this._instance;
    }
    /**
     * Get the details of the version of the corresponding component through contentList and nameVersion,
     * @param  {Content[]} contentList
     * @param  {NameVersion[]} nameVersions
     * @returns Promise
     */
    async getContentVersionListByNameVersion(contentList, nameVersions) {
        const contentNameObject = lodash_1.default.keyBy(contentList, 'title');
        let contentVersion = [];
        let contentLiveInfo = [];
        nameVersions.forEach((content) => {
            if (contentNameObject[content.name]) {
                if (content.version) {
                    contentVersion.push({ contentId: contentNameObject[content.name].id, version: content.version });
                }
                else {
                    contentLiveInfo.push(lodash_1.default.pick(contentNameObject[content.name], ['id', 'liveVersionNumber']));
                }
            }
        });
        // Get content details with version, get live details without version
        const contentVersionList = await Promise.all([
            this.getContentInfoByIdAndVersion(contentVersion),
            this.getContentInfoByIdAndNumber(contentLiveInfo),
        ]);
        // Get the resource information associated with the component,
        // and return the component information containing the resource
        const componentList = await Service.version.component.mappingResourceToComponent(lodash_1.default.flatten(contentVersionList));
        return componentList;
    }
    /**
     * Get a list of page versions
     * @param  {VersionSearch} params
     * @returns {ContentVersionInfo[]} Promise
     */
    async getVersionList(params) {
        const versionList = await Model.version.getList({ search: params, size: 500 });
        const newVersionList = await Service.user.replaceDataUserId(versionList);
        return lodash_1.default.orderBy(newVersionList, ['versionNumber'], ['desc']);
    }
    /**
     * Get all version information through content ids
     * @param  {string[]} contentIds
     * @returns Promise
     */
    async getVersionByContentIds(contentIds) {
        return Model.version.find({ contentId: { $in: contentIds }, deleted: false });
    }
    /**
     * Get the live version details through contentIds, and return the object with contentId as the key name
     * @param  {string[]} contentIds
     * @returns Promise
     */
    async getLiveVersionByContentIds(contentIds) {
        const contentList = await Service.content.list.getDetailByIds(contentIds);
        const liveInfo = lodash_1.default.map(lodash_1.default.filter(contentList, (content) => content.liveVersionNumber > 0), (content) => {
            return lodash_1.default.pick(content, ['id', 'liveVersionNumber']);
        });
        // Get version information
        const liveVersionList = await this.getContentInfoByIdAndNumber(liveInfo);
        return lodash_1.default.keyBy(liveVersionList, 'contentId');
    }
    /**
     * Get the relation dependency information of a single item by list
     * @param  {ContentVersion[]} versionList
     * @param  {boolean=true} isLiveVersion
     */
    async getVersionListRelations(versionList, isLiveVersion = true) {
        let versionIdObject = {};
        versionList.forEach((version) => {
            versionIdObject[version.contentId] = version;
        });
        const versionObjectItem = await Service.version.relation.getVersionRelations(versionIdObject, isLiveVersion);
        let versionObject = {};
        for (const version of versionList) {
            let contentRelationItems = {};
            Object.keys(versionObjectItem).forEach((relationKey) => {
                var _a;
                contentRelationItems[relationKey] = Object.assign({ version: versionObjectItem[relationKey].version || '' }, ((_a = versionObjectItem[relationKey]) === null || _a === void 0 ? void 0 : _a.content) || {});
            });
            versionObject = lodash_1.default.merge(versionObject, { [version.contentId]: lodash_1.default.toArray(contentRelationItems) });
        }
        return versionObject;
    }
    /**
     * Get the latest version details of the specified content
     * Return {contentId: versionDetail}
     * @param  {string[]} contentIds
     * @returns Promise
     */
    async getContentMaxVersionDetail(contentIds, status = '') {
        var _a;
        const versionList = await Model.version.find({ contentId: { $in: contentIds }, deleted: false });
        let contentVersionObject = {};
        for (const version of versionList) {
            if (status && version.status !== status) {
                continue;
            }
            if (!contentVersionObject[version.contentId]) {
                contentVersionObject[version.contentId] = {};
            }
            if ((((_a = contentVersionObject[version.contentId]) === null || _a === void 0 ? void 0 : _a.versionNumber) || 0) < version.versionNumber) {
                contentVersionObject[version.contentId] = version;
            }
        }
        return contentVersionObject;
    }
    /**
     * Get the latest version details under the file through the file id,
     * mainly using data with only one content in a file, such as variables, conditions, functions, etc.
     * @param  {string[]} fileIds
     * @returns Promise
     */
    async getMaxVersionByFileIds(fileIds) {
        if (fileIds.length === 0) {
            return {};
        }
        const contentList = await Service.content.file.getContentByFileIds(fileIds);
        if (contentList.length === 0) {
            return {};
        }
        const versionObject = await this.getContentMaxVersionDetail(lodash_1.default.map(contentList, 'id'));
        let fileVersionObject = {};
        contentList.forEach((content) => {
            fileVersionObject[content.fileId] = versionObject[content.id];
        });
        return fileVersionObject;
    }
    /**
     * Obtain version information by specifying content ID and versionNumber
     * @param  {ContentLiveVersion[]} contentLiveInfo
     * @returns {ContentVersion[]} Promise
     */
    async getContentInfoByIdAndNumber(contentLiveInfo) {
        let contentLiveDetails = [];
        // Get live details
        if (contentLiveInfo.length > 0) {
            const idAndVersions = lodash_1.default.map(contentLiveInfo, (content) => {
                return { contentId: content.id, versionNumber: content.liveVersionNumber };
            });
            // 5 concurrent requests at the same time, 200 pieces of data are requested each time
            const idAndVersionsArr = lodash_1.default.chunk(idAndVersions, 200);
            let contentPromises = [];
            const limit = (0, p_limit_1.default)(5);
            idAndVersionsArr.forEach((item) => {
                contentPromises.push(limit(() => this.getContentByIdAndVersionNumber(item)));
            });
            contentLiveDetails = lodash_1.default.flatten(await Promise.all(contentPromises));
        }
        return contentLiveDetails;
    }
    /**
     * Get version details in batches through contentId and version
     * @param  {ContentVersionNumber[]} idAndVersion
     * @returns {ContentVersion[]} Promise
     */
    async getContentByIdAndVersionNumber(idAndVersion) {
        return Model.version.getDetailByIdAndVersions(idAndVersion);
    }
    /**
     * Get version details through contentId and version
     * @param  {ContentVersionString[]} idAndVersions
     * @returns {ContentVersion[]} Promise
     */
    async getContentInfoByIdAndVersion(idAndVersions) {
        let contentLiveDetails = [];
        // Get live details
        if (idAndVersions.length > 0) {
            // 5 concurrent requests at the same time, 200 pieces of data are requested each time
            const idAndVersionsArr = lodash_1.default.chunk(idAndVersions, 200);
            let contentPromises = [];
            const limit = (0, p_limit_1.default)(5);
            idAndVersionsArr.forEach((item) => {
                contentPromises.push(limit(() => this.getContentByIdAndVersionString(item)));
            });
            contentLiveDetails = lodash_1.default.flatten(await Promise.all(contentPromises));
        }
        return contentLiveDetails;
    }
    /**
     * Get version details through contentId and version string
     * @param  {ContentVersionString[]} idAndVersionString
     * @returns {ContentVersion[]} Promise
     */
    async getContentByIdAndVersionString(idAndVersionString) {
        return Model.version.getDetailByIdAndVersionString(idAndVersionString);
    }
    /**
     * Get live version or build version through contentIds
     * 1, if contentId has a build version, get the build version
     * 2, if contentId does not have a build version, get the live version
     * 3, otherwise take the largest version corresponding to contentId
     * Return format {'contentId','versionNumber'}[]
     * @param  {string[]} contentIds
     * @returns Promise
     */
    async getContentLiveOrBuildVersion(contentIds) {
        // Get the largest version corresponding to content
        const contentVersionList = await this.find({ contentId: { $in: contentIds }, deleted: false }, 'contentId versionNumber status', { sort: { versionNumber: 'desc' } });
        // Get the build version and maximum version
        let baseVersionInfoObject = {};
        let maxVersionInfoObject = {};
        contentVersionList.forEach((version) => {
            if (!baseVersionInfoObject[version.contentId] && version.status === constant_1.VERSION.STATUS_BASE) {
                baseVersionInfoObject[version.contentId] = lodash_1.default.pick(version, ['contentId', 'versionNumber']);
            }
            else if (!maxVersionInfoObject[version.contentId] && version.status !== constant_1.VERSION.STATUS_DISCARD) {
                maxVersionInfoObject[version.contentId] = lodash_1.default.pick(version, ['contentId', 'versionNumber']);
            }
        });
        // Get the contentLive version
        let liveVersionInfoObject = [];
        if (!lodash_1.default.isEmpty(maxVersionInfoObject)) {
            const maxVersionContentIds = lodash_1.default.map(lodash_1.default.toArray(maxVersionInfoObject), 'contentId');
            const contentList = await Service.content.list.getDetailByIds(maxVersionContentIds);
            contentList.forEach((content) => {
                if (!baseVersionInfoObject[content.id]) {
                    liveVersionInfoObject.push({ contentId: content.id, versionNumber: content.liveVersionNumber });
                }
                maxVersionInfoObject = lodash_1.default.omit(maxVersionInfoObject, content.id);
            });
        }
        return lodash_1.default.concat(lodash_1.default.toArray(baseVersionInfoObject), lodash_1.default.toArray(maxVersionInfoObject), liveVersionInfoObject);
    }
    /**
     * get refer content version detail
     * response {fileId: contentVersion}
     * @param contentList
     * @returns
     */
    async getReferVersionList(fileMaps) {
        var _a;
        if (lodash_1.default.isEmpty(fileMaps)) {
            return {};
        }
        const fileContentList = await Service.content.file.getContentByFileIds(lodash_1.default.values(fileMaps));
        const fileContentObject = lodash_1.default.keyBy(fileContentList, 'fileId');
        const contentIds = lodash_1.default.map(fileContentList, 'id');
        const versionObject = await Service.version.list.getLiveVersionByContentIds(contentIds);
        let fileVersions = {};
        for (const fileId in fileMaps) {
            fileVersions[fileId] = versionObject[(_a = fileContentObject[fileMaps[fileId]]) === null || _a === void 0 ? void 0 : _a.id] || {};
        }
        return fileVersions;
    }
}
exports.VersionListService = VersionListService;
