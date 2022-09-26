import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddResourceContentReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class AddResourceContentDetail extends BaseController {
    constructor();
    /**
     * Added resource content information, resource files, resource content,
     * and resource content version information will be added at the same time
     * @param  {AddResourceContentReq} params
     * @param  {Header} headers
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: AddResourceContentReq): Promise<ResData<ContentVersion>>;
}
