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
exports.AddGoodsToStore = void 0;
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
let AddGoodsToStore = class AddGoodsToStore extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Add file to the store
     * @param  {AddGoodsToStoreReq} params
     * @returns {GetPageTemplateListRes}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.GOODS });
            // Check permissions
            const hasAuth = await this.service.auth.file(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4130101);
            }
            // Check if the target has been added to the store
            const [goodsDetail, fileDetail, fileContentList] = await Promise.all([
                this.service.store.goods.getDetailByTypeId(params.id),
                this.service.file.info.getDetailById(params.id),
                this.service.content.list.getFileContentList([params.id]),
            ]);
            // online
            if (goodsDetail && goodsDetail.status === 1) {
                return Response.warning(app_config_1.i18n.store.goodsExist, 2130101);
            }
            if (!fileDetail || fileDetail.deleted) {
                return Response.warning(app_config_1.i18n.store.invalidTypeId, 2130102);
            }
            const contentLiveNumbers = lodash_1.default.pull(lodash_1.default.map((fileContentList === null || fileContentList === void 0 ? void 0 : fileContentList[params.id]) || [], 'liveVersionNumber'), 0);
            if (contentLiveNumbers.length === 0) {
                return Response.warning(app_config_1.i18n.store.mustHasLiveVersion, 2130103);
            }
            // Get the live version details of the target
            const dataDetail = Object.assign({ projectId: params.type !== constant_1.TYPE.PACKAGE ? fileDetail.folderId : undefined }, lodash_1.default.pick(fileDetail, ['id', 'applicationId', 'creator']));
            // Up to Store
            let goodsId = (goodsDetail === null || goodsDetail === void 0 ? void 0 : goodsDetail.id) || '';
            if (goodsDetail) {
                await this.service.store.goods.updateDetail(goodsDetail.id, {
                    details: dataDetail,
                    status: 1,
                    deleted: false,
                });
            }
            else {
                goodsId = (0, tools_1.generationId)(constant_1.PRE.STORE);
                await this.service.store.goods.addDetail({
                    id: goodsId,
                    name: fileDetail.name,
                    intro: params.intro || '',
                    type: params.type,
                    details: dataDetail,
                    status: 1,
                });
            }
            const newGoodsDetail = await this.service.store.goods.getDetailById(goodsId);
            // Save log
            ctx.operations.push(...this.service.log.addLogItem([goodsDetail ? constant_1.LOG.UPDATE : constant_1.LOG.CREATE, constant_1.TYPE.GOODS].join('_'), newGoodsDetail, {
                actionType: '',
                category: {
                    type: constant_1.TYPE.FILE,
                    fileId: params.id,
                    folderId: fileDetail.folderId,
                    applicationId: fileDetail.applicationId,
                },
            }));
            return Response.success(newGoodsDetail, 1130101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.store.addGoodsToStoreFailed, 3130101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/goods'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addGoodsToStore,
        description: '',
        tags: ['Store'],
        operationId: 'add-goods-to-store',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(store_validate_types_1.GetStorePackageListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, store_validate_types_1.AddGoodsToStoreReq]),
    __metadata("design:returntype", Promise)
], AddGoodsToStore.prototype, "index", null);
AddGoodsToStore = __decorate([
    (0, routing_controllers_1.JsonController)('stores'),
    __metadata("design:paramtypes", [])
], AddGoodsToStore);
exports.AddGoodsToStore = AddGoodsToStore;
