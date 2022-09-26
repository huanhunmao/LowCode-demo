import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppContentLiveReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetPageLiveVersions extends BaseController {
    constructor();
    /**
     * Set the live version of the page
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: AppContentLiveReq): Promise<ResData<Content>>;
}
