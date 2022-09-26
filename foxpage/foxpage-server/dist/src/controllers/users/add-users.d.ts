import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddUserResData } from '../../types/user-types';
import { AddUserReq } from '../../types/validates/user-validate-types';
import { BaseController } from '../base-controller';
export declare class AddUsers extends BaseController {
    constructor();
    /**
     * The administrator manually creates a new user
     * @param  {AddUserReq} params
     * @returns {AddUserResData}
     */
    index(ctx: FoxCtx, params: AddUserReq): Promise<ResData<AddUserResData>>;
}
