import 'reflect-metadata';
import { StoreGoods } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddGoodsToStoreReq } from '../../types/validates/store-validate-types';
import { BaseController } from '../base-controller';
export declare class AddGoodsToStore extends BaseController {
    constructor();
    /**
     * Add file to the store
     * @param  {AddGoodsToStoreReq} params
     * @returns {GetPageTemplateListRes}
     */
    index(ctx: FoxCtx, params: AddGoodsToStoreReq): Promise<ResData<StoreGoods>>;
}
