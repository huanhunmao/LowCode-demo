"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionModel = void 0;
const content_version_1 = __importDefault(require("./schema/content-version"));
const base_model_1 = require("./base-model");
/**
 * Page content version repository related classes
 *
 * @export
 * @class VersionModel
 * @extends {BaseModel<ContentVersion>}
 */
class VersionModel extends base_model_1.BaseModel {
    constructor() {
        super(content_version_1.default);
    }
    /**
     * Single instance
     * @returns VersionModel
     */
    static getInstance() {
        this._instance || (this._instance = new VersionModel());
        return this._instance;
    }
    /**
     * Get the latest version of the specified page
     * @param  {SearchLatestVersion} params
     * @returns {ContentVersion} Promise
     */
    async getLatestVersionInfo(params) {
        let searchParams = { contentId: params.contentId };
        searchParams.deleted = false;
        if (params.deleted !== undefined && params.deleted !== null) {
            searchParams.deleted = params.deleted;
        }
        return this.findOne(searchParams, '', { sort: { versionNumber: -1 } });
    }
    /**
     * Get version details by page ID and version number
     * @param  {string} contentId
     * @param  {number} versionNumber
     * @returns {ContentVersion} Promise
     */
    async getDetailByVersionNumber(contentId, versionNumber) {
        return this.findOne({ contentId, versionNumber, deleted: false });
    }
    /**
     * Set version status
     * @param  {string} id
     * @param  {Partial<ContentStatus>} status
     * @returns Promise
     */
    async setStatus(id, status) {
        return this.updateDetail({ id }, { status, updateTime: new Date() });
    }
    /**
     * Get version details by id and version
     * @param  {ContentVersionNumber[]} idAndVersion
     * @returns {ContentVersion[]} Promise
     */
    async getDetailByIdAndVersions(idAndVersion) {
        if (idAndVersion.length === 0) {
            return [];
        }
        return this.find({ $or: idAndVersion, deleted: false });
    }
    /**
     * Get version details by id and version Number
     * @param  {ContentVersionString[]} idAndVersion
     * @returns {ContentVersion[]} Promise
     */
    async getDetailByIdAndVersionString(idAndVersion) {
        if (idAndVersion.length === 0) {
            return [];
        }
        return this.find({ $or: idAndVersion, deleted: false });
    }
    /**
     * Get the maximum version details of the specified page
     * @param  {string} contentId
     * @returns {ContentVersion} Promise
     */
    async getMaxVersionDetailById(contentId, options = {}) {
        return this.findOne(Object.assign({ contentId, deleted: false }, options), '', {
            sort: { versionNumber: -1 },
        });
    }
}
exports.VersionModel = VersionModel;
