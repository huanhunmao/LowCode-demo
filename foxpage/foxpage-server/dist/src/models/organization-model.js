"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgModel = void 0;
const organization_1 = __importDefault(require("./schema/organization"));
const base_model_1 = require("./base-model");
/**
 * Organize related data model
 *
 * @export
 * @class OrgModel
 * @extends {BaseModel<Organization>}
 */
class OrgModel extends base_model_1.BaseModel {
    constructor() {
        super(organization_1.default);
    }
    /**
     * Single instance
     * @returns OrgModel
     */
    static getInstance() {
        this._instance || (this._instance = new OrgModel());
        return this._instance;
    }
    /**
     * Get organization paging data
     * @param  {Search} params
     * @returns {Organization[]} Promise
     */
    async getPageList(params) {
        const page = params.page || 1;
        const size = params.size || 20;
        const from = (page - 1) * size;
        const searchParams = { deleted: false };
        if (params.search) {
            searchParams['$or'] = [{ name: { $regex: new RegExp(params.search, 'i') } }, { id: params.search }];
        }
        return this.model
            .find(searchParams, '-_id -members._id')
            .sort({ _id: -1 })
            .skip(from)
            .limit(size)
            .lean();
    }
    /**
     * Get the total number of organizations
     * @param  {Search} params
     * @returns {number} Promise
     */
    async getCount(params) {
        const searchParams = { deleted: false };
        if (params.search) {
            searchParams['$or'] = [{ name: { $regex: new RegExp(params.search, 'i') } }, { id: params.search }];
        }
        return this.model.countDocuments(searchParams);
    }
}
exports.OrgModel = OrgModel;
