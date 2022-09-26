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
exports.SetOrganizationMemberList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const org_validate_types_1 = require("../../types/validates/org-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let SetOrganizationMemberList = class SetOrganizationMemberList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Organization member operations, including joining and exiting
     * @param  {OrgMemberDetailReq} params
     * @returns {Organization}
     */
    async index(ctx, params) {
        const newMembers = params.members || [];
        if (newMembers.length === 0) {
            return Response.warning(app_config_1.i18n.org.invalidMemberList, 2010801);
        }
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.ORGANIZATION, params: params.organizationId });
            // Permission check
            const hasAuth = await this.service.auth.organization(params.organizationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4010801);
            }
            const userIds = lodash_1.default.map(params.members, 'userId');
            // Get all members of the specified organization
            const [sourceOrgDetail, userObject] = await Promise.all([
                this.service.org.getDetailById(params.organizationId),
                this.service.user.getUserBaseObjectByIds(userIds),
            ]);
            const sourceMembers = (sourceOrgDetail === null || sourceOrgDetail === void 0 ? void 0 : sourceOrgDetail.members) || [];
            if (!sourceOrgDetail || sourceOrgDetail.deleted) {
                return Response.warning(app_config_1.i18n.org.invalidOrgId, 2010802);
            }
            // New member data to object
            const sourceDataObject = lodash_1.default.keyBy(sourceMembers, 'userId');
            // Merged member status
            newMembers.map((user) => {
                if (sourceDataObject[user.userId]) {
                    sourceDataObject[user.userId].status = user.status;
                }
                else {
                    sourceDataObject[user.userId] = lodash_1.default.merge(user, {
                        account: userObject[user.userId] || '',
                        joinTime: new Date(),
                    });
                }
            });
            // Update member information
            await this.service.org.updateDetail(params.organizationId, { members: lodash_1.default.toArray(sourceDataObject) });
            // Get organization details
            const orgDetail = await this.service.org.getDetailById(params.organizationId);
            // this.service.log.saveLog({
            //   action: LOG_UPDATE,
            //   category: { id: params.id, type: LOG.CATEGORY_ORGANIZATION },
            //   content: { id: params.id, contentId: '', before: sourceOrgDetail, after: orgDetail },
            // });
            return Response.success(orgDetail, 1010801);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.org.updateOrgMemberFailed, 3010801);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/members'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.orgMemberDetail,
        description: '/organization/members',
        tags: ['Organization'],
        operationId: 'update-organization-member-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(org_validate_types_1.OrgBaseDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, org_validate_types_1.OrgMemberDetailReq]),
    __metadata("design:returntype", Promise)
], SetOrganizationMemberList.prototype, "index", null);
SetOrganizationMemberList = __decorate([
    (0, routing_controllers_1.JsonController)('organizations'),
    __metadata("design:paramtypes", [])
], SetOrganizationMemberList);
exports.SetOrganizationMemberList = SetOrganizationMemberList;
