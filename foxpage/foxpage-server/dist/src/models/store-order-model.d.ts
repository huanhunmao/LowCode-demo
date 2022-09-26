import { StoreOrder } from '@foxpage/foxpage-server-types';
import { BaseModel } from './base-model';
/**
 * Store product order data model
 *
 * @export
 * @class StoreOrderModel
 * @extends {BaseModel<StoreOrder>}
 */
export declare class StoreOrderModel extends BaseModel<StoreOrder> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns StoreOrderModel
     */
    static getInstance(): StoreOrderModel;
}
