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
exports.AddStorePackageToApplication = void 0;
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
let AddStorePackageToApplication = class AddStorePackageToApplication extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Add store pages and template products to the specified application,
     * current only support create a reference to the package.
     * When creating referenced component information,
     * you need to add the referenced information on the label of the created component file
     * @param  {GetPageTemplateListReq} params
     * @returns {GetPageTemplateListRes}
     */
    async index(ctx, params) {
        var _a, _b, _c;
        try {
            // Check permission
            const hasAuth = await Promise.all(params.appIds.map((appId) => this.service.auth.application(appId, { ctx })));
            if (hasAuth.indexOf(false) !== -1) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4130201);
            }
            // Get goods details
            const [goodsList, appFolders] = await Promise.all([
                this.service.store.goods.getDetailByIds(params.goodsIds),
                this.service.folder.info.getAppsTypeFolderId({
                    applicationIds: params.appIds,
                    type: constant_1.TYPE.COMPONENT,
                }),
            ]);
            const goodsFileList = lodash_1.default.map(goodsList, 'details');
            const fileIds = lodash_1.default.map(goodsFileList, 'id');
            const fileObject = lodash_1.default.keyBy(goodsFileList, 'id');
            const goodsFileObject = lodash_1.default.keyBy(goodsList, 'details.id');
            if (fileIds.length > 0) {
                const [fileList, fileContentList] = await Promise.all([
                    this.service.file.list.getDetailByIds(fileIds),
                    this.service.content.file.getContentByFileIds(fileIds),
                ]);
                const fileContentObject = lodash_1.default.keyBy(fileContentList, 'fileId');
                const existFiles = await this.service.file.list.find({
                    applicationId: { $in: params.appIds },
                    name: { $in: lodash_1.default.map(fileList, 'name') },
                    deleted: false
                });
                if (existFiles.length > 0) {
                    return Response.warning(app_config_1.i18n.store.appHasExistPackageNames + ':' + lodash_1.default.map(existFiles, 'name').join(','), 2130201);
                }
                let goodsOrders = [];
                for (const appId of params.appIds) {
                    // Check if there is a component with the same name under the application
                    const referencedObject = await this.service.file.list.getReferencedByIds(appId, fileIds, params.delivery);
                    for (const file of fileList) {
                        if (referencedObject[file.id]) {
                            // Has been referenced
                            continue;
                        }
                        const fileInfo = this.service.file.info.create({
                            id: (0, tools_1.generationId)(constant_1.PRE.FILE),
                            applicationId: appId,
                            name: file.name,
                            intro: file.intro,
                            suffix: file.suffix,
                            type: file.type,
                            folderId: appFolders[appId] || '',
                            tags: [{ type: params.delivery, reference: fileObject[file.id] || {} }],
                            creator: ctx.userInfo.id,
                        }, { ctx });
                        // clone type, need create content and version
                        if (params.delivery === constant_1.TAG.DELIVERY_CLONE) {
                            await this.service.content.component.cloneContent(fileInfo.id, (_a = fileObject[file.id]) === null || _a === void 0 ? void 0 : _a.id, { ctx });
                        }
                        // add a new component log status
                        ctx.operations.push(...this.service.log.addLogItem(constant_1.LOG.LIVE, ({
                            id: fileContentObject[file.id].id, contentId: fileContentObject[file.id].id
                        }), {
                            fileId: fileInfo.id,
                            category: { type: constant_1.TYPE.APPLICATION, id: appId },
                            dataType: constant_1.TYPE.COMPONENT,
                        }));
                        goodsOrders.push({
                            id: (0, tools_1.generationId)(constant_1.PRE.ORDER),
                            goodsId: ((_b = goodsFileObject === null || goodsFileObject === void 0 ? void 0 : goodsFileObject[file.id]) === null || _b === void 0 ? void 0 : _b.id) || '',
                            goodsVersionId: '',
                            customer: {
                                id: file.id,
                                applicationId: appId,
                                userId: (_c = ctx.userInfo) === null || _c === void 0 ? void 0 : _c.id,
                            },
                            delivery: params.delivery,
                        });
                    }
                }
                if (goodsOrders.length > 0) {
                    ctx.transactions.push(this.service.store.order.addDetailQuery(goodsOrders));
                }
            }
            await this.service.file.info.runTransaction(ctx.transactions);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: params.goodsIds[0], type: constant_1.TYPE.GOODS });
            return Response.success(app_config_1.i18n.store.addStorePackageToApplicationSuccess, 1130201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.store.addStorePackageToApplicationFailed, 3130201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/packages'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addStorePackagesToApplications,
        description: '',
        tags: ['Store'],
        operationId: 'add-store-packages-to-applications',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(store_validate_types_1.GetStorePackageListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, store_validate_types_1.AddGoodsToApplicationReq]),
    __metadata("design:returntype", Promise)
], AddStorePackageToApplication.prototype, "index", null);
AddStorePackageToApplication = __decorate([
    (0, routing_controllers_1.JsonController)('stores'),
    __metadata("design:paramtypes", [])
], AddStorePackageToApplication);
exports.AddStorePackageToApplication = AddStorePackageToApplication;
