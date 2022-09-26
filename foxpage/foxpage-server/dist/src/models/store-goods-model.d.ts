import { StoreGoods } from '@foxpage/foxpage-server-types';
import { StorePageParams } from '../types/store-types';
import { BaseModel } from './base-model';
/**
 * Store product data model
 *
 * @export
 * @class StoreGoodsModel
 * @extends {BaseModel<StoreGoods>}
 */
export declare class StoreGoodsModel extends BaseModel<StoreGoods> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns StoreGoodsModel
     */
    static getInstance(): StoreGoodsModel;
    /**
     * Get a list of store pagination data
     * @param  {StorePageParams} params
     * @returns Promise
     */
    getGoodsPageList(params: StorePageParams): Promise<StoreGoods[]>;
    /**
     * Get the amount of store goods data
     * @param  {StorePageParams} params
     * @returns Promise
     */
    getGoodsCount(params: StorePageParams): Promise<number>;
}
