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
exports.AddPageContentDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let AddPageContentDetail = class AddPageContentDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * New page content details
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    async index(ctx, params) {
        try {
            // Check permission
            const hasAuth = await this.service.auth.file(params.fileId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4050101);
            }
            // Check if the name already exists
            const nameExist = await this.service.content.check.checkExist({
                title: params.title,
                fileId: params.fileId,
                deleted: false,
            });
            if (nameExist) {
                return Response.warning(app_config_1.i18n.page.pageNameExist, 2050101);
            }
            !params.tags && (params.tags = []);
            const contentParams = {
                title: params.title,
                fileId: params.fileId,
                tags: params.tags,
            };
            // add special filed to tag
            if (params.isBase) {
                params.tags.push({ isBase: params.isBase });
            }
            if (params.extendId) {
                params.tags.push({ extendId: params.extendId });
            }
            const contentDetail = this.service.content.info.addContentDetail(contentParams, {
                ctx,
                content: { relation: {}, schemas: [] },
                type: constant_1.TYPE.PAGE,
                actionType: [constant_1.LOG.CREATE, constant_1.TYPE.PAGE].join('_'),
            });
            await this.service.content.info.runTransaction(ctx.transactions);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: contentDetail.id, type: constant_1.TYPE.PAGE });
            return Response.success(contentDetail, 1050101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.page.addNewPageContentFailed, 3050101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/contents'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addPageContentDetail,
        description: '',
        tags: ['Page'],
        operationId: 'add-page-content-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentBaseDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, content_validate_types_1.AddContentReq]),
    __metadata("design:returntype", Promise)
], AddPageContentDetail.prototype, "index", null);
AddPageContentDetail = __decorate([
    (0, routing_controllers_1.JsonController)('pages'),
    __metadata("design:paramtypes", [])
], AddPageContentDetail);
exports.AddPageContentDetail = AddPageContentDetail;
