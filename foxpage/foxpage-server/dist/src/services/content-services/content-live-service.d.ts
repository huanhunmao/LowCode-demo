import { FoxCtx } from 'src/types/index-types';
import { Content, ContentVersion } from '@foxpage/foxpage-server-types';
import { AppTypeContent, ContentVersionNumber, LiveContentVersion } from '../../types/content-types';
import { BaseService } from '../base-service';
export declare class ContentLiveService extends BaseService<Content> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentLiveService
     */
    static getInstance(): ContentLiveService;
    /**
     * Get the live version information of content through contentIds
     * @param  {string[]} contentIds
     * @returns Promise
     */
    getContentLiveIdByIds(contentIds: string[]): Promise<ContentVersionNumber[]>;
    /**
     * Get the live version details of the specified type of content under the specified application
     * @param  {AppTypeContent} params
     * @returns {ContentVersion[]} Promise
     */
    getContentLiveDetails(params: AppTypeContent): Promise<ContentVersion[]>;
    /**
     * Set the live version of the content, you need to check whether the version is in the release state,
     * and it cannot be set to live if it is not.
     * @param  {LiveContentVersion} params
     * @returns Promise
     */
    setLiveVersion(params: LiveContentVersion, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Promise<Record<string, number | string>>;
    /**
     * Set the live version of the content
     * @param  {string} contentId
     * @param  {number} versionNumber
     * @param  {Content} contentDetail
     * @returns void
     */
    setLiveContent(contentId: string, versionNumber: number, options: {
        ctx: FoxCtx;
        content?: Content;
        actionType?: string;
    }): void;
    /**
     * Set the live version number of multiple content
     * @param  {Record<string} contentIdNumber
     * @param  {} number>
     * @returns void
     */
    bulkSetContentLiveVersion(contentIdNumber: Record<string, number>): void;
}
