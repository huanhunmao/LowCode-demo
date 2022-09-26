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
exports.GetPageBuilderItemList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetPageBuilderItemList = class GetPageBuilderItemList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get application builder available items
     * @param  {AppPageBuilderItemReq} params
     * @returns {ContentInfo}
     */
    async index(ctx, params) {
        var _a;
        try {
            let counts = 0;
            let itemFileIds = [];
            let fileList = [];
            const pageSize = this.service.file.info.setPageSize(params);
            // Get page or template items
            if (params.scope === constant_1.TYPE.APPLICATION && [constant_1.TYPE.PAGE, constant_1.TYPE.TEMPLATE].indexOf(params.type) !== -1) {
                const appDetail = await this.service.application.getDetailById(params.applicationId);
                const settingItems = lodash_1.default.orderBy(lodash_1.default.filter(((_a = appDetail.setting) === null || _a === void 0 ? void 0 : _a[params.type]) || [], (item) => {
                    if (item.status && params.search) {
                        return item.id === params.search || item.name.indexOf(params.search) !== -1;
                    }
                    return item.status;
                }), ['createTime', 'desc']);
                itemFileIds = lodash_1.default.map(lodash_1.default.chunk(settingItems, pageSize.size)[pageSize.page - 1] || [], 'id');
                counts = settingItems.length || 0;
                fileList = await this.service.file.list.getDetailByIds(itemFileIds);
            }
            else if (params.scope === constant_1.TYPE.USER && [constant_1.TYPE.PAGE, constant_1.TYPE.TEMPLATE].indexOf(params.type) !== -1) {
                // Get current user template files
                const filter = {
                    applicationId: params.applicationId,
                    type: params.type,
                    deleted: false,
                    creator: ctx.userInfo.id
                };
                if (params.search) {
                    filter['$or'] = [{ name: { $regex: new RegExp(params.search, 'i') } }, { id: params.search }];
                }
                [counts, fileList] = await Promise.all([
                    this.service.file.list.getCount(filter),
                    this.service.file.list.find(filter, '', {
                        sort: { _id: -1 },
                        skip: (pageSize.page - 1) * pageSize.size,
                        limit: pageSize.size,
                    }),
                ]);
            }
            else if (params.scope === constant_1.TYPE.INVOLVE && [constant_1.TYPE.PAGE, constant_1.TYPE.TEMPLATE].indexOf(params.type) !== -1) {
                const involveFileObject = await this.service.file.list.getUserInvolveFiles({
                    applicationId: params.applicationId,
                    type: params.type,
                    userId: ctx.userInfo.id,
                    skip: (pageSize.page - 1) * pageSize.size,
                    limit: pageSize.size,
                });
                counts = involveFileObject.counts || 0;
                fileList = involveFileObject.list || [];
            }
            const fileContentObject = await this.service.content.list.getFileContentList(itemFileIds, { fileList });
            let fileContentList = [];
            fileList.forEach(file => {
                fileContentList.push(Object.assign({}, file, {
                    contents: lodash_1.default.filter(fileContentObject[file.id] || [], 'liveVersionNumber')
                }));
            });
            return Response.success({
                pageInfo: this.paging(counts, pageSize),
                data: fileContentList,
            }, 1052201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.page.getPageBuilderItemFailed, 3052201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/builder-items'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getPageBuilderItemList,
        description: '',
        tags: ['Page'],
        operationId: 'get-page-builder-item-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, page_validate_types_1.AppPageBuilderItemReq]),
    __metadata("design:returntype", Promise)
], GetPageBuilderItemList.prototype, "index", null);
GetPageBuilderItemList = __decorate([
    (0, routing_controllers_1.JsonController)('pages'),
    __metadata("design:paramtypes", [])
], GetPageBuilderItemList);
exports.GetPageBuilderItemList = GetPageBuilderItemList;
