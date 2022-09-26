import { Application, AppResource } from '@foxpage/foxpage-server-types';
import { AddAppSetting, AppInfo, AppOrgInfo, AppSearch, AppWithFolder, UpdateAppSetting } from '../types/app-types';
import { FolderFileContent } from '../types/content-types';
import { FoxCtx, PageList } from '../types/index-types';
import { AppHostInfo } from '../types/validates/app-validate-types';
import { BaseService } from './base-service';
export declare class ApplicationService extends BaseService<Application> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ApplicationService
     */
    static getInstance(): ApplicationService;
    /**
     * New content details, only query statements required by the transaction are generated,
     * and details of the created content are returned
     * @param  {Partial<Content>} params
     * @returns Content
     */
    create(params: Partial<Application>, options: {
        ctx: FoxCtx;
    }): Application;
    /**
     * Get application details including default folders
     * @param  {string} applicationId
     * @returns {AppWithFolder}
     */
    getAppDetailWithFolder(applicationId: string): Promise<AppWithFolder>;
    /**
     * Get the basic paging list information of the specified application,
     * including the basic organization information corresponding to the application
     * @param  {AppSearch} params
     * @returns Promise
     */
    getPageListWithOrgInfo(params: AppSearch): Promise<PageList<AppOrgInfo>>;
    /**
     * Get a list of apps containing paging information
     * @param  {AppSearch} params
     * @returns {AppInfo} Promise
     */
    getPageList(params: AppSearch): Promise<PageList<AppInfo>>;
    /**
     * Get the details of the resource type specified by the application
     * @param  {any} params: {applicationId, resourceId}
     * @returns Promise
     */
    getAppResourceDetail(params: any): Promise<Partial<AppResource>>;
    /**
     * Check the resource field of the app update
     * 1, resource cannot be deleted
     * 2, the resource name cannot be repeated
     * 3, the type of resource cannot be modified
     * @param  {AppResource[]} appResource
     * @param  {AppResource[]} resources
     * @returns string
     */
    checkAppResourceUpdate(appResource: AppResource[], resources: AppResource[]): {
        code: number;
        data: string[];
    };
    /**
     * Get application resource list from special content all parent array
     * @param  {Record<string} contentAllParents
     * @param  {} FolderFileContent[]>
     * @returns Promise
     */
    getAppResourceFromContent(contentAllParents: Record<string, FolderFileContent[]>): Promise<AppResource[]>;
    /**
     * concat app page preview locales url
     * if the host is not {url:'', locales: []} format
     * default to host fields is url
     * @param hostList
     * @param pathname
     * @param slug
     */
    getAppHostLocaleUrl(hostList: AppHostInfo[], pathname: string, slug?: string): Record<string, string>;
    /**
     * filter the special item in app settings
     * @param setting
     * @param type
     * @param typeId
     * @returns
     */
    getAppSettingItem(setting: Record<string, any[]>, type: string, typeIds: string[]): Record<string, any>;
    /**
     * Add app setting item values
     * @param params
     * @returns
     */
    addAppSetting(params: AddAppSetting, options: {
        ctx: FoxCtx;
    }): void;
    /**
     * Update app setting item values
     * @param params
     * @param options
     */
    updateAppSetting(params: UpdateAppSetting, itemDetail: Record<string, any>, options: {
        ctx: FoxCtx;
    }): void;
}
