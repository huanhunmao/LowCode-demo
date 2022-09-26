"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const relationSchema = new mongoose_1.Schema({ useContentId: String });
const contentRelationSchema = new mongoose_1.Schema({
    id: { type: String, required: true, length: 20, unique: true },
    contentId: { type: String, required: true, length: 20 },
    versionNumber: { type: Number, min: 0, default: 0 },
    relation: { type: [relationSchema], default: [] },
    createTime: { type: Date, default: Date.now, required: true },
    updateTime: { type: Date, default: Date.now, required: true },
    deleted: { type: Boolean, required: true, default: false },
}, {
    versionKey: false,
});
contentRelationSchema.pre('save', function (next) {
    const currentTime = Date.now();
    this.updateTime = currentTime;
    if (!this.id) {
        this.createTime = currentTime;
    }
    next();
});
contentRelationSchema.index({ id: 1 });
contentRelationSchema.index({ contentId: 1 });
contentRelationSchema.index({ versionNumber: 1 });
contentRelationSchema.index({ deleted: 1 });
contentRelationSchema.index({ createTime: -1 });
exports.default = (0, mongoose_1.model)('fp_application_content_relation', contentRelationSchema, 'fp_application_content_relation');
