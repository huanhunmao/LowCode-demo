import { ContentStatus, ContentVersion } from '@foxpage/foxpage-server-types';
import { AppTypeContent, PageContentRelationInfos, VersionPublish } from '../../types/content-types';
import { DBQuery, FoxCtx } from '../../types/index-types';
import { BaseService } from '../base-service';
export declare class VersionLiveService extends BaseService<ContentVersion> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns VersionLiveService
     */
    static getInstance(): VersionLiveService;
    /**
     * Get the live version details of the specified type of content under the specified application
     * @param  {AppTypeContent} params
     * @returns {ContentVersion[]} Promise
     */
    getContentLiveDetails(params: AppTypeContent): Promise<ContentVersion[]>;
    /**
     * Set the release status of the version, which can only be set from the base version to other versions
     * Only set status to release, not set current data to live
     * @param  {VersionPublish} params
     * @param  {boolean} liveRelation, Mark whether to publish and set the relation associated with the version of live
     * @returns Promise
     */
    setVersionPublishStatus(params: VersionPublish, options: {
        ctx: FoxCtx;
        liveRelation?: boolean;
        actionType?: string;
    }): Promise<Record<string, any>>;
    /**
     * Batch set the specified version to the specified state
     * @param  {string[]} versionIds
     * @returns void
     */
    bulkSetVersionStatus(versionIds: string[], status: ContentStatus, options?: {
        ctx: FoxCtx;
    }): Partial<DBQuery>;
    /**
     * Get the version details of the specified contentIds and the corresponding relation details
     * @param  {string} applicationId
     * @param  {string[]} contentIds
     * @param  {boolean=false} isBuild Whether to take the live version
     * @returns string
     */
    getContentAndRelationVersion(contentIds: string[], isBuild?: boolean): Promise<PageContentRelationInfos[]>;
}
