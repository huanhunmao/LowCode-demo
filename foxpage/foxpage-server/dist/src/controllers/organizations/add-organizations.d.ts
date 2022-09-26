import 'reflect-metadata';
import { Organization } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddOrgDetailReq } from '../../types/validates/org-validate-types';
import { BaseController } from '../base-controller';
export declare class AddOrganizationDetail extends BaseController {
    constructor();
    /**
     * Create organization details
     * @param  {AddOrgDetailReq} params
     * @param  {Header} headers
     * @returns {Organization}
     */
    index(ctx: FoxCtx, params: AddOrgDetailReq): Promise<ResData<Organization>>;
}
