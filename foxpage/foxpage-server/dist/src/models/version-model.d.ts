import { ContentStatus, ContentVersion } from '@foxpage/foxpage-server-types';
import { ContentVersionNumber, ContentVersionString, SearchLatestVersion } from '../types/content-types';
import { BaseModel } from './base-model';
/**
 * Page content version repository related classes
 *
 * @export
 * @class VersionModel
 * @extends {BaseModel<ContentVersion>}
 */
export declare class VersionModel extends BaseModel<ContentVersion> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns VersionModel
     */
    static getInstance(): VersionModel;
    /**
     * Get the latest version of the specified page
     * @param  {SearchLatestVersion} params
     * @returns {ContentVersion} Promise
     */
    getLatestVersionInfo(params: SearchLatestVersion): Promise<ContentVersion | null>;
    /**
     * Get version details by page ID and version number
     * @param  {string} contentId
     * @param  {number} versionNumber
     * @returns {ContentVersion} Promise
     */
    getDetailByVersionNumber(contentId: string, versionNumber: number): Promise<ContentVersion>;
    /**
     * Set version status
     * @param  {string} id
     * @param  {Partial<ContentStatus>} status
     * @returns Promise
     */
    setStatus(id: string, status: Partial<ContentStatus>): Promise<any>;
    /**
     * Get version details by id and version
     * @param  {ContentVersionNumber[]} idAndVersion
     * @returns {ContentVersion[]} Promise
     */
    getDetailByIdAndVersions(idAndVersion: ContentVersionNumber[]): Promise<ContentVersion[]>;
    /**
     * Get version details by id and version Number
     * @param  {ContentVersionString[]} idAndVersion
     * @returns {ContentVersion[]} Promise
     */
    getDetailByIdAndVersionString(idAndVersion: ContentVersionString[]): Promise<ContentVersion[]>;
    /**
     * Get the maximum version details of the specified page
     * @param  {string} contentId
     * @returns {ContentVersion} Promise
     */
    getMaxVersionDetailById(contentId: string, options?: Partial<ContentVersion>): Promise<ContentVersion>;
}
