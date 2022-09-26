import 'reflect-metadata';
import { Organization } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { OrgMemberDetailReq } from '../../types/validates/org-validate-types';
import { BaseController } from '../base-controller';
export declare class SetOrganizationMemberList extends BaseController {
    constructor();
    /**
     * Organization member operations, including joining and exiting
     * @param  {OrgMemberDetailReq} params
     * @returns {Organization}
     */
    index(ctx: FoxCtx, params: OrgMemberDetailReq): Promise<ResData<Organization>>;
}
