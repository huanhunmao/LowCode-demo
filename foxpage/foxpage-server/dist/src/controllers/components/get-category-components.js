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
exports.GetCategoryComponents = void 0;
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
let GetCategoryComponents = class GetCategoryComponents extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get had set category's components in application
     * @param  {GetCategoryComponentReq} params
     * @returns {Content}
     */
    async index(params) {
        try {
            this.service.folder.info.setPageSize(params);
            const componentPageData = await this.service.component.getPageCategoryComponents(params);
            let componentCategory = [];
            if (componentPageData.list && componentPageData.list.length > 0) {
                componentPageData.list.forEach(component => {
                    componentCategory.push(Object.assign({}, component, { category: lodash_1.default.find(component.tags || [], { type: constant_1.TAG.COMPONENT_CATEGORY }) || {} }));
                });
            }
            return Response.success({
                data: componentCategory,
                pageInfo: {
                    page: params.page,
                    size: params.size,
                    total: componentPageData.count,
                },
            }, 1112501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.getCategoryComponentsFailed, 3112501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/category'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getCategoryComponents,
        description: '',
        tags: ['Component'],
        operationId: 'get-category-components',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [component_validate_types_1.GetCategoryComponentReq]),
    __metadata("design:returntype", Promise)
], GetCategoryComponents.prototype, "index", null);
GetCategoryComponents = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], GetCategoryComponents);
exports.GetCategoryComponents = GetCategoryComponents;
