import 'reflect-metadata';
import { Folder } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppContentStatusReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetResourceFolderStatus extends BaseController {
    constructor();
    /**
     * Set the delete status of the resource folder
     * @param  {AppContentStatusReq} params
     * @returns {Folder}
     */
    index(ctx: FoxCtx, params: AppContentStatusReq): Promise<ResData<Folder>>;
}
