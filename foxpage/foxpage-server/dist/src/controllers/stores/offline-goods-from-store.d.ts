import 'reflect-metadata';
import { StoreGoods } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { OfflineGoodsFromStoreReq } from '../../types/validates/store-validate-types';
import { BaseController } from '../base-controller';
export declare class OfflineGoodsFromStore extends BaseController {
    constructor();
    /**
     * Remove the product from the store
     * @param  {OfflineGoodsFromStoreReq} params
     * @returns {GetPageTemplateListRes}
     */
    index(ctx: FoxCtx, params: OfflineGoodsFromStoreReq): Promise<ResData<StoreGoods>>;
}
