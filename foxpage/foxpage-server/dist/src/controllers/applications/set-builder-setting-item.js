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
exports.UpdateApplicationSettingDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const app_validate_types_1 = require("../../types/validates/app-validate-types");
const index_validate_types_1 = require("../../types/validates/index-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let UpdateApplicationSettingDetail = class UpdateApplicationSettingDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update application builder setting detail
     * @param  {ResponseBase} params
     * @returns Application
     */
    async index(ctx, params) {
        var _a;
        try {
            // Permission check
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx, mask: 1 });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4031201);
            }
            // Check setting type id
            const typeList = await this.service.file.list.find({
                id: { $in: lodash_1.default.map(params.setting, 'id') },
                deleted: false,
            });
            const invalidType = lodash_1.default.find(typeList, (type) => type.type !== params.type);
            if (invalidType) {
                return Response.warning(app_config_1.i18n.app.invalidType, 2031201);
            }
            const settingItemDetail = await this.service.application.getDetailById(params.applicationId);
            const typeSettingList = ((_a = settingItemDetail.setting) === null || _a === void 0 ? void 0 : _a[params.type]) || [];
            for (const item of params.setting) {
                const itemDetail = lodash_1.default.find(typeSettingList, { id: item.id });
                if (!itemDetail || lodash_1.default.isEmpty(itemDetail)) {
                    this.service.application.addAppSetting({
                        applicationId: params.applicationId,
                        type: params.type,
                        typeId: item.id,
                        typeName: item.name || '',
                        typeStatus: item.status || false,
                        category: item.category || {},
                    }, { ctx });
                }
                else {
                    this.service.application.updateAppSetting({
                        applicationId: params.applicationId,
                        type: params.type,
                        typeId: item.id,
                        setting: Object.assign({}, item, {
                            name: item.name || itemDetail.name,
                            category: item.category || itemDetail.category,
                            status: !lodash_1.default.isNil(item.status) ? item.status : itemDetail.status,
                        }),
                    }, itemDetail, { ctx });
                }
            }
            await this.service.application.runTransaction(ctx.transactions);
            return Response.success(app_config_1.i18n.app.updateSettingDetailSuccess, 1031201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.app.updateSettingDetailFailed, 3031201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/builder-setting'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateBuilderSetting,
        description: '',
        tags: ['Application'],
        operationId: 'update-builder-setting',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(index_validate_types_1.ResponseBase),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, app_validate_types_1.AppSettingDetailReq]),
    __metadata("design:returntype", Promise)
], UpdateApplicationSettingDetail.prototype, "index", null);
UpdateApplicationSettingDetail = __decorate([
    (0, routing_controllers_1.JsonController)('applications'),
    __metadata("design:paramtypes", [])
], UpdateApplicationSettingDetail);
exports.UpdateApplicationSettingDetail = UpdateApplicationSettingDetail;
