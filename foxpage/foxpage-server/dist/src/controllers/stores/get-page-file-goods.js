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
exports.GetStoreFileGoodsList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const store_validate_types_1 = require("../../types/validates/store-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetStoreFileGoodsList = class GetStoreFileGoodsList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the data of the store file goods paged list
     * @param  {GetPageTemplateListReq} params
     * @returns {GetPageTemplateListRes}
     */
    async index(ctx, params) {
        try {
            this.service.store.goods.setPageSize(params);
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            // Get store paging data
            const pageData = await this.service.store.goods.getPageList(params);
            // Get the original application Name of the product
            const goodsList = lodash_1.default.cloneDeep(pageData.list);
            if (goodsList.length > 0) {
                const goodsDetailList = lodash_1.default.map(goodsList, 'details');
                const appIds = lodash_1.default.uniq(lodash_1.default.map(goodsDetailList, 'applicationId'));
                const userIds = lodash_1.default.uniq(lodash_1.default.map(goodsDetailList, 'creator'));
                const [appList, userObject] = await Promise.all([
                    this.service.application.getDetailByIds(appIds),
                    this.service.user.getUserBaseObjectByIds(userIds),
                ]);
                const appObject = lodash_1.default.keyBy(appList, 'id');
                goodsList.forEach((goods) => {
                    var _a;
                    if (goods.details) {
                        goods.details.applicationName = ((_a = appObject === null || appObject === void 0 ? void 0 : appObject[goods.details.applicationId]) === null || _a === void 0 ? void 0 : _a.name) || '';
                        goods.creator = userObject[goods.details.creator] || '';
                        goods.application = {
                            id: goods.details.applicationId,
                            name: goods.details.applicationName,
                        };
                    }
                });
            }
            return Response.success({
                pageInfo: {
                    total: pageData.count,
                    page: params.page,
                    size: params.size,
                },
                data: goodsList,
            }, 1130401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.store.getStorePageListFailed, 3130401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/goods-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getStoreFileGoodsList,
        description: '',
        tags: ['Store'],
        operationId: 'get-store-file-page-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(store_validate_types_1.GetPageTemplateListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, store_validate_types_1.GetFileListReq]),
    __metadata("design:returntype", Promise)
], GetStoreFileGoodsList.prototype, "index", null);
GetStoreFileGoodsList = __decorate([
    (0, routing_controllers_1.JsonController)('stores'),
    __metadata("design:paramtypes", [])
], GetStoreFileGoodsList);
exports.GetStoreFileGoodsList = GetStoreFileGoodsList;
