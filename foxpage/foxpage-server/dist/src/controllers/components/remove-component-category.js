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
exports.RemoveComponentCategory = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let RemoveComponentCategory = class RemoveComponentCategory extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Delete component category
     * @param  {AppIDReq} params
     * @returns {Content}
     */
    async index(ctx, params) {
        try {
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx, mask: 1 });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4112701);
            }
            // Validate component file
            const fileDetail = await this.service.file.info.getDetailById(params.id);
            if (!fileDetail || fileDetail.deleted || fileDetail.type !== constant_1.TYPE.COMPONENT) {
                return Response.warning(app_config_1.i18n.component.invalidFileId, 2112701);
            }
            const fileTags = lodash_1.default.reject(fileDetail.tags, { type: constant_1.TAG.COMPONENT_CATEGORY });
            await this.service.file.info.updateDetail(params.id, { tags: fileTags });
            return Response.success(Object.assign({}, fileDetail, { tags: fileTags }), 1112701);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.removeComponentsCategoryFailed, 3112701);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Delete)('/category'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.removeComponentsCategory,
        description: '',
        tags: ['Component'],
        operationId: 'remove-components-category',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, component_validate_types_1.DeleteComponentCategoryReq]),
    __metadata("design:returntype", Promise)
], RemoveComponentCategory.prototype, "index", null);
RemoveComponentCategory = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], RemoveComponentCategory);
exports.RemoveComponentCategory = RemoveComponentCategory;
