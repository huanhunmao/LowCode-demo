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
exports.OrgService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Model = __importStar(require("../models"));
const base_service_1 = require("./base-service");
const Service = __importStar(require("./index"));
class OrgService extends base_service_1.BaseService {
    constructor() {
        super(Model.org);
    }
    /**
     * Single instance
     * @returns OrgService
     */
    static getInstance() {
        this._instance || (this._instance = new OrgService());
        return this._instance;
    }
    /**
     * Get user organization list
     * @param userId
     * @returns
     */
    async getUserOrg(userId) {
        const orgList = await this.find({ 'members.userId': userId, 'members.status': true });
        return lodash_1.default.map(orgList, org => lodash_1.default.pick(org, ['id', 'name']));
    }
    /**
     * Get organization paging data
     * @param  {Search} params
     * @returns {PageList<OrgInfo>} Promise
     */
    async getPageList(params) {
        Service.application.setPageSize(params);
        const [orgList, orgCount] = await Promise.all([
            Model.org.getPageList(params),
            Model.org.getCount(params),
        ]);
        // Get user information corresponding to the organization
        const newOrgList = await this.replaceOrgUserInfo(orgList);
        return {
            pageInfo: { page: params.page || 1, size: params.size || 20, total: orgCount },
            data: newOrgList,
        };
    }
    /**
     * Obtain information about the creator and organization member of the
     * replacement organization through the organization details
     * @param  {Organization[]} orgList
     * @returns {OrgInfo[]} Promise
     */
    async replaceOrgUserInfo(orgList) {
        if (orgList.length === 0) {
            return [];
        }
        let userIds = [];
        orgList.forEach((org) => {
            userIds = lodash_1.default.merge(userIds, org.creator, lodash_1.default.map(org.members, 'userId'));
        });
        // Get user information
        const userObject = await Service.user.getUserBaseObjectByIds(userIds);
        let newOrgList = [];
        orgList.map((org) => {
            const orgItem = Object.assign(lodash_1.default.omit(org, 'creator'), {
                creator: userObject[org.creator],
            });
            if (orgItem.members && orgItem.members.length > 0) {
                orgItem.members.map((member) => {
                    member.account = userObject[member.userId].account;
                });
            }
            newOrgList.push(orgItem);
        });
        return newOrgList;
    }
    /**
     * Get a list of members of the specified organization
     * @param  {string} id
     * @returns {Member[]} Promise
     */
    async getMembersById(id) {
        const orgDetail = await this.getDetailById(id);
        return orgDetail && orgDetail.members ? orgDetail.members : [];
    }
    /**
     * Get the organization information to which the specified user belongs
     * @param  {string} userId
     * @returns Promise
     */
    async getUserOrgById(userId) {
        const orgList = await this.getUserOrg(userId);
        return orgList[0] || {};
    }
    /**
     * Check user info in org members
     * @param organizationId
     * @param userId
     * @returns
     */
    async checkUserIdInOrg(organizationId, userId) {
        var _a;
        let orgMember = {};
        const orgDetail = await this.getDetailById(organizationId);
        if (orgDetail && !orgDetail.deleted) {
            (_a = orgDetail.members) === null || _a === void 0 ? void 0 : _a.map(member => {
                if (member.userId === userId) {
                    orgMember = member;
                }
            });
        }
        return orgMember;
    }
    /**
     * Check whether the specified user is in the specified organization, the current user is the default
     * @param  {string} organizationId
     * @returns Promise
     */
    async checkUserInOrg(organizationId, userId) {
        const memberUser = await this.checkUserIdInOrg(organizationId, userId);
        return memberUser.status === true;
    }
    /**
     * Check if the component id exists
     * @param  {string} organizationId
     * @returns Promise
     */
    async checkOrgValid(organizationId) {
        const orgDetail = await this.getDetailById(organizationId);
        return orgDetail && orgDetail.deleted === false;
    }
    /**
     * Add new organization user
     * @param  {string} organizationId
     * @param  {string[]} userIds
     * @returns Member
     */
    addNewMembers(organizationId, userIds, options) {
        const members = userIds.map((userId) => {
            return { userId, status: true, joinTime: new Date() };
        });
        if (organizationId && members.length > 0) {
            options.ctx.transactions.push(Model.org.updateDetailQuery(organizationId, { $push: { members } }));
        }
        return members;
    }
    /**
     * Update the status of organization members
     * @param  {string} organizationId
     * @param  {string[]} userIds
     * @param  {boolean} status
     */
    updateMembersStatus(organizationId, userIds, status, options) {
        options.ctx.transactions.push(Model.org.batchUpdateDetailQuery({ id: organizationId, 'members.userId': { $in: userIds } }, {
            $set: { 'members.$.status': status },
        }));
    }
}
exports.OrgService = OrgService;
