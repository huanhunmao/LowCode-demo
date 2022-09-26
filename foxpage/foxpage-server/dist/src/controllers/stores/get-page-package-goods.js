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
exports.GetStorePackageList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const store_validate_types_1 = require("../../types/validates/store-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetStorePackageList = class GetStorePackageList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the pagination data of store packages
     * @param  {GetPackageListReq} params
     * @returns {GetPageTemplateListRes}
     */
    async index(ctx, params) {
        try {
            this.service.store.goods.setPageSize(params);
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            if (!params.type) {
                params.type = constant_1.TYPE.PACKAGE;
            }
            // Get store paging data
            const pageData = await this.service.store.goods.getPageList(params);
            const pagePackageList = pageData.list;
            let packageList = [];
            if (pagePackageList.length > 0) {
                let userIds = [];
                let applicationIds = [];
                pagePackageList &&
                    pagePackageList.forEach((pkg) => {
                        var _a, _b;
                        userIds.push(((_a = pkg === null || pkg === void 0 ? void 0 : pkg.details) === null || _a === void 0 ? void 0 : _a.creator) || '');
                        applicationIds.push(((_b = pkg === null || pkg === void 0 ? void 0 : pkg.details) === null || _b === void 0 ? void 0 : _b.applicationId) || '');
                    });
                const [userObject, applicationList] = await Promise.all([
                    this.service.user.getUserBaseObjectByIds(userIds),
                    this.service.application.getDetailByIds(applicationIds),
                ]);
                const applicationObject = lodash_1.default.keyBy(applicationList, 'id');
                pagePackageList.forEach((pkg) => {
                    var _a;
                    packageList.push(Object.assign({
                        application: lodash_1.default.pick(applicationObject[pkg.details.applicationId] || {}, ['id', 'name']),
                        creator: userObject[((_a = pkg.details) === null || _a === void 0 ? void 0 : _a.creator) || ''] || {},
                    }, pkg));
                });
            }
            return Response.success({
                pageInfo: {
                    total: pageData.count || 0,
                    page: params.page,
                    size: params.size,
                },
                data: packageList || [],
            }, 1130501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.store.getStorePageListFailed, 3130501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/package-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getStorePackageList,
        description: '',
        tags: ['Store'],
        operationId: 'get-store-package-page-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(store_validate_types_1.GetPageTemplateListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, store_validate_types_1.GetPackageListReq]),
    __metadata("design:returntype", Promise)
], GetStorePackageList.prototype, "index", null);
GetStorePackageList = __decorate([
    (0, routing_controllers_1.JsonController)('stores'),
    __metadata("design:paramtypes", [])
], GetStorePackageList);
exports.GetStorePackageList = GetStorePackageList;
