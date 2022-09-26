"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModel = void 0;
const application_1 = __importDefault(require("./schema/application"));
const base_model_1 = require("./base-model");
/**
 * Application repository related classes
 */
class ApplicationModel extends base_model_1.BaseModel {
    constructor() {
        super(application_1.default);
    }
    /**
     * Single instance
     * @returns ApplicationModel
     */
    static getInstance() {
        this._instance || (this._instance = new ApplicationModel());
        return this._instance;
    }
    /**
     * Get application list information containing user name
     * @param  {AppSearch} params
     * @returns {AppInfo[]} Promise
     */
    async getAppList(params) {
        const page = params.page || 1;
        const size = params.size || 20;
        const from = (page - 1) * size;
        const searchParams = { deleted: false };
        if (params.organizationId) {
            searchParams.organizationId = params.organizationId;
        }
        if (params.creator) {
            searchParams.creator = params.creator;
        }
        if (params.search) {
            searchParams['$or'] = [{ name: { $regex: new RegExp(params.search, 'i') } }, { id: params.search }];
        }
        return this.model
            .find(searchParams, this.ignoreFields)
            .sort({ '_id': -1 })
            .skip(from)
            .limit(size)
            .lean();
    }
    /**
     * Get the amount of application data under specified search conditions
     * @param  {AppSearch} params
     * @returns {number} Promise
     */
    async getTotal(params) {
        const searchParams = { deleted: false };
        if (params.organizationId) {
            searchParams.organizationId = params.organizationId;
        }
        if (params.creator) {
            searchParams.creator = params.creator;
        }
        if (params.search) {
            searchParams['$or'] = [{ name: { $regex: new RegExp(params.search, 'i') } }, { id: params.search }];
        }
        return this.model
            .find(searchParams)
            .countDocuments()
            .lean();
    }
}
exports.ApplicationModel = ApplicationModel;
