import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppContentLiveReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetConditionLiveVersions extends BaseController {
    constructor();
    /**
     * Set the live version of the conditions
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: AppContentLiveReq): Promise<ResData<Content>>;
}
