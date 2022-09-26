"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationModel = void 0;
const content_relation_1 = __importDefault(require("./schema/content-relation"));
const base_model_1 = require("./base-model");
/**
 *relation repository
 *
 * @export
 * @class FileModel
 * @extends {BaseModel<File>}
 */
class RelationModel extends base_model_1.BaseModel {
    constructor() {
        super(content_relation_1.default);
    }
    /**
     * Single instance
     * @returns RelationModel
     */
    static getInstance() {
        this._instance || (this._instance = new RelationModel());
        return this._instance;
    }
}
exports.RelationModel = RelationModel;
