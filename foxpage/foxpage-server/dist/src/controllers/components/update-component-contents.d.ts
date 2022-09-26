import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateComponentContentReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateComponentContentDetail extends BaseController {
    constructor();
    /**
     * Update component content information, currently only the content label information can be updated
     * @param  {UpdateComponentContentReq} params
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: UpdateComponentContentReq): Promise<ResData<Content>>;
}
