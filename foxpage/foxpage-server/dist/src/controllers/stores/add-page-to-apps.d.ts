import 'reflect-metadata';
import { StoreOrder } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddGoodsToApplicationReq } from '../../types/validates/store-validate-types';
import { BaseController } from '../base-controller';
export declare class AddStorePageToApplication extends BaseController {
    constructor();
    /**
     * Add the store page, template products to the specified application
     *
     * 1, Get the project information corresponding to the page
     * 2, Get the details of the page, including dependency information (except for components)
     * 3, Create a project in the specified application, create a new page information, and rely on the information.
     * 4, record product information in the order table
     * @param  {GetPageTemplateListReq} params
     * @returns {GetPageTemplateListRes}
     */
    index(ctx: FoxCtx, params: AddGoodsToApplicationReq): Promise<ResData<StoreOrder[]>>;
}
