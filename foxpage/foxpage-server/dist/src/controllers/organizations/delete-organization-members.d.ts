import 'reflect-metadata';
import { Organization } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { DeleteOrgMembersReq } from '../../types/validates/org-validate-types';
import { BaseController } from '../base-controller';
export declare class DeleteOrganizationMembers extends BaseController {
    constructor();
    /**
     * Delete organization member
     * @param  {AddOrgMembersReq} params
     * @returns {Organization}
     */
    index(ctx: FoxCtx, params: DeleteOrgMembersReq): Promise<ResData<Organization>>;
}
