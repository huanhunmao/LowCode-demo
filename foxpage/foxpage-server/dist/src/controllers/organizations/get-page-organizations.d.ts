import 'reflect-metadata';
import { ResData } from '../../types/index-types';
import { OrgInfo } from '../../types/organization-types';
import { OrgListReq } from '../../types/validates/org-validate-types';
import { BaseController } from '../base-controller';
export declare class GetOrgList extends BaseController {
    constructor();
    /**
     * Get a list of organizations
     * @param  {OrgListReq} params
     * @returns {OrgInfo}
     */
    index(params: OrgListReq): Promise<ResData<OrgInfo[]>>;
}
