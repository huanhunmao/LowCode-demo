import 'reflect-metadata';
import { StoreOrder } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddGoodsItemTpApplicationReq } from '../../types/validates/store-validate-types';
import { BaseController } from '../base-controller';
export declare class AddStorePageItemToApplication extends BaseController {
    constructor();
    /**
     * Add the store variable, condition, function products to the specified application
     * @param  {GetPageTemplateListReq} params
     * @returns {GetPageTemplateListRes}
     */
    index(ctx: FoxCtx, params: AddGoodsItemTpApplicationReq): Promise<ResData<StoreOrder[]>>;
}
