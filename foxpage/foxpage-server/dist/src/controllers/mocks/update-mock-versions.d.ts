import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { ContentVersionUpdateReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateMockVersionDetail extends BaseController {
    constructor();
    /**
     * Update mock content version information, including version number and content
     * @param  {ContentVersionUpdateReq} params
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: ContentVersionUpdateReq): Promise<ResData<ContentVersion>>;
}
