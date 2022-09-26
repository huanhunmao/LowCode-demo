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
exports.AddMockDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let AddMockDetail = class AddMockDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create mock details
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    async index(ctx, params) {
        var _a, _b, _c, _d;
        // Check the validity of the name
        if (!(0, tools_1.checkName)(params.name)) {
            return Response.warning(app_config_1.i18n.file.invalidName, 2190101);
        }
        try {
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4190101);
            }
            if (!params.folderId) {
                params.folderId = await this.service.folder.info.getAppTypeFolderId({
                    applicationId: params.applicationId,
                    type: constant_1.TYPE.MOCK,
                });
                if (!params.folderId) {
                    return Response.warning(app_config_1.i18n.folder.invalidFolderId, 2190102);
                }
            }
            const newFileDetail = Object.assign({}, params, { type: constant_1.TYPE.MOCK });
            const result = await this.service.file.info.addFileDetail(newFileDetail, {
                ctx,
                actionType: [constant_1.LOG.CREATE, constant_1.TYPE.MOCK].join('_'),
            });
            // Check the validity of the application ID
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.app.idInvalid, 2190103);
            }
            if (result.code === 2) {
                return Response.warning(app_config_1.i18n.file.nameExist, 2190104);
            }
            // binding to content
            if (params.contentId) {
                this.service.content.tag.updateExtensionTag(params.contentId, { mockId: ((_a = result.data) === null || _a === void 0 ? void 0 : _a.contentId) || '' }, { ctx });
            }
            await this.service.file.info.runTransaction(ctx.transactions);
            const fileDetail = await this.service.file.info.getDetailById(((_b = result.data) === null || _b === void 0 ? void 0 : _b.id) || '');
            ctx.logAttr = Object.assign(ctx.logAttr, { id: (_c = result.data) === null || _c === void 0 ? void 0 : _c.id, type: constant_1.TYPE.MOCK });
            return Response.success(Object.assign({ contentId: (_d = result.data) === null || _d === void 0 ? void 0 : _d.contentId }, fileDetail), 1080101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.mock.addNewMockFailed, 3190101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addMockDetail,
        description: '',
        tags: ['Mock'],
        operationId: 'add-mock-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.AddMockReq]),
    __metadata("design:returntype", Promise)
], AddMockDetail.prototype, "index", null);
AddMockDetail = __decorate([
    (0, routing_controllers_1.JsonController)('mocks'),
    __metadata("design:paramtypes", [])
], AddMockDetail);
exports.AddMockDetail = AddMockDetail;
