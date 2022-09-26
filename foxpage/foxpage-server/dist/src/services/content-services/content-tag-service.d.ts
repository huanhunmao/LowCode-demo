import { Content, Tag } from '@foxpage/foxpage-server-types';
import { AppTag, ContentTagLiveVersion, TagContentData } from '../../types/content-types';
import { FoxCtx } from '../../types/index-types';
import { BaseService } from '../base-service';
export declare class ContentTagService extends BaseService<Content> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentTagService
     */
    static getInstance(): ContentTagService;
    /**
     * Get the content information of the specified tags under the application
     * @param  {AppTag} params
     * @returns {SDKTagContentData} Promise
     */
    getAppContentByTags(params: AppTag): Promise<TagContentData[]>;
    /**
     * Get the content that matches the specified tags
     * 1, match pathname tag in file (tag in file only matches pathname)
     * 2, Get all the content in the file in 1 (tag in content can match locale and query)
     * 3, the content tags obtained from 2 match locale and query
     * @param  {AppTag} params
     * @returns {ContentTagLiveVersion[]} Promise
     */
    getAppContentLiveInfoByTags(fileId: string, tags: Tag[]): Promise<ContentTagLiveVersion>;
    /**
     * Get tag value
     * response { id: tagValue }
     * @param tagsContent
     * @param tagName
     * @returns
     */
    getContentCopyTags(tagsContent: {
        id: string;
        tags: any[];
    }[], tagName: string): Record<string, string>;
    /**
     * Get tags key values
     * @param tags
     * @param keys
     * @returns
     */
    getTagsByKeys(tags: Record<string, any>[], keys: string[]): Record<string, any>;
    /**
     * update content tag, if exist, update it, or add tag
     * @param contentId
     * @param tag
     * @param options
     */
    updateExtensionTag(contentId: string, tags: Record<string, any>, options: {
        ctx: FoxCtx;
    }): Promise<void>;
}
