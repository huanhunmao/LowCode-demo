import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { SetAuthStatusReq } from '../../types/validates/authorize-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateAuthorizeDetail extends BaseController {
    constructor();
    /**
     * set the the auth delete status
     * @param  {UpdateAuthReq} params
     * @returns {any}
     */
    index(ctx: FoxCtx, params: SetAuthStatusReq): Promise<ResData<any>>;
}
