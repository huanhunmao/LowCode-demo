"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreOrderService = void 0;
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
class StoreOrderService extends base_service_1.BaseService {
    constructor() {
        super(Model.storeOrder);
    }
    /**
     * Single instance
     * @returns StoreOrderService
     */
    static getInstance() {
        this._instance || (this._instance = new StoreOrderService());
        return this._instance;
    }
    /**
     * Get a list of goods order details through goods ID and application ID
     * @param  {string[]} appIds
     * @param  {string[]} goodsIds
     * @returns Promise
     */
    async getListByAppIdAndGoodsIds(appIds, goodsIds) {
        return this.find({ 'customer.applicationId': { $in: appIds }, goodsId: { $in: goodsIds } }, '-_id');
    }
}
exports.StoreOrderService = StoreOrderService;
