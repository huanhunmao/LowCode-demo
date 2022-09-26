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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTeamMembers = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const team_validate_types_1 = require("../../types/validates/team-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let AddTeamMembers = class AddTeamMembers extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Add team members
     * @param  {AddDeleteTeamMembers} params
     * @returns {Team}
     */
    async index(ctx, params) {
        var _a;
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.TEAM });
            // Check permissions
            const hasAuth = await this.service.auth.team(params.teamId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4020101);
            }
            // Check the validity of members
            const [userList, memberList] = await Promise.all([
                this.service.user.getDetailByIds(params.userIds),
                this.service.team.find({ id: params.teamId, 'members.userId': { $in: params.userIds } }, 'members.userId'),
            ]);
            const userIds = lodash_1.default.map(userList, 'id');
            const invalidUserIds = lodash_1.default.difference(params.userIds, userIds);
            userList.forEach((user) => {
                if (user.deleted) {
                    invalidUserIds.push(user.id);
                }
            });
            if (invalidUserIds.length > 0) {
                return Response.warning(app_config_1.i18n.user.invalidUser + ':' + invalidUserIds.join(','), 2020101);
            }
            const teamMemberIds = lodash_1.default.map((_a = memberList[0]) === null || _a === void 0 ? void 0 : _a.members, 'userId');
            const existUserIds = lodash_1.default.intersection(params.userIds, teamMemberIds);
            let members = [];
            lodash_1.default.difference(params.userIds, teamMemberIds).forEach((userId) => {
                members.push({
                    userId: userId,
                    joinTime: new Date(),
                    status: true,
                });
            });
            if (existUserIds.length > 0) {
                ctx.transactions.push(this.service.team.batchUpdateDetailQuery({ id: params.teamId, 'members.userId': { $in: existUserIds } }, { $set: { 'members.$.status': true } }));
            }
            ctx.transactions.push(this.service.team.updateDetailQuery(params.teamId, { $push: { members } }));
            await this.service.team.runTransaction(ctx.transactions);
            const teamInfo = await this.service.team.getDetailById(params.teamId);
            return Response.success(teamInfo, 1020101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.team.addTeamMembersFailed, 3020101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/members'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addTeamMembers,
        description: '',
        tags: ['Team'],
        operationId: 'add-team-members',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(team_validate_types_1.TeamBaseDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, team_validate_types_1.AddDeleteTeamMembers]),
    __metadata("design:returntype", Promise)
], AddTeamMembers.prototype, "index", null);
AddTeamMembers = __decorate([
    (0, routing_controllers_1.JsonController)('teams'),
    __metadata("design:paramtypes", [])
], AddTeamMembers);
exports.AddTeamMembers = AddTeamMembers;
