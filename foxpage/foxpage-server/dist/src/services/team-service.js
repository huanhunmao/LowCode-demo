"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Model = __importStar(require("../models"));
const base_service_1 = require("./base-service");
const Service = __importStar(require("./index"));
class TeamService extends base_service_1.BaseService {
    constructor() {
        super(Model.team);
    }
    /**
     * Single instance
     * @returns TeamService
     */
    static getInstance() {
        this._instance || (this._instance = new TeamService());
        return this._instance;
    }
    /**
     * Check if the team already exists
     * @param  {SearchTeamExist} params
     * @returns {boolean} Promise
     */
    async checkTeamExist(params) {
        const team = await this.model.findOne({
            name: params.name,
            organizationId: params.organizationId,
            deleted: false,
        });
        return team !== null;
    }
    /**
     * Get team paging data
     * @param  {TeamSearch} params
     * @returns {PageList<TeamInfo>} Promise
     */
    async getPageList(params) {
        Service.team.setPageSize(params);
        const [teamList, teamCount] = await Promise.all([
            Model.team.getPageList(params),
            Model.team.getCount(params),
        ]);
        // Get user information corresponding to the organization
        let pageTeamList = [];
        if (teamList.length > 0) {
            // Get the UserId including the members of the organization creator
            const userIds = lodash_1.default.map(teamList, 'creator');
            // Get user information
            const userObject = await Service.user.getUserBaseObjectByIds(userIds);
            // Filter out effective members and count
            pageTeamList = teamList.map((team) => {
                return Object.assign(lodash_1.default.omit(team, 'creator', 'members'), {
                    creator: userObject[team.creator],
                    memberCount: lodash_1.default.filter(team.members, ['status', true]).length || 0,
                });
            });
        }
        return { count: teamCount, list: pageTeamList };
    }
    /**
     * Get a list of members of the specified team
     * @param  {string} id
     * @returns {Member[]} Promise
     */
    async getMembersById(id) {
        const teamDetail = await this.model.findOne({ id });
        return (teamDetail === null || teamDetail === void 0 ? void 0 : teamDetail.members) || [];
    }
    /**
     * Update the status of team members
     * @param  {string} teamId
     * @param  {string[]} userIds
     * @param  {boolean} status
     */
    updateMembersStatus(teamId, userIds, options) {
        const status = options.status || false;
        options.ctx.transactions.push(Model.team.batchUpdateDetailQuery({ id: teamId, 'members.userId': { $in: userIds } }, {
            $set: { 'members.$.status': status },
        }));
    }
}
exports.TeamService = TeamService;
