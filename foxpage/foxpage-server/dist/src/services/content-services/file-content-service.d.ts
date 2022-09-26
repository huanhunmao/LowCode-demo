import { Content } from '@foxpage/foxpage-server-types';
import { ContentInfo, ContentSearch, PageContentSearch } from '../../types/content-types';
import { PageData } from '../../types/index-types';
import { BaseService } from '../base-service';
export declare class FileContentService extends BaseService<Content> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentService
     */
    static getInstance(): FileContentService;
    /**
     * Get content details through fileIds
     * @param  {string[]} fileIds
     * @returns {Content[]} Promise
     */
    getContentByFileIds(fileIds: string[]): Promise<Content[]>;
    /**
     * Get a list of contents paged under the specified file, including the total amount of data
     * @param  {PageContentSearch} params
     * @returns ContentInfo
     */
    getFilePageContent(params: PageContentSearch): Promise<PageData<ContentInfo>>;
    /**
     * Get a list of contents under the file, including user name information
     * @param  {ContentSearch} params
     * @returns {ContentInfo[]} Promise
     */
    getFileContentList(params: ContentSearch): Promise<ContentInfo[]>;
}
