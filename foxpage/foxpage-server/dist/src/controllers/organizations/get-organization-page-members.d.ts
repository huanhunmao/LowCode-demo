import 'reflect-metadata';
import { MemberInfo, ResData } from '../../types/index-types';
import { GetOrgMembersReq } from '../../types/validates/org-validate-types';
import { BaseController } from '../base-controller';
export declare class GetOrganizationPageMemberList extends BaseController {
    constructor();
    /**
     * Get a paginated list of organization members
     * @param  {OrgDetailReq} params
     * @returns {OrgInfo}
     */
    index(params: GetOrgMembersReq): Promise<ResData<MemberInfo[]>>;
}
