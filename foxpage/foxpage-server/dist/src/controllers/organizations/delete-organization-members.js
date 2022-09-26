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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteOrganizationMembers = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const org_validate_types_1 = require("../../types/validates/org-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let DeleteOrganizationMembers = class DeleteOrganizationMembers extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Delete organization member
     * @param  {AddOrgMembersReq} params
     * @returns {Organization}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, {
                method: constant_1.METHOD.DELETE,
                type: constant_1.TYPE.ORGANIZATION,
                organizationId: params.organizationId,
            });
            // Permission check
            const hasAuth = await this.service.auth.organization(params.organizationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4010301);
            }
            this.service.org.updateMembersStatus(params.organizationId, params.userIds, false, { ctx });
            await this.service.org.runTransaction(ctx.transactions);
            const orgInfo = await this.service.org.getDetailById(params.organizationId);
            return Response.success(orgInfo, 1010301);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.org.deletedOrgMemberFailed, 3010301);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/members-status'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.deleteOrgMemberDetail,
        description: '',
        tags: ['Organization'],
        operationId: 'delete-organization-member',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(org_validate_types_1.OrgBaseDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, org_validate_types_1.DeleteOrgMembersReq]),
    __metadata("design:returntype", Promise)
], DeleteOrganizationMembers.prototype, "index", null);
DeleteOrganizationMembers = __decorate([
    (0, routing_controllers_1.JsonController)('organizations'),
    __metadata("design:paramtypes", [])
], DeleteOrganizationMembers);
exports.DeleteOrganizationMembers = DeleteOrganizationMembers;
