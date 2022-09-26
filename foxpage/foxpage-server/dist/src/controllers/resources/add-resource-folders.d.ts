import 'reflect-metadata';
import { Folder } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddResourceGroupDetailReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class AddAssetDetail extends BaseController {
    constructor();
    /**
     * Create static resource folder level details
     * @param  {AddTypeFolderDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    index(ctx: FoxCtx, params: AddResourceGroupDetailReq): Promise<ResData<Folder>>;
}
