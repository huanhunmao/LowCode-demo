"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModel = void 0;
const log_1 = __importDefault(require("./schema/log"));
const base_model_1 = require("./base-model");
/**
 * Log data processing related classes
 *
 * @export
 * @class LogModel
 * @extends {BaseModel<Log>}
 */
class LogModel extends base_model_1.BaseModel {
    constructor() {
        super(log_1.default);
    }
    /**
     * Single instance
     * @returns LogModel
     */
    static getInstance() {
        this._instance || (this._instance = new LogModel());
        return this._instance;
    }
    /**
     * Get the special data history operation list
     * @param  {DataLogPage} params
     * @returns Promise
     */
    async getDataPageList(params) {
        return this.model
            .find({ 'content.id': params.id }, '-_id -category._id')
            .sort({ createTime: -1 })
            .skip((params.page - 1) * params.size)
            .limit(params.size)
            .lean();
    }
    /**
     * Get the special data history operation counts
     * @param  {DataLogPage} params
     * @returns Promise
     */
    async getDataPageCount(params) {
        return this.model.countDocuments({ 'content.id': params.id });
    }
}
exports.LogModel = LogModel;
