import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateResourceContentReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateResourceContentDetail extends BaseController {
    constructor();
    /**
     * Update resource content information, need to update file name, content name
     * @param  {ContentVersionDetailRes} params
     * @param  {Header} headers
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: UpdateResourceContentReq): Promise<ResData<ContentVersion>>;
}
