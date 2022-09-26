import { Application } from '@foxpage/foxpage-server-types';
import { AppInfo, AppSearch } from '../types/app-types';
import { BaseModel } from './base-model';
/**
 * Application repository related classes
 */
export declare class ApplicationModel extends BaseModel<Application> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ApplicationModel
     */
    static getInstance(): ApplicationModel;
    /**
     * Get application list information containing user name
     * @param  {AppSearch} params
     * @returns {AppInfo[]} Promise
     */
    getAppList(params: AppSearch): Promise<AppInfo[]>;
    /**
     * Get the amount of application data under specified search conditions
     * @param  {AppSearch} params
     * @returns {number} Promise
     */
    getTotal(params: AppSearch): Promise<number>;
}
