import { Content, ContentVersion } from '@foxpage/foxpage-server-types';
import { ContentVersionNumber, NameVersion } from '../../types/content-types';
import { BaseService } from '../base-service';
export declare class VersionNumberService extends BaseService<ContentVersion> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns VersionNumberService
     */
    static getInstance(): VersionNumberService;
    /**
     * Generate versionNumber 10 000 0002 by version (1.0.2)
     * Large version 0-99, medium version 0-999, small version 0-9999
     * The version format is fixed x.x.x, without suffixes such as alpha and beta
     * @param  {string} version
     * @returns number
     */
    createNumberFromVersion(version: string): number;
    /**
     * Convert version number to version
     * @param  {number} versionNumber
     * @returns string
     */
    getVersionFromNumber(versionNumber: number): string;
    /**
     * Returns a newer version number than the specified version
     * @param  {string} version
     * @returns string
     */
    getNewVersion(version?: string): string;
    /**
     * Get the latest version number of the specified page
     * @param  {string} contentId
     * @returns {number} Promise
     */
    getLatestVersionNumber(contentId: string): Promise<number>;
    /**
     * Aggregate to get the latest valid version of content
     * @param  {string[]} contentIds
     * @returns Promise
     */
    getContentMaxVersionByIds(contentIds: string[]): Promise<{
        _id: string;
        versionNumber: number;
    }[]>;
    /**
     * Get version details by version or version number
     * @param  {NameVersion[]} contentNameInfos
     * @param  {Content[]} contentInfos
     * @returns Promise
     */
    getContentVersionByNumberOrVersion(contentNameInfos: NameVersion[], contentInfos: Content[]): Promise<ContentVersion[]>;
    /**
     * Get version details by content ID and version number
     * @param  {ContentVersionNumber} params
     * @returns {ContentVersion} Promise
     */
    getContentByNumber(params: ContentVersionNumber): Promise<ContentVersion>;
    /**
     * Get version information through contentId and versionNumber,
     * if versionNumber is 0 or empty, then the latest version is taken.
     * @param  {ContentVersionNumber[]} idAndVersion
     * @returns Promise
     */
    getContentByIdNumber(idAndVersion: ContentVersionNumber[]): Promise<ContentVersion[]>;
}
