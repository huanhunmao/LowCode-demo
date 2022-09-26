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
exports.AddStorePageToApplication = void 0;
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
let AddStorePageToApplication = class AddStorePageToApplication extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Add the store page, template products to the specified application
     *
     * 1, Get the project information corresponding to the page
     * 2, Get the details of the page, including dependency information (except for components)
     * 3, Create a project in the specified application, create a new page information, and rely on the information.
     * 4, record product information in the order table
     * @param  {GetPageTemplateListReq} params
     * @returns {GetPageTemplateListRes}
     */
    async index(ctx, params) {
        var _a, _b;
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
            const goodsProjectList = await this.service.folder.list.getDetailByIds(lodash_1.default.uniq(lodash_1.default.map(goodsFileList, 'folderId')));
            const folderObject = lodash_1.default.keyBy(goodsProjectList, 'id');
            // Add the file corresponding to the goods to the application
            let projectIdMap = new Map();
            let goodsOrders = [];
            for (const file of goodsFileList) {
                for (const appId of params.appIds) {
                    let newFileId = '';
                    if (!projectIdMap.has(file.folderId)) {
                        const sourceFolderDetail = folderObject[file.folderId] || {};
                        const projectId = (0, tools_1.generationId)(constant_1.PRE.FOLDER);
                        const folderName = [sourceFolderDetail.name, (0, tools_1.randStr)(4)].join('_');
                        const distinctParams = params.delivery === constant_1.TAG.DELIVERY_REFERENCE
                            ? { tags: { $elemMatch: { $and: [{ type: constant_1.TAG.DELIVERY_REFERENCE, 'reference.id': file.folderId }] } } }
                            : {};
                        // Create project folder
                        const newProjectTags = [
                            { type: constant_1.TYPE.PROJECT },
                            {
                                type: params.delivery,
                                [params.delivery]: {
                                    id: file.folderId,
                                    applicationId: file.applicationId,
                                }
                            }
                        ];
                        const newProjectDetail = await this.service.folder.info.addTypeFolderDetail({
                            id: projectId,
                            name: folderName,
                            intro: sourceFolderDetail.intro || '',
                            applicationId: appId,
                            folderPath: (0, tools_1.formatToPath)(folderName),
                            tags: newProjectTags,
                        }, { ctx, type: constant_1.TYPE.PROJECT, distinctParams });
                        projectIdMap.set(file.folderId, (_a = newProjectDetail.data) === null || _a === void 0 ? void 0 : _a.id);
                    }
                    if (params.delivery === constant_1.TAG.DELIVERY_CLONE) {
                        // Create file, content, version
                        const idMap = await this.service.file.info.copyFile(file.id, appId, {
                            ctx,
                            folderId: projectIdMap.get(file.folderId),
                            hasLive: true,
                            setLive: true,
                        });
                        newFileId = idMap[file.id].newId;
                    }
                    else {
                        // create reference file
                        const newFileIDetail = await this.service.file.info.referenceFile(file.id, file.applicationId, {
                            ctx,
                            targetApplicationId: appId,
                            targetFolderId: projectIdMap.get(file.folderId),
                            fileName: file.name,
                            type: file.type,
                        });
                        newFileId = newFileIDetail.id;
                    }
                    // Add goods order
                    goodsOrders.push({
                        id: (0, tools_1.generationId)(constant_1.PRE.ORDER),
                        goodsId: ((_b = goodsFileObject === null || goodsFileObject === void 0 ? void 0 : goodsFileObject[file.id]) === null || _b === void 0 ? void 0 : _b.id) || '',
                        goodsVersionId: '',
                        customer: {
                            id: newFileId || '',
                            applicationId: appId,
                            projectId: projectIdMap.get(file.folderId) || '',
                            userId: ctx.userInfo.id,
                        },
                        delivery: params.delivery,
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
    (0, routing_controllers_1.Post)('/pages'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addStorePagesToApplications,
        description: '',
        tags: ['Store'],
        operationId: 'add-store-pages-to-applications',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(store_validate_types_1.GetPageTemplateListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, store_validate_types_1.AddGoodsToApplicationReq]),
    __metadata("design:returntype", Promise)
], AddStorePageToApplication.prototype, "index", null);
AddStorePageToApplication = __decorate([
    (0, routing_controllers_1.JsonController)('stores'),
    __metadata("design:paramtypes", [])
], AddStorePageToApplication);
exports.AddStorePageToApplication = AddStorePageToApplication;
