import 'reflect-metadata';
import { ResData } from '../../types/index-types';
import { OrgInfo } from '../../types/organization-types';
import { OrgDetailReq } from '../../types/validates/org-validate-types';
import { BaseController } from '../base-controller';
export declare class GetOrganizationList extends BaseController {
    constructor();
    /**
     * Get organization details
     * @param  {OrgDetailReq} params
     * @returns {OrgInfo}
     */
    index(params: OrgDetailReq): Promise<ResData<OrgInfo>>;
}
