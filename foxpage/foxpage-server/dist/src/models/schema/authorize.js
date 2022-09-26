"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const authorizeSchema = new mongoose_1.Schema({
    id: { type: String, required: true, length: 20, unique: true },
    type: { type: String, required: true },
    typeId: { type: String, default: '', },
    targetId: { type: String, required: true },
    mask: { type: Number, required: true },
    allow: { type: Boolean, default: true },
    relation: { type: Object, default: {} },
    creator: { type: String, required: true, length: 20 },
    createTime: { type: Date, default: Date.now, required: true },
    updateTime: { type: Date, default: Date.now, required: true },
    deleted: { type: Boolean, required: true, default: false },
}, {
    versionKey: false,
});
authorizeSchema.set('toJSON', { getters: true });
authorizeSchema.pre('save', function (next) {
    const currentTime = Date.now();
    this.updateTime = currentTime;
    if (!this.id) {
        this.createTime = currentTime;
    }
    return next();
});
authorizeSchema.index({ id: 1 });
authorizeSchema.index({ typeId: 1 });
authorizeSchema.index({ creator: 1 });
authorizeSchema.index({ deleted: 1 });
authorizeSchema.index({ createTime: -1 });
exports.default = (0, mongoose_1.model)('fp_authorize', authorizeSchema, 'fp_authorize');
