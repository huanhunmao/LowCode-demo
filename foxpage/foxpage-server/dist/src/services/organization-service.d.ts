import { Member, Organization } from '@foxpage/foxpage-server-types';
import { FoxCtx, IdName, PageList, Search } from '../types/index-types';
import { OrgBaseInfo, OrgInfo } from '../types/organization-types';
import { BaseService } from './base-service';
export declare class OrgService extends BaseService<Organization> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns OrgService
     */
    static getInstance(): OrgService;
    /**
     * Get user organization list
     * @param userId
     * @returns
     */
    getUserOrg(userId: string): Promise<IdName[]>;
    /**
     * Get organization paging data
     * @param  {Search} params
     * @returns {PageList<OrgInfo>} Promise
     */
    getPageList(params: Search): Promise<PageList<OrgInfo>>;
    /**
     * Obtain information about the creator and organization member of the
     * replacement organization through the organization details
     * @param  {Organization[]} orgList
     * @returns {OrgInfo[]} Promise
     */
    replaceOrgUserInfo(orgList: Organization[]): Promise<OrgInfo[]>;
    /**
     * Get a list of members of the specified organization
     * @param  {string} id
     * @returns {Member[]} Promise
     */
    getMembersById(id: string): Promise<Member[]>;
    /**
     * Get the organization information to which the specified user belongs
     * @param  {string} userId
     * @returns Promise
     */
    getUserOrgById(userId: string): Promise<OrgBaseInfo>;
    /**
     * Check user info in org members
     * @param organizationId
     * @param userId
     * @returns
     */
    checkUserIdInOrg(organizationId: string, userId: string): Promise<Partial<Member>>;
    /**
     * Check whether the specified user is in the specified organization, the current user is the default
     * @param  {string} organizationId
     * @returns Promise
     */
    checkUserInOrg(organizationId: string, userId: string): Promise<boolean>;
    /**
     * Check if the component id exists
     * @param  {string} organizationId
     * @returns Promise
     */
    checkOrgValid(organizationId: string): Promise<boolean>;
    /**
     * Add new organization user
     * @param  {string} organizationId
     * @param  {string[]} userIds
     * @returns Member
     */
    addNewMembers(organizationId: string, userIds: string[], options: {
        ctx: FoxCtx;
    }): Member[];
    /**
     * Update the status of organization members
     * @param  {string} organizationId
     * @param  {string[]} userIds
     * @param  {boolean} status
     */
    updateMembersStatus(organizationId: string, userIds: string[], status: boolean, options: {
        ctx: FoxCtx;
    }): void;
}
