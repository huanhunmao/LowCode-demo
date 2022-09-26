import { IndexContent } from '@foxpage/foxpage-server-types';
import { ContentPath } from '../types/component-types';
import { VersionNumber } from '../types/content-types';
import { NewResourceDetail } from '../types/file-types';
import { FoxCtx, IdVersion } from '../types/index-types';
interface ResourceVersionDetail {
    id: string;
    name: string;
    version: string;
}
export declare class ResourceService {
    private static _instance;
    private plugins;
    constructor();
    /**
     * Single instance
     * @returns ResourceService
     */
    static getInstance(): ResourceService;
    getResourceRemoteUrl(type: string, groupConfig: Record<string, string>): Promise<string>;
    /**
     * Get resource list
     * @param  {any} options
     * @returns Promise
     */
    getResourceList(options: any): Promise<IndexContent>;
    /**
     * Get the special resource group latest version from remote
     * @param  {string} groupFolderId
     * @param  {any} options
     * @returns Promise
     */
    getResourceGroupLatestVersion(groupFolderId: string, options?: {
        name?: string;
        packageName?: string;
        proxy?: string;
    }): Promise<NewResourceDetail[]>;
    /**
     * Get the resource group configs, include app config, group config and common resource config
     * @param  {string} groupFolderId
     * @returns Promise
     */
    getGroupConfig(groupFolderId: string): Promise<Record<string, any>>;
    /**
     * Get the special resource group child max version info
     * response {'resourceId': {id,name,version}}
     * @param  {string} groupFolderId
     * @returns Promise
     */
    getGroupResourceMaxVersion(groupFolderId: string): Promise<Record<string, ResourceVersionDetail>>;
    /**
     * Check if remote resource exist in db, include check version [folder level]
     * @param  {NewResourceDetail[]} resourceList
     * @param  {{applicationId:string;id:string}} options
     * @returns Promise
     */
    checkRemoteResourceExist(resourceList: NewResourceDetail[], options: {
        applicationId: string;
        id: string;
    }): Promise<Record<string, any>>;
    /**
     * Bulk save resources, include resources all children details
     * @param  {any[]} resourceList
     * @param  {{ctx:FoxCtx;applicationId:string;folderId:string}} options
     * @returns void
     */
    saveResources(resourceList: NewResourceDetail[], options: {
        ctx: FoxCtx;
        applicationId: string;
        folderId: string;
    }): Record<string, any>;
    /**
     * Create resource children details, include folder, file, content and version infos
     * @param  {any} resourceChildren
     * @param  {{ctx:FoxCtx;applicationId:string;folderId:string}} options
     * @returns response content id and path mapping object, eg
     * {umd:{'style.css':'cont_xxxx'},cjs:{'production.js':'cont_xxxx'}}
     */
    addResourceChildrenRecursive(resourceChildren: any, options: {
        ctx: FoxCtx;
        applicationId: string;
        folderId: string;
    }): Record<string, any>;
    /**
     * Get the special resource folder data, include version folder, file
     * then format to path, eg.
     *  fold_xxx:[
     *   {id:'cont_xxx1', path: 'resourceGroup/bg-banner-container/0.2.0/schema.json'},
     *   {id:'cont_xxx2', path: 'resourceGroup/bg-banner-container/0.2.0/cjs/production.js'}
     *   {id:'cont_xxx3', path: 'resourceGroup/bg-banner-container/0.2.0/umd/style.css'}
     *  ]
     * @param  {string} groupId
     * @param  {{id:string;version:string}[]} idVersions
     * @param  {} Record<string
     * @returns Promise
     */
    getResourceVersionDetail(groupId: string, idVersions: IdVersion[]): Promise<Record<string, ContentPath[]>>;
    formatRecursiveToPath(childrenInfo: any): Record<string, string>;
    /**
     * Get resource content id by path
     * @param parentId
     * @param pathArr
     * @returns
     */
    getContentIdByPath(parentId: string, pathArr?: string[]): Promise<string>;
    /**
     * Get resource max version infos
     * @param resourceIds
     * @returns
     */
    getResourceMaxVersion(resourceIds: string[]): Promise<Record<string, VersionNumber>>;
}
export {};
