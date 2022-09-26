import 'reflect-metadata';
import { Folder } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppContentStatusReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetResourceGroupStatus extends BaseController {
    constructor();
    /**
     * Set resource group deletion status
     * @param  {AppContentStatusReq} params
     * @returns {Folder}
     */
    index(ctx: FoxCtx, params: AppContentStatusReq): Promise<ResData<Folder>>;
}
