import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { ComponentVersionUpdateReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateComponentVersionDetail extends BaseController {
    constructor();
    /**
     * Update component version information,
     * the release version content only can update editor data
     * @param  {ContentVersionUpdateReq} params
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: ComponentVersionUpdateReq): Promise<ResData<ContentVersion>>;
}
