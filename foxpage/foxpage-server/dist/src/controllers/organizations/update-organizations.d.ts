import 'reflect-metadata';
import { Organization } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { OrgUpdateDetailReq } from '../../types/validates/org-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateOrganizationDetail extends BaseController {
    constructor();
    /**
     * Update organization details, only the name will be updated for the time being
     * @param  {OrgUpdateDetailReq} params
     * @returns {Organization}
     */
    index(ctx: FoxCtx, params: OrgUpdateDetailReq): Promise<ResData<Organization>>;
}
