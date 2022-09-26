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
exports.GetOrganizationPageMemberList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const org_validate_types_1 = require("../../types/validates/org-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetOrganizationPageMemberList = class GetOrganizationPageMemberList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get a paginated list of organization members
     * @param  {OrgDetailReq} params
     * @returns {OrgInfo}
     */
    async index(params) {
        try {
            this.service.org.setPageSize(params);
            const from = (params.page - 1) * params.size;
            const orgDetail = await this.service.org.getDetailById(params.organizationId);
            // Filter the effective members, get the member list of the current page number
            const allMembers = lodash_1.default.filter(orgDetail.members || [], ['status', true]);
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
                    page: params.page || 1,
                    size: params.size || 20,
                    total: allMembers.length || 0,
                },
                data: memberList || [],
            }, 1010401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.org.getOrgMemberListFailed, 3010401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/member-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getOrgPageMembersList,
        description: '',
        tags: ['Organization'],
        operationId: 'get-organization-page-members-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(org_validate_types_1.OrgDetailRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [org_validate_types_1.GetOrgMembersReq]),
    __metadata("design:returntype", Promise)
], GetOrganizationPageMemberList.prototype, "index", null);
GetOrganizationPageMemberList = __decorate([
    (0, routing_controllers_1.JsonController)('organizations'),
    __metadata("design:paramtypes", [])
], GetOrganizationPageMemberList);
exports.GetOrganizationPageMemberList = GetOrganizationPageMemberList;
