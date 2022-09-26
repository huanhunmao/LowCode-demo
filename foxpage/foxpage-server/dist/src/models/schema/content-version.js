"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = require("mongoose");
const constant_1 = require("../../../config/constant");
const contentVersionSchema = new mongoose_1.Schema({
    id: { type: String, required: true, length: 20, unique: true },
    contentId: { type: String, required: true, length: 20 },
    version: { type: String, maxLength: 20, default: '' },
    versionNumber: { type: Number, min: 0, default: 0 },
    dslVersion: { type: String, default: constant_1.DSL_VERSION },
    status: { type: String, maxLength: 20, default: constant_1.VERSION.STATUS_BASE },
    content: { type: Object, default: {} },
    creator: { type: String, required: true, length: 20 },
    createTime: { type: Date, default: Date.now, required: true },
    updateTime: { type: Date, default: Date.now, required: true },
    deleted: { type: Boolean, required: true, default: false },
}, {
    versionKey: false,
    minimize: false,
});
contentVersionSchema.pre('save', function (next) {
    var _a, _b, _c;
    const currentTime = Date.now();
    this.updateTime = currentTime;
    if (!this.id) {
        this.createTime = currentTime;
    }
    if (((_a = this.content) === null || _a === void 0 ? void 0 : _a.meta) && !lodash_1.default.isPlainObject(this.content.meta)) {
        this.content.meta = JSON.stringify(this.content.meta);
    }
    if (((_b = this.content) === null || _b === void 0 ? void 0 : _b.schema) && !lodash_1.default.isPlainObject(this.content.schema)) {
        this.content.schema = JSON.stringify(this.content.schema);
    }
    if (((_c = this.content) === null || _c === void 0 ? void 0 : _c.relation) && !lodash_1.default.isPlainObject(this.content.relation)) {
        this.content.relation = JSON.stringify(this.content.relation);
    }
    next();
});
contentVersionSchema.pre(['update', 'updateOne', 'updateMany'], function (next) {
    var _a, _b, _c;
    const versionContent = (this.getUpdate() || {});
    if (versionContent.content) {
        if (((_a = versionContent === null || versionContent === void 0 ? void 0 : versionContent.content) === null || _a === void 0 ? void 0 : _a.meta) && lodash_1.default.isPlainObject(versionContent.content.meta)) {
            versionContent.content.meta = JSON.stringify(versionContent.content.meta);
        }
        if (((_b = versionContent === null || versionContent === void 0 ? void 0 : versionContent.content) === null || _b === void 0 ? void 0 : _b.schema) && lodash_1.default.isPlainObject(versionContent.content.schema)) {
            versionContent.content.schema = JSON.stringify(versionContent.content.schema);
        }
        if (((_c = versionContent === null || versionContent === void 0 ? void 0 : versionContent.content) === null || _c === void 0 ? void 0 : _c.relation) && lodash_1.default.isPlainObject(versionContent.content.relation)) {
            versionContent.content.relation = JSON.stringify(versionContent.content.relation);
        }
        this.update({}, { $set: { content: versionContent.content } });
    }
    next();
});
contentVersionSchema.pre('insertMany', function (next, docs) {
    var _a, _b, _c;
    if (lodash_1.default.isArray(docs) && docs.length > 0) {
        for (const doc of docs) {
            if (doc.content) {
                if (((_a = doc === null || doc === void 0 ? void 0 : doc.content) === null || _a === void 0 ? void 0 : _a.meta) && lodash_1.default.isPlainObject(doc.content.meta)) {
                    doc.content.meta = JSON.stringify(doc.content.meta);
                }
                if (((_b = doc === null || doc === void 0 ? void 0 : doc.content) === null || _b === void 0 ? void 0 : _b.schema) && lodash_1.default.isPlainObject(doc.content.schema)) {
                    doc.content.schema = JSON.stringify(doc.content.schema);
                }
                if (((_c = doc === null || doc === void 0 ? void 0 : doc.content) === null || _c === void 0 ? void 0 : _c.relation) && lodash_1.default.isPlainObject(doc.content.relation)) {
                    doc.content.relation = JSON.stringify(doc.content.relation);
                }
            }
        }
    }
    next();
});
// Format `meta` filed in version content after query
contentVersionSchema.post(['find', 'findOne'], function (result) {
    if (result) {
        !lodash_1.default.isArray(result) && (result = [result]);
        result.forEach((item) => {
            var _a, _b, _c;
            if (((_a = item === null || item === void 0 ? void 0 : item.content) === null || _a === void 0 ? void 0 : _a.meta) && lodash_1.default.isString(item.content.meta)) {
                try {
                    item.content.meta = JSON.parse(item.content.meta);
                }
                catch (err) {
                    console.log(err);
                }
            }
            if (((_b = item === null || item === void 0 ? void 0 : item.content) === null || _b === void 0 ? void 0 : _b.schema) && lodash_1.default.isString(item.content.schema)) {
                try {
                    item.content.schema = JSON.parse(item.content.schema);
                }
                catch (err) {
                    console.log(err);
                }
            }
            if (((_c = item === null || item === void 0 ? void 0 : item.content) === null || _c === void 0 ? void 0 : _c.relation) && lodash_1.default.isString(item.content.relation)) {
                try {
                    item.content.relation = JSON.parse(item.content.relation);
                }
                catch (err) {
                    console.log(err);
                }
            }
        });
    }
});
contentVersionSchema.index({ id: 1 });
contentVersionSchema.index({ contentId: 1 });
contentVersionSchema.index({ versionNumber: -1 });
contentVersionSchema.index({ creator: 1 });
contentVersionSchema.index({ deleted: 1 });
contentVersionSchema.index({ createTime: -1 });
exports.default = (0, mongoose_1.model)('fp_application_content_version', contentVersionSchema, 'fp_application_content_version');
