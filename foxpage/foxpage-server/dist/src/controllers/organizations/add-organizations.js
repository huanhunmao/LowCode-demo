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
exports.AddOrganizationDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const org_validate_types_1 = require("../../types/validates/org-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let AddOrganizationDetail = class AddOrganizationDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create organization details
     * @param  {AddOrgDetailReq} params
     * @param  {Header} headers
     * @returns {Organization}
     */
    async index(ctx, params) {
        try {
            const newOrganization = {
                id: (0, tools_1.generationId)(constant_1.PRE.ORGANIZATION),
                name: params.name,
                creator: ctx.userInfo.id,
            };
            await this.service.org.addDetail(newOrganization);
            // Get organization details
            const orgDetail = await this.service.org.getDetailById(newOrganization.id);
            ctx.logAttr = Object.assign(ctx.logAttr, {
                id: newOrganization.id,
                type: constant_1.TYPE.ORGANIZATION,
                organizationId: newOrganization.id,
            });
            // Save logs
            // this.service.log.saveLog({
            //   action: LOG.CREATE,
            //   category: { id: newOrganization.id, type: LOG.CATEGORY_ORGANIZATION },
            //   content: { id: newOrganization.id, contentId: '', before: {}, after: orgDetail },
            // });
            return Response.success(orgDetail, 1010201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.org.addOrgFailed, 3010201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addOrgDetail,
        description: '',
        tags: ['Organization'],
        operationId: 'add-organization-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(org_validate_types_1.OrgBaseDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, org_validate_types_1.AddOrgDetailReq]),
    __metadata("design:returntype", Promise)
], AddOrganizationDetail.prototype, "index", null);
AddOrganizationDetail = __decorate([
    (0, routing_controllers_1.JsonController)('organizations'),
    __metadata("design:paramtypes", [])
], AddOrganizationDetail);
exports.AddOrganizationDetail = AddOrganizationDetail;
