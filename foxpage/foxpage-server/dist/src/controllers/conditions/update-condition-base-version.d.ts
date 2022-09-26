import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { ContentVersionBaseUpdateReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateConditionVersionDetail extends BaseController {
    constructor();
    /**
     * Update the version content of the conditional content base
     * @param  {ContentVersionBaseUpdateReq} params
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: ContentVersionBaseUpdateReq): Promise<ResData<ContentVersion>>;
}
