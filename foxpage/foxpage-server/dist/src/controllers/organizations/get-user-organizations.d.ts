import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { UserOrg } from '../../types/organization-types';
import { BaseController } from '../base-controller';
export declare class GetUserOrgList extends BaseController {
    constructor();
    /**
     * Get the user authorized organization list
     * @returns {UserOrg[]}
     */
    index(ctx: FoxCtx): Promise<ResData<UserOrg[]>>;
}
