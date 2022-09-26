import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { ContentLiveReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetContentLiveVersion extends BaseController {
    constructor();
    /**
     * Set the live version of the page
     * @param  {ContentLiveReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: ContentLiveReq): Promise<ResData<Content>>;
}
