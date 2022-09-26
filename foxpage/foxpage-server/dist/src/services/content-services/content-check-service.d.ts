import { Content } from '@foxpage/foxpage-server-types';
import { CircleDepend, ContentCheck } from '../../types/content-types';
import { BaseService } from '../base-service';
export declare class ContentCheckService extends BaseService<Content> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentCheckService
     */
    static getInstance(): ContentCheckService;
    /**
     * Verify whether the content under the specified conditions exists.
     * If the id of the result is consistent with the contentId, it does not exist, otherwise it exists
     * @param  {string} contentId
     * @param  {ContentCheck} params
     * @returns Promise
     */
    nameExist(contentId: string, params: ContentCheck): Promise<boolean>;
    /**
     * Check for circular dependencies
     * @param  {Record<string} sourceObject
     * @param  {} string[]>
     * @param  {Record<string} dependenceObject
     * @param  {} string[]>
     * @returns CircleDepend
     */
    checkCircularDependence(sourceObject: Record<string, string[]>, dependenceObject: Record<string, string[]>): CircleDepend;
}
