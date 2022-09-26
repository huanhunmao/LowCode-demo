import { StoreOrder } from '@foxpage/foxpage-server-types';
import { BaseService } from '../base-service';
export declare class StoreOrderService extends BaseService<StoreOrder> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns StoreOrderService
     */
    static getInstance(): StoreOrderService;
    /**
     * Get a list of goods order details through goods ID and application ID
     * @param  {string[]} appIds
     * @param  {string[]} goodsIds
     * @returns Promise
     */
    getListByAppIdAndGoodsIds(appIds: string[], goodsIds: string[]): Promise<StoreOrder[]>;
}
