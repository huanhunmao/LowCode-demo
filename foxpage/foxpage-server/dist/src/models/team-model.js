"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModel = void 0;
const team_1 = __importDefault(require("./schema/team"));
const base_model_1 = require("./base-model");
/**
 * Team related data model
 *
 * @export
 * @class TeamModel
 * @extends {BaseModel<Team>}
 */
class TeamModel extends base_model_1.BaseModel {
    constructor() {
        super(team_1.default);
    }
    /**
     * Single instance
     * @returns TeamModel
     */
    static getInstance() {
        this._instance || (this._instance = new TeamModel());
        return this._instance;
    }
    /**
     * Get team paging data
     * @param  {TeamSearch} params
     * @returns {Team[]} Promise
     */
    async getPageList(params) {
        const page = params.page || 1;
        const size = params.size || 20;
        const from = (page - 1) * size;
        const searchParams = {
            organizationId: params.organizationId,
            deleted: false,
        };
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
     * Get the counts of teams
     * @param  {TeamSearch} params
     * @returns {number} Promise
     */
    async getCount(params) {
        const searchParams = {
            organizationId: params.organizationId,
            deleted: false,
        };
        if (params.search) {
            searchParams['$or'] = [{ name: { $regex: new RegExp(params.search, 'i') } }, { id: params.search }];
        }
        return this.model.countDocuments(searchParams);
    }
}
exports.TeamModel = TeamModel;
