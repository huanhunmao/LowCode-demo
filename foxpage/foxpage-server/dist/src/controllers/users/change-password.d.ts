import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddUserResData } from '../../types/user-types';
import { UpdateUserPassword } from '../../types/validates/user-validate-types';
import { BaseController } from '../base-controller';
export declare class AddUsers extends BaseController {
    constructor();
    /**
     * User modify password
     * @param  {AddUserReq} params
     * @returns {AddUserResData}
     */
    index(ctx: FoxCtx, params: UpdateUserPassword): Promise<ResData<AddUserResData>>;
}
