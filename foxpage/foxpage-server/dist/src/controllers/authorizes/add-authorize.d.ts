import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddAuthReq } from '../../types/validates/authorize-validate-types';
import { BaseController } from '../base-controller';
export declare class AddAuthorizeDetail extends BaseController {
    constructor();
    /**
     * Add the target id auth mask
     * @param  {AddAuthReq} params
     * @returns {AppWithFolder}
     */
    index(ctx: FoxCtx, params: AddAuthReq): Promise<ResData<string>>;
}
