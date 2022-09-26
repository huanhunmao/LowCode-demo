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
exports.AddFunctionDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let AddFunctionDetail = class AddFunctionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create function details
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    async index(ctx, params) {
        // Check the validity of the name
        if (!(0, tools_1.checkName)(params.name)) {
            return Response.warning(app_config_1.i18n.file.invalidName, 2090101);
        }
        try {
            let hasAuth = false;
            if (params.folderId) {
                hasAuth = await this.service.auth.folder(params.folderId, { ctx });
            }
            else {
                hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            }
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4090101);
            }
            if (!params.folderId) {
                params.folderId = await this.service.folder.info.getAppTypeFolderId({
                    applicationId: params.applicationId,
                    type: constant_1.TYPE.FUNCTION,
                });
                if (!params.folderId) {
                    return Response.warning(app_config_1.i18n.folder.invalidFolderId, 2090102);
                }
            }
            const newFileDetail = Object.assign({}, params, { type: constant_1.TYPE.FUNCTION });
            const result = await this.service.file.info.addFileDetail(newFileDetail, {
                ctx,
                actionType: [constant_1.LOG.CREATE, constant_1.TYPE.FUNCTION].join('_'),
            });
            // Check the validity of the application ID
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.app.idInvalid, 2090103);
            }
            // Check if the function exists
            if (result.code === 2) {
                return Response.warning(app_config_1.i18n.file.nameExist, 2090104);
            }
            await this.service.file.info.runTransaction(ctx.transactions);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: result.data.id, type: constant_1.TYPE.FUNCTION });
            return Response.success(result.data || {}, 1090101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.function.addNewFunctionFailed, 3090101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addFunctionDetail,
        description: '',
        tags: ['Function'],
        operationId: 'add-function-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.FileVersionDetailReq]),
    __metadata("design:returntype", Promise)
], AddFunctionDetail.prototype, "index", null);
AddFunctionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('functions'),
    __metadata("design:paramtypes", [])
], AddFunctionDetail);
exports.AddFunctionDetail = AddFunctionDetail;
