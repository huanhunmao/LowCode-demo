import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddOrgMembersReq } from '../../types/validates/org-validate-types';
import { BaseController } from '../base-controller';
interface NewUserBase {
    id: string;
    account: string;
    password: string;
}
export declare class AddOrganizationMembers extends BaseController {
    constructor();
    /**
     * Add organization members
     * @param  {AddOrgMembersReq} params
     * @returns {Organization}
     */
    index(ctx: FoxCtx, params: AddOrgMembersReq): Promise<ResData<NewUserBase>>;
}
export {};
