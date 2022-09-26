import 'reflect-metadata';
import { Folder } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddTypeFolderDetailReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class AddResourceGroupDetail extends BaseController {
    constructor();
    /**
     * Add a static resource group,
     * tags pass [{resourceType: 1|2, resourceId:'',type:'resourceGroup'}] to indicate
     * that the resource group is of type UNPKG
     * @param  {AddTypeFolderDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    index(ctx: FoxCtx, params: AddTypeFolderDetailReq): Promise<ResData<Folder>>;
}
