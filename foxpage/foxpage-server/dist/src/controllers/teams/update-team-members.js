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
exports.SetTeamMemberList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const team_validate_types_1 = require("../../types/validates/team-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let SetTeamMemberList = class SetTeamMemberList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Team member operations, including joining and exiting
     * @param  {TeamMemberDetailReq} params
     * @returns {Team}
     */
    async index(ctx, params) {
        const newMembers = params.members || [];
        if (newMembers.length === 0) {
            return Response.warning(app_config_1.i18n.team.invalidMemberList, 2020701);
        }
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.TEAM });
            // Get all members of the specified team
            const [sourceTeamDetail, sourceMembers] = await Promise.all([
                this.service.team.getDetailById(params.teamId),
                this.service.team.getMembersById(params.teamId),
            ]);
            if (!sourceTeamDetail || sourceTeamDetail.deleted) {
                return Response.warning(app_config_1.i18n.team.invalidTeamId, 2020702);
            }
            // Permission check
            const hasAuth = await this.service.auth.team(params.teamId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4020701);
            }
            // New member data to object
            const sourceDataObject = lodash_1.default.keyBy(sourceMembers, 'userId');
            // Merged member status
            newMembers.map((user) => {
                if (sourceDataObject[user.userId]) {
                    sourceDataObject[user.userId].status = user.status;
                }
                else {
                    sourceDataObject[user.userId] = lodash_1.default.merge(user, { joinTime: new Date() });
                }
            });
            // Update member information
            await this.service.team.updateDetail(params.teamId, {
                members: lodash_1.default.toArray(sourceDataObject),
            });
            // Get team details
            const teamDetail = await this.service.team.getDetailById(params.teamId);
            // this.service.log.saveLog({
            //   action: LOG_UPDATE,
            //   category: { id: teamDetail.organizationId, type: LOG.CATEGORY_ORGANIZATION },
            //   content: { id: teamDetail.id, before: sourceTeamDetail, after: teamDetail },
            // });
            return Response.success(teamDetail, 1020701);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.team.updateTeamMemberFailed, 3020701);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/members'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.teamMemberDetail,
        description: '',
        tags: ['Team'],
        operationId: 'team-member-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(team_validate_types_1.TeamBaseDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, team_validate_types_1.TeamMemberDetailReq]),
    __metadata("design:returntype", Promise)
], SetTeamMemberList.prototype, "index", null);
SetTeamMemberList = __decorate([
    (0, routing_controllers_1.JsonController)('teams'),
    __metadata("design:paramtypes", [])
], SetTeamMemberList);
exports.SetTeamMemberList = SetTeamMemberList;
