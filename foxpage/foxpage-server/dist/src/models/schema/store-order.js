"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const storeOrderSchema = new mongoose_1.Schema({
    id: { type: String, required: true, length: 20, unique: true },
    goodsId: { type: String, required: true },
    goodsVersionId: { type: String, default: '' },
    customer: { type: Object, required: true },
    delivery: { type: String, required: true },
    createTime: { type: Date, default: Date.now, required: true },
    updateTime: { type: Date, default: Date.now, required: true },
    deleted: { type: Boolean, required: true, default: false },
}, {
    versionKey: false,
});
storeOrderSchema.pre('save', function (next) {
    const currentTime = Date.now();
    this.updateTime = currentTime;
    if (!this.id) {
        this.createTime = currentTime;
    }
    next();
});
storeOrderSchema.index({ id: 1 });
storeOrderSchema.index({ creator: 1 });
storeOrderSchema.index({ deleted: 1 });
storeOrderSchema.index({ createTime: -1 });
exports.default = (0, mongoose_1.model)('fp_store_order', storeOrderSchema, 'fp_store_order');
