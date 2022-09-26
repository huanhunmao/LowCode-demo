import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateAuthReq } from '../../types/validates/authorize-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateAuthorizeDetail extends BaseController {
    constructor();
    /**
     * update the target id auth mask
     * @param  {UpdateAuthReq} params
     * @returns {any}
     */
    index(ctx: FoxCtx, params: UpdateAuthReq): Promise<ResData<any>>;
}
