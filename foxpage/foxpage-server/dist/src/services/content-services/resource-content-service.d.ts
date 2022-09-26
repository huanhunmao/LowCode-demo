import { Content } from '@foxpage/foxpage-server-types';
import { TRecord } from '../../types/index-types';
import { BaseService } from '../base-service';
export declare class ResourceContentService extends BaseService<Content> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ResourceContentService
     */
    static getInstance(): ResourceContentService;
    /**
     * Get resource details through resource contentId,
     * Return content information with contentId as the key
     * @param  {string[]} contentIds
     * @returns Promise
     */
    getResourceContentByIds(contentIds: string[]): Promise<TRecord<TRecord<string>>>;
}
