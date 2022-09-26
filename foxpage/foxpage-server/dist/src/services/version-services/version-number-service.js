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
exports.VersionNumberService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class VersionNumberService extends base_service_1.BaseService {
    constructor() {
        super(Model.version);
    }
    /**
     * Single instance
     * @returns VersionNumberService
     */
    static getInstance() {
        this._instance || (this._instance = new VersionNumberService());
        return this._instance;
    }
    /**
     * Generate versionNumber 10 000 0002 by version (1.0.2)
     * Large version 0-99, medium version 0-999, small version 0-9999
     * The version format is fixed x.x.x, without suffixes such as alpha and beta
     * @param  {string} version
     * @returns number
     */
    createNumberFromVersion(version) {
        let versionItems = [0, 0, 0];
        const sourceVersionItems = lodash_1.default.slice(lodash_1.default.map(version.split('.'), Number), 0, 3); // Only take the first 3 versions
        versionItems.splice(0, sourceVersionItems.length, ...sourceVersionItems);
        let versionNumber = 0;
        let isValidVersion = true;
        for (let index = 0; index < 3; index++) {
            if (Math.pow(10, index + 2) <= versionItems[index]) {
                isValidVersion = false;
                break;
            }
            versionNumber += versionItems[index] * (index === 0 ? 10e6 : index === 1 ? 10e3 : 1);
        }
        return isValidVersion ? versionNumber : 0;
    }
    /**
     * Convert version number to version
     * @param  {number} versionNumber
     * @returns string
     */
    getVersionFromNumber(versionNumber) {
        if (versionNumber <= 0) {
            return '';
        }
        let versionItems = [0, 0, 0];
        [10e6, 10e3, 1].forEach((item, index) => {
            const numberItem = Math.floor(versionNumber / item);
            versionNumber = versionNumber % item;
            if (numberItem > 0) {
                versionItems[index] = numberItem;
            }
        });
        return versionItems.join('.');
    }
    /**
     * Returns a newer version number than the specified version
     * @param  {string} version
     * @returns string
     */
    getNewVersion(version = '0.0.0') {
        const versionNumberItems = version ? lodash_1.default.map(version.split('.'), Number) : [0, 0, 0];
        versionNumberItems[2]++;
        return versionNumberItems.join('.');
    }
    /**
     * Get the latest version number of the specified page
     * @param  {string} contentId
     * @returns {number} Promise
     */
    async getLatestVersionNumber(contentId) {
        const versionDetail = await Service.version.info.getContentLatestVersion({ contentId });
        return (versionDetail === null || versionDetail === void 0 ? void 0 : versionDetail.versionNumber) || 0;
    }
    /**
     * Aggregate to get the latest valid version of content
     * @param  {string[]} contentIds
     * @returns Promise
     */
    async getContentMaxVersionByIds(contentIds) {
        if (contentIds.length > 0) {
            return Model.version.aggregate([
                { $match: { contentId: { $in: contentIds }, deleted: false } },
                { $group: { _id: '$contentId', versionNumber: { $max: '$versionNumber' } } },
            ]);
        }
        else {
            return [];
        }
    }
    /**
     * Get version details by version or version number
     * @param  {NameVersion[]} contentNameInfos
     * @param  {Content[]} contentInfos
     * @returns Promise
     */
    async getContentVersionByNumberOrVersion(contentNameInfos, contentInfos) {
        const contentNameObject = lodash_1.default.keyBy(contentInfos, 'title');
        let contentVersionString = [];
        let contentVersionNumber = [];
        contentNameInfos.forEach((content) => {
            if (contentNameObject[content.name] && content.version) {
                contentVersionString.push({
                    contentId: contentNameObject[content.name].id,
                    version: content.version,
                });
            }
            else {
                contentVersionNumber.push(lodash_1.default.pick(contentNameObject[content.name], ['id', 'liveVersionNumber']));
            }
        });
        // Get content containing different versions of the same component
        const versionList = await Promise.all([
            Service.version.list.getContentInfoByIdAndNumber(contentVersionNumber),
            Service.version.list.getContentInfoByIdAndVersion(contentVersionString),
        ]);
        return lodash_1.default.flatten(versionList);
    }
    /**
     * Get version details by content ID and version number
     * @param  {ContentVersionNumber} params
     * @returns {ContentVersion} Promise
     */
    async getContentByNumber(params) {
        return Model.version.getDetailByVersionNumber(params.contentId, params.versionNumber);
    }
    /**
     * Get version information through contentId and versionNumber,
     * if versionNumber is 0 or empty, then the latest version is taken.
     * @param  {ContentVersionNumber[]} idAndVersion
     * @returns Promise
     */
    async getContentByIdNumber(idAndVersion) {
        const nonLiveContent = idAndVersion.filter((content) => !content.versionNumber);
        // Get the latest version of the specified content
        if (nonLiveContent.length > 0) {
            const idVersionNumber = await Service.version.number.getContentMaxVersionByIds(lodash_1.default.map(nonLiveContent, 'contentId'));
            const idNumberObject = lodash_1.default.keyBy(idVersionNumber, '_id');
            idAndVersion.forEach((content) => {
                var _a;
                if (!content.versionNumber) {
                    content.versionNumber = ((_a = idNumberObject[content.contentId]) === null || _a === void 0 ? void 0 : _a.versionNumber) || 0;
                }
            });
        }
        return Model.version.getDetailByIdAndVersions(idAndVersion);
    }
}
exports.VersionNumberService = VersionNumberService;
