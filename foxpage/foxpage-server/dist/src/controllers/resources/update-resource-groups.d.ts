import 'reflect-metadata';
import { Folder } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateResourceConfigReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateResourceGroup extends BaseController {
    constructor();
    /**
     * Update resource group name and config
     * @param  {UpdateResourceConfigReq} params
     * @returns {Folder}
     */
    index(ctx: FoxCtx, params: UpdateResourceConfigReq): Promise<ResData<Folder>>;
}
