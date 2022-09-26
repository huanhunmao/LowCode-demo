import { Content } from '@foxpage/foxpage-server-types';
import { ContentLiveVersion, ContentSearch, ContentTagLiveVersion, FileTagContent } from '../types/content-types';
import { BaseModel } from './base-model';
/**
 *Page content repository related classes
 */
export declare class ContentModel extends BaseModel<Content> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentModel
     */
    static getInstance(): ContentModel;
    /**
     * Get the file list under the page
     * @param  {ContentSearch} params
     * @returns {Content[]]} Promise
     */
    getPageList(params: ContentSearch): Promise<Content[]>;
    /**
     * Get the live version of the specified content
     * @param  {string[]} contentIds
     * @returns {ContentLiveVersion[]} Promise
     */
    getLiveNumberByIds(contentIds: string[]): Promise<ContentLiveVersion[]>;
    /**
     * Get the live content information of the specified file
     * @param  {string[]} fileIds
     * @returns {ContentLiveVersion} Promise
     */
    getAppFilesContent(fileIds: string[]): Promise<ContentLiveVersion[]>;
    /**
     * Get the live number information of the specified published content
     * @param  {string[]} contentIds
     * @returns {ContentLiveVersion[]} Promise
     */
    getContentLiveInfoByIds(contentIds: string[]): Promise<ContentLiveVersion[]>;
    /**
     * Get published content Id information through fileIds, tags.
     * All the excluded fields are processed here, because tags need to be returned,
     *  but _id under tags is not returned. If -tags._id tags are used.
     * Path collision error will be reported.
     * @param  {FileTagContent} params
     * @returns {ContentTagLiveVersion[]} Promise
     */
    getContentLiveInfoByFileIds(params: FileTagContent): Promise<ContentTagLiveVersion[]>;
    /**
     * Get content information through fileId
     * @param  {string[]} fileIds
     * @returns {Content[]} Promise
     */
    getDetailByFileIds(fileIds: string[]): Promise<Content[]>;
}
