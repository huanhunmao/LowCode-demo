"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    id: { type: String, required: true, length: 20, unique: true },
    name: { type: String, required: true, minLength: 2, maxLength: 100 },
    members: [{ userId: String, joinTime: Date, status: Boolean }],
    organizationId: { type: String, required: true, length: 20, ref: 'fp_organization' },
    creator: { type: String, required: true, length: 20 },
    createTime: { type: Date, default: Date.now, required: true },
    updateTime: { type: Date, default: Date.now, required: true },
    deleted: { type: Boolean, required: true, default: false },
}, {
    versionKey: false,
});
teamSchema.pre('save', function (next) {
    const currentTime = Date.now();
    this.updateTime = currentTime;
    if (!this.id) {
        this.createTime = currentTime;
    }
    next();
});
teamSchema.index({ id: 1 });
teamSchema.index({ organizationId: 1 });
teamSchema.index({ creator: 1 });
teamSchema.index({ deleted: 1 });
exports.default = (0, mongoose_1.model)('fp_team', teamSchema, 'fp_team');
