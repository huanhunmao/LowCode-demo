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
exports.GetTeamMemberList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const team_validate_types_1 = require("../../types/validates/team-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetTeamMemberList = class GetTeamMemberList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get a paginated list of team members
     * @param  {TeamListReq} params
     * @returns {TeamInfo}
     */
    async index(params) {
        try {
            this.service.team.setPageSize(params);
            const from = (params.page - 1) * params.size;
            const teamDetail = await this.service.team.getDetailById(params.teamId);
            // Filter the effective members, get the member list of the current page number
            const allMembers = lodash_1.default.filter(teamDetail.members || [], ['status', true]);
            const pageMembers = lodash_1.default.slice(allMembers, from, from + params.size);
            let memberList = [];
            if (pageMembers.length > 0) {
                const memberObject = await this.service.user.getUserBaseObjectByIds(lodash_1.default.map(pageMembers, 'userId'));
                memberList = pageMembers.map((member) => {
                    var _a;
                    return Object.assign({ account: ((_a = memberObject[member.userId]) === null || _a === void 0 ? void 0 : _a.account) || '' }, member);
                });
            }
            return Response.success({
                pageInfo: {
                    total: allMembers.length || 0,
                    page: params.page,
                    size: params.size,
                },
                data: memberList,
            }, 1020401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.team.getTeamMemberListFailed, 3020401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/member-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getTeamMemberList,
        description: '',
        tags: ['Team'],
        operationId: 'get-team-member-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(team_validate_types_1.TeamListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [team_validate_types_1.GetTeamMemberListReq]),
    __metadata("design:returntype", Promise)
], GetTeamMemberList.prototype, "index", null);
GetTeamMemberList = __decorate([
    (0, routing_controllers_1.JsonController)('teams'),
    __metadata("design:paramtypes", [])
], GetTeamMemberList);
exports.GetTeamMemberList = GetTeamMemberList;
