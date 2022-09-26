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
exports.UpdatePageDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let UpdatePageDetail = class UpdatePageDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update file details, only file name and introduction can be updated
     * @param  {UpdateFileDetailReq} params
     * @returns {File}
     */
    async index(ctx, params) {
        // Check the validity of the name
        if (!(0, tools_1.checkName)(params.name)) {
            return Response.warning(app_config_1.i18n.file.invalidPageName, 2051801);
        }
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.PAGE });
            const hasAuth = await this.service.auth.file(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4051801);
            }
            const result = await this.service.file.info.updateFileDetail(params, {
                ctx,
                actionType: [constant_1.LOG.UPDATE, constant_1.TYPE.PAGE].join('_'),
            });
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.page.invalidPageId, 2051803);
            }
            if (result.code === 2) {
                return Response.warning(app_config_1.i18n.page.pageNameExist, 2051803);
            }
            // Check if the path of the file already exists
            if (result.code === 3) {
                return Response.warning(app_config_1.i18n.file.pathNameExist, 2051804);
            }
            await this.service.file.info.runTransaction(ctx.transactions);
            // Get file details
            const pageDetail = await this.service.file.info.getDetailById(params.id);
            return Response.success(pageDetail, 1051801);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.file.updateFailed, 3051801);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updatePageDetail,
        description: '',
        tags: ['Page'],
        operationId: 'update-page-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.UpdateFileDetailReq]),
    __metadata("design:returntype", Promise)
], UpdatePageDetail.prototype, "index", null);
UpdatePageDetail = __decorate([
    (0, routing_controllers_1.JsonController)('pages'),
    __metadata("design:paramtypes", [])
], UpdatePageDetail);
exports.UpdatePageDetail = UpdatePageDetail;
