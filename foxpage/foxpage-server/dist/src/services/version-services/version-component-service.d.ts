import { AppResource, ContentVersion, Resources } from '@foxpage/foxpage-server-types';
import { BaseService } from '../base-service';
export declare class VersionComponentService extends BaseService<ContentVersion> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns VersionComponentService
     */
    static getInstance(): VersionComponentService;
    /**
     * Obtain the dependency information of the component from the version
     * @param  {any[]} nameVersionContent
     * @returns Record
     */
    getComponentDependsFromVersions(nameVersionContent: any[]): Record<string, string[]>;
    /**
     * Get the associated resource ids from the entry of the component
     * @param  {Record<string} resource
     * @param  {} string>
     * @returns string
     */
    getComponentResourceIds(resource: Partial<Resources>): string[];
    /**
     * Get the resource id associated with the component from the component details,
     * and get the resource information,
     * and then attach it to the location corresponding to the resource id
     * @param  {ContentVersion[]} componentList
     * @returns Promise
     */
    mappingResourceToComponent(componentList: ContentVersion[]): Promise<ContentVersion[]>;
    /**
     * Match the resource details to the component information through contentId,
    * The returned entry needs to distinguish between the returned object, contentId, or only realPath,
    * such as:
    * {
        "host": "https://www.unpkg.com/",
        "downloadHost": "https://www.unpkg.com/",
        "path": "@fox-design/xxxx/dist/umd/production.min.js",
        "contentId": "cont_xxxx"
      }
     * @param  {Record<string} resource
     * @param  {Record<string} resourceObject
     * @returns Record
     */
    assignResourceToComponent(resource: Resources, resourceObject: Record<string, any>, options?: {
        contentResource?: Record<string, AppResource>;
    }): Resources;
}
