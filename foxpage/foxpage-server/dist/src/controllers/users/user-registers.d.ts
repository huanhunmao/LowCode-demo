import 'reflect-metadata';
import { UserRegisterRes } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { RegisterReq } from '../../types/validates/user-validate-types';
import { BaseController } from '../base-controller';
export declare class UserRegister extends BaseController {
    constructor();
    /**
     * User registration
     * @param  {RegisterReq} params
     * @returns {User}
     */
    index(ctx: FoxCtx, params: RegisterReq): Promise<ResData<UserRegisterRes>>;
}
