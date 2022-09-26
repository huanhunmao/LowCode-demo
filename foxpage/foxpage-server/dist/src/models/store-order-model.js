"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreOrderModel = void 0;
const store_order_1 = __importDefault(require("./schema/store-order"));
const base_model_1 = require("./base-model");
/**
 * Store product order data model
 *
 * @export
 * @class StoreOrderModel
 * @extends {BaseModel<StoreOrder>}
 */
class StoreOrderModel extends base_model_1.BaseModel {
    constructor() {
        super(store_order_1.default);
    }
    /**
     * Single instance
     * @returns StoreOrderModel
     */
    static getInstance() {
        this._instance || (this._instance = new StoreOrderModel());
        return this._instance;
    }
}
exports.StoreOrderModel = StoreOrderModel;
