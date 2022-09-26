"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreGoodsModel = void 0;
const store_goods_1 = __importDefault(require("./schema/store-goods"));
const base_model_1 = require("./base-model");
/**
 * Store product data model
 *
 * @export
 * @class StoreGoodsModel
 * @extends {BaseModel<StoreGoods>}
 */
class StoreGoodsModel extends base_model_1.BaseModel {
    constructor() {
        super(store_goods_1.default);
    }
    /**
     * Single instance
     * @returns StoreGoodsModel
     */
    static getInstance() {
        this._instance || (this._instance = new StoreGoodsModel());
        return this._instance;
    }
    /**
     * Get a list of store pagination data
     * @param  {StorePageParams} params
     * @returns Promise
     */
    async getGoodsPageList(params) {
        const page = params.page || 1;
        const size = params.size || 20;
        const from = (page - 1) * size;
        const searchParams = {
            status: 1,
            deleted: false,
        };
        if (params.search) {
            searchParams.name = { $regex: new RegExp(params.search, 'i') };
        }
        if (params.type) {
            searchParams.type = params.type;
        }
        if (params.appIds && params.appIds.length > 0) {
            searchParams['details.applicationId'] = { $in: params.appIds };
        }
        return this.model
            .find(searchParams, '-_id')
            .sort({ createTime: -1 })
            .skip(from)
            .limit(size)
            .lean();
    }
    /**
     * Get the amount of store goods data
     * @param  {StorePageParams} params
     * @returns Promise
     */
    async getGoodsCount(params) {
        const searchParams = {
            status: 1,
            deleted: false,
        };
        if (params.search) {
            searchParams.name = { $regex: new RegExp(params.search, 'i') };
        }
        if (params.type) {
            searchParams.type = params.type;
        }
        if (params.appIds && params.appIds.length > 0) {
            searchParams['details.applicationId'] = { $in: params.appIds };
        }
        return this.model.countDocuments(searchParams);
    }
}
exports.StoreGoodsModel = StoreGoodsModel;
