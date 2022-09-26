import 'reflect-metadata';
import { ResData } from '../../types/index-types';
import { UserAccountInfo } from '../../types/user-types';
import { GetPageUserListReq } from '../../types/validates/user-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageUserDetail extends BaseController {
    constructor();
    /**
     * Get page user detail list
     * @param  {UserListRes} params
     * @returns {}
     */
    index(params: GetPageUserListReq): Promise<ResData<UserAccountInfo[]>>;
}
