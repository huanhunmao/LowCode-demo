import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { ContentStatusReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetContentVersionStatus extends BaseController {
    constructor();
    /**
     * Set the status of the page version， base, discard, beta, alpha, release...
     * @param  {ContentStatusReq} params
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: ContentStatusReq): Promise<ResData<ContentVersion>>;
}
