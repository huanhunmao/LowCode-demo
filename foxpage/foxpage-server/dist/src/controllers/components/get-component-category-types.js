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
exports.GetComponentCategoryTypes = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const app_validate_types_1 = require("../../types/validates/app-validate-types");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetComponentCategoryTypes = class GetComponentCategoryTypes extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the application's component category types
     * @param  {AppIDReq} params
     * @returns {Content}
     */
    async index(params) {
        var _a;
        try {
            const appDetail = await this.service.application.getDetailById(params.applicationId);
            const componentSetting = ((_a = appDetail === null || appDetail === void 0 ? void 0 : appDetail.setting) === null || _a === void 0 ? void 0 : _a.component) || [];
            let categoryTypeObject = {};
            componentSetting.forEach(item => {
                const categoryType = item.category || {};
                const { categoryName = '', groupName = '' } = categoryType;
                if (!categoryTypeObject[categoryName]) {
                    categoryTypeObject[categoryName] = { categoryName, groupNames: [] };
                }
                if (categoryTypeObject[categoryName].groupNames.indexOf(groupName) === -1) {
                    categoryTypeObject[categoryName].groupNames.push(groupName);
                }
            });
            return Response.success(lodash_1.default.sortBy(lodash_1.default.toArray(categoryTypeObject), ['categoryName', 'groupNames']), 1112601);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.getComponentsCategoryTypeFailed, 3112601);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/category-types'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getComponentsCategoryTypes,
        description: '',
        tags: ['Component'],
        operationId: 'get-components-category-types',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(component_validate_types_1.ComponentCategoryTypesRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_validate_types_1.AppIDReq]),
    __metadata("design:returntype", Promise)
], GetComponentCategoryTypes.prototype, "index", null);
GetComponentCategoryTypes = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], GetComponentCategoryTypes);
exports.GetComponentCategoryTypes = GetComponentCategoryTypes;
