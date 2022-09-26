"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// const tagsSchema = new Schema({});
const contentSchema = new mongoose_1.Schema({
    id: { type: String, required: true, length: 20, unique: true },
    title: { type: String, required: true, minLength: 1, maxLength: 100 },
    tags: { type: Array, default: [] },
    fileId: { type: String, required: true, length: 20, ref: 'fp_application_file' },
    liveVersionNumber: { type: Number, required: true, min: 0, default: 0 },
    creator: { type: String, required: true, length: 20 },
    createTime: { type: Date, default: Date.now, required: true },
    updateTime: { type: Date, default: Date.now, required: true },
    deleted: { type: Boolean, required: true, default: false },
}, {
    versionKey: false,
});
contentSchema.pre('save', function (next) {
    const currentTime = Date.now();
    this.updateTime = currentTime;
    if (!this.id) {
        this.createTime = currentTime;
    }
    next();
});
contentSchema.index({ id: 1 });
contentSchema.index({ fileId: 1 });
contentSchema.index({ creator: 1 });
contentSchema.index({ deleted: 1 });
contentSchema.index({ createTime: -1 });
exports.default = (0, mongoose_1.model)('fp_application_content', contentSchema, 'fp_application_content');
