import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { BatchLiveReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class BatchSetComponentLiveVersions extends BaseController {
    constructor();
    /**
     * Set the live version of the components
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: BatchLiveReq): Promise<ResData<Content>>;
}
