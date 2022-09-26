import { Organization } from '@foxpage/foxpage-server-types';
import { Search } from '../types/index-types';
import { BaseModel } from './base-model';
/**
 * Organize related data model
 *
 * @export
 * @class OrgModel
 * @extends {BaseModel<Organization>}
 */
export declare class OrgModel extends BaseModel<Organization> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns OrgModel
     */
    static getInstance(): OrgModel;
    /**
     * Get organization paging data
     * @param  {Search} params
     * @returns {Organization[]} Promise
     */
    getPageList(params: Search): Promise<Organization[]>;
    /**
     * Get the total number of organizations
     * @param  {Search} params
     * @returns {number} Promise
     */
    getCount(params: Search): Promise<number>;
}
