import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateComponentReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateComponentFileDetail extends BaseController {
    constructor();
    /**
     * Update component file information, currently only the file profile can be updated
     * @param  {UpdateComponentReq} params
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: UpdateComponentReq): Promise<ResData<File>>;
}
