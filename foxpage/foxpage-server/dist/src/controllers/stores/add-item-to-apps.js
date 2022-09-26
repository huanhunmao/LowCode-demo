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
exports.AddStorePageItemToApplication = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const store_validate_types_1 = require("../../types/validates/store-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let AddStorePageItemToApplication = class AddStorePageItemToApplication extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Add the store variable, condition, function products to the specified application
     * @param  {GetPageTemplateListReq} params
     * @returns {GetPageTemplateListRes}
     */
    async index(ctx, params) {
        var _a;
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.RESOURCE });
            // Check permission
            const hasAuth = await Promise.all(params.appIds.map((appId) => this.service.auth.application(appId, { ctx })));
            if (hasAuth.indexOf(false) !== -1) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny);
            }
            // Check the status of the goods
            const goodsList = await this.service.store.goods.getDetailByIds(params.goodsIds);
            if (goodsList.length === 0) {
                return Response.warning(app_config_1.i18n.store.invalidGoodsIds, 2130301);
            }
            const invalidGoods = lodash_1.default.filter(goodsList, (goods) => {
                return goods.status === 0 || goods.deleted;
            });
            if (invalidGoods.length > 0) {
                return Response.warning(app_config_1.i18n.store.invalidGoods + lodash_1.default.map(invalidGoods, 'name').join(','), 2130302);
            }
            // Get the file details corresponding to the goods
            const goodsFileIds = lodash_1.default.map(lodash_1.default.map(goodsList, 'details'), 'id');
            const goodsFileObject = lodash_1.default.keyBy(goodsList, 'details.id');
            const goodsFileList = await this.service.file.list.getDetailByIds(goodsFileIds);
            const appTypeFolderObject = await this.service.folder.info.getAppsTypeFolderId({
                applicationIds: params.appIds,
                type: params.type,
            });
            // Add the file corresponding to the goods to the application
            let goodsOrders = [];
            for (const file of goodsFileList) {
                for (const appId of params.appIds) {
                    // Create file, content, version
                    await this.service.file.info.copyFile(file.id, appId, {
                        ctx,
                        folderId: appTypeFolderObject[appId],
                        hasLive: true,
                        setLive: true,
                    });
                    // Add goods order
                    goodsOrders.push({
                        id: (0, tools_1.generationId)(constant_1.PRE.ORDER),
                        goodsId: ((_a = goodsFileObject === null || goodsFileObject === void 0 ? void 0 : goodsFileObject[file.id]) === null || _a === void 0 ? void 0 : _a.id) || '',
                        goodsVersionId: '',
                        customer: {
                            id: file.id,
                            applicationId: appId,
                            userId: ctx.userInfo.id,
                        },
                        delivery: constant_1.TAG.DELIVERY_CLONE,
                    });
                }
            }
            if (goodsOrders.length > 0) {
                ctx.transactions.push(this.service.store.order.addDetailQuery(goodsOrders));
            }
            await this.service.store.goods.runTransaction(ctx.transactions);
            return Response.success(app_config_1.i18n.store.addGoodsToAppSuccess, 1130301);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.store.addStorePageToApplicationFailed, 3130301);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/items'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addStorePagesToApplications,
        description: '',
        tags: ['Store'],
        operationId: 'add-store-pages-item-to-applications',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(store_validate_types_1.GetPageTemplateListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, store_validate_types_1.AddGoodsItemTpApplicationReq]),
    __metadata("design:returntype", Promise)
], AddStorePageItemToApplication.prototype, "index", null);
AddStorePageItemToApplication = __decorate([
    (0, routing_controllers_1.JsonController)('stores'),
    __metadata("design:paramtypes", [])
], AddStorePageItemToApplication);
exports.AddStorePageItemToApplication = AddStorePageItemToApplication;
