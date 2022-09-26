import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { ContentDetailsReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class GetContentByIds extends BaseController {
    constructor();
    /**
     * Get page details through contentIds
     * @param  {ContentListReq} params
     * @returns {ContentInfo}
     */
    index(ctx: FoxCtx, params: ContentDetailsReq): Promise<ResData<Content[]>>;
}
