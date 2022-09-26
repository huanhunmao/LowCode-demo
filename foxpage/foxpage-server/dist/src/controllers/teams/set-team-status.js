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
exports.UpdateTeamDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const team_validate_types_1 = require("../../types/validates/team-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let UpdateTeamDetail = class UpdateTeamDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Set team deletion status
     * @param  {TeamStatusReq} params
     * @returns {Team}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.DELETE, type: constant_1.TYPE.TEAM });
            // Get team details
            const sourceTeamDetail = await this.service.team.getDetailById(params.teamId);
            if (!sourceTeamDetail || sourceTeamDetail.deleted) {
                return Response.warning(app_config_1.i18n.team.invalidTeamId, 2020601);
            }
            // Permission check
            const hasAuth = await this.service.auth.team(params.teamId, { ctx, mask: 8 });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4020601);
            }
            // TODO: Check whether the pre-conditions are met,
            // the current condition is that there are no members under the team
            let validUsers = undefined;
            if (sourceTeamDetail.members && sourceTeamDetail.members.length > 0) {
                validUsers = lodash_1.default.find(sourceTeamDetail.members, { status: true });
            }
            if (validUsers) {
                return Response.warning(app_config_1.i18n.team.memberNotEmpty, 2020602);
            }
            // Set deletion status
            const status = lodash_1.default.isNil(params.status) ? !!params.status : true;
            await this.service.team.updateDetail(params.teamId, { deleted: status });
            const teamDetail = await this.service.team.getDetailById(params.teamId);
            return Response.success(teamDetail, 1020601);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.team.updateTeamFailed, 3020601);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/status'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.deleteTeamDeleteDetail,
        description: '',
        tags: ['Team'],
        operationId: 'set-team-status',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(team_validate_types_1.TeamBaseDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, team_validate_types_1.TeamStatusReq]),
    __metadata("design:returntype", Promise)
], UpdateTeamDetail.prototype, "index", null);
UpdateTeamDetail = __decorate([
    (0, routing_controllers_1.JsonController)('teams'),
    __metadata("design:paramtypes", [])
], UpdateTeamDetail);
exports.UpdateTeamDetail = UpdateTeamDetail;
