"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.order = exports.goods = void 0;
const store_goods_service_1 = require("./store-goods-service");
const store_order_service_1 = require("./store-order-service");
const goods = store_goods_service_1.StoreGoodsService.getInstance();
exports.goods = goods;
const order = store_order_service_1.StoreOrderService.getInstance();
exports.order = order;
