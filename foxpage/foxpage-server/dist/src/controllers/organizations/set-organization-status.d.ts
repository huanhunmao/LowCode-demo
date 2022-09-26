import 'reflect-metadata';
import { Organization } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { OrgStatusReq } from '../../types/validates/org-validate-types';
import { BaseController } from '../base-controller';
export declare class SetOrganizationStatus extends BaseController {
    constructor();
    /**
     * Set organization deletion status
     * @param  {OrgStatusReq} params
     * @returns {Organization}
     */
    index(ctx: FoxCtx, params: OrgStatusReq): Promise<ResData<Organization>>;
}
