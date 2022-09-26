import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { ContentVersionReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class AddComponentVersionDetail extends BaseController {
    constructor();
    /**
     * Create component version information
     * @param  {ContentVersionReq} params
     * @param  {Header} headers
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: ContentVersionReq): Promise<ResData<ContentVersion>>;
}
