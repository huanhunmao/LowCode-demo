import 'reflect-metadata';
import { UsersLoginRes } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { LoginReq } from '../../types/validates/user-validate-types';
import { BaseController } from '../base-controller';
export declare class UserLogin extends BaseController {
    constructor();
    /**
     * User account login
     * @param  {LoginReq} params
     * @returns {LoginResData}
     */
    index(ctx: FoxCtx, params: LoginReq): Promise<ResData<UsersLoginRes>>;
}
