import { Content, ContentVersion } from '@foxpage/foxpage-server-types';
import { ContentLiveVersion, ContentVersionInfo, ContentVersionNumber, ContentVersionString, NameVersion, VersionSearch } from '../../types/content-types';
import { BaseService } from '../base-service';
export declare class VersionListService extends BaseService<ContentVersion> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns VersionListService
     */
    static getInstance(): VersionListService;
    /**
     * Get the details of the version of the corresponding component through contentList and nameVersion,
     * @param  {Content[]} contentList
     * @param  {NameVersion[]} nameVersions
     * @returns Promise
     */
    getContentVersionListByNameVersion(contentList: Content[], nameVersions: NameVersion[]): Promise<ContentVersion[]>;
    /**
     * Get a list of page versions
     * @param  {VersionSearch} params
     * @returns {ContentVersionInfo[]} Promise
     */
    getVersionList(params: VersionSearch): Promise<ContentVersionInfo[]>;
    /**
     * Get all version information through content ids
     * @param  {string[]} contentIds
     * @returns Promise
     */
    getVersionByContentIds(contentIds: string[]): Promise<ContentVersion[]>;
    /**
     * Get the live version details through contentIds, and return the object with contentId as the key name
     * @param  {string[]} contentIds
     * @returns Promise
     */
    getLiveVersionByContentIds(contentIds: string[]): Promise<Record<string, ContentVersion>>;
    /**
     * Get the relation dependency information of a single item by list
     * @param  {ContentVersion[]} versionList
     * @param  {boolean=true} isLiveVersion
     */
    getVersionListRelations(versionList: ContentVersion[], isLiveVersion?: boolean): Promise<Record<string, any[]>>;
    /**
     * Get the latest version details of the specified content
     * Return {contentId: versionDetail}
     * @param  {string[]} contentIds
     * @returns Promise
     */
    getContentMaxVersionDetail(contentIds: string[], status?: string): Promise<Record<string, ContentVersion>>;
    /**
     * Get the latest version details under the file through the file id,
     * mainly using data with only one content in a file, such as variables, conditions, functions, etc.
     * @param  {string[]} fileIds
     * @returns Promise
     */
    getMaxVersionByFileIds(fileIds: string[]): Promise<Record<string, ContentVersion>>;
    /**
     * Obtain version information by specifying content ID and versionNumber
     * @param  {ContentLiveVersion[]} contentLiveInfo
     * @returns {ContentVersion[]} Promise
     */
    getContentInfoByIdAndNumber(contentLiveInfo: ContentLiveVersion[]): Promise<ContentVersion[]>;
    /**
     * Get version details in batches through contentId and version
     * @param  {ContentVersionNumber[]} idAndVersion
     * @returns {ContentVersion[]} Promise
     */
    getContentByIdAndVersionNumber(idAndVersion: ContentVersionNumber[]): Promise<ContentVersion[]>;
    /**
     * Get version details through contentId and version
     * @param  {ContentVersionString[]} idAndVersions
     * @returns {ContentVersion[]} Promise
     */
    getContentInfoByIdAndVersion(idAndVersions: ContentVersionString[]): Promise<ContentVersion[]>;
    /**
     * Get version details through contentId and version string
     * @param  {ContentVersionString[]} idAndVersionString
     * @returns {ContentVersion[]} Promise
     */
    getContentByIdAndVersionString(idAndVersionString: ContentVersionString[]): Promise<ContentVersion[]>;
    /**
     * Get live version or build version through contentIds
     * 1, if contentId has a build version, get the build version
     * 2, if contentId does not have a build version, get the live version
     * 3, otherwise take the largest version corresponding to contentId
     * Return format {'contentId','versionNumber'}[]
     * @param  {string[]} contentIds
     * @returns Promise
     */
    getContentLiveOrBuildVersion(contentIds: string[]): Promise<ContentVersionNumber[]>;
    /**
     * get refer content version detail
     * response {fileId: contentVersion}
     * @param contentList
     * @returns
     */
    getReferVersionList(fileMaps: Record<string, string>): Promise<Record<string, ContentVersion>>;
}
