import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppContentStatusReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetVariableContentStatus extends BaseController {
    constructor();
    /**
     * Set variable content deletion status
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: AppContentStatusReq): Promise<ResData<Content>>;
}
