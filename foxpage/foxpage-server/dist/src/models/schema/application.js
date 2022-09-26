"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const resourceSchema = new mongoose_1.Schema({ id: String, name: String, type: Number, detail: Object });
const hostSchema = new mongoose_1.Schema({ url: String, locales: [String] });
const applicationSchema = new mongoose_1.Schema({
    id: { type: String, required: true, length: 20, unique: true },
    name: { type: String, required: true, minLength: 2, maxLength: 50 },
    intro: { type: String, maxLength: 1000, default: '' },
    host: { type: [hostSchema], default: [] },
    slug: { type: String, maxLength: 100, default: '' },
    locales: { type: [String], default: [] },
    resources: { type: [resourceSchema], default: [] },
    organizationId: { type: String, required: true, length: 20 },
    setting: { type: Object, default: {} },
    creator: { type: String, required: true, length: 20 },
    createTime: { type: Date, default: Date.now, required: true },
    updateTime: { type: Date, default: Date.now, required: true },
    deleted: { type: Boolean, required: true, default: false },
}, {
    versionKey: false,
});
applicationSchema.set('toJSON', { getters: true });
applicationSchema.pre('save', function (next) {
    const currentTime = Date.now();
    this.updateTime = currentTime;
    if (!this.id) {
        this.createTime = currentTime;
    }
    return next();
});
applicationSchema.index({ id: 1 });
applicationSchema.index({ organizationId: 1 });
applicationSchema.index({ creator: 1 });
applicationSchema.index({ deleted: 1 });
applicationSchema.index({ createTime: -1 });
exports.default = (0, mongoose_1.model)('fp_application', applicationSchema, 'fp_application');
