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
exports.GetStoreProjectList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const store_validate_types_1 = require("../../types/validates/store-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetStoreProjectList = class GetStoreProjectList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the pagination data of store pages and templates, and display it according to the project
     * @param  {GetPageTemplateListReq} params
     * @returns {GetPageTemplateListRes}
     */
    async index(ctx, params) {
        try {
            this.service.store.goods.setPageSize(params);
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            const goodsType = params.type || constant_1.TYPE.PAGE;
            // Get store paging data
            const pageData = await this.service.store.goods.getPageList(Object.assign(params, { type: goodsType }));
            const projectList = lodash_1.default.cloneDeep(pageData.list);
            const projectIds = lodash_1.default.map(projectList, 'id');
            const projectUserIds = lodash_1.default.map(projectList, 'creator');
            // Get the files that are listed in the store under the project
            const [projectGoods, appList, projectUserObject] = await Promise.all([
                this.service.store.goods.find({ 'details.projectId': { $in: projectIds }, type: goodsType }),
                this.service.application.getDetailByIds(lodash_1.default.map(projectList, 'applicationId')),
                this.service.user.getUserBaseObjectByIds(projectUserIds),
            ]);
            const appObject = lodash_1.default.keyBy(appList, 'id');
            const projectGoodsObject = lodash_1.default.keyBy(projectGoods, 'id');
            const projectGoodsList = projectList.map((project) => {
                var _a, _b;
                const goodsList = [];
                for (const goodsId in projectGoodsObject) {
                    if (((_a = projectGoodsObject[goodsId].details) === null || _a === void 0 ? void 0 : _a.projectId) === project.id) {
                        goodsList.push(projectGoodsObject[goodsId]);
                        delete projectGoodsObject[goodsId];
                    }
                }
                return Object.assign({
                    files: goodsList,
                    type: goodsType,
                }, {
                    application: { id: project.applicationId, name: ((_b = appObject[project.applicationId]) === null || _b === void 0 ? void 0 : _b.name) || '' },
                    creator: projectUserObject[project.creator],
                }, lodash_1.default.omit(project, ['creator']));
            });
            return Response.success({
                pageInfo: {
                    total: pageData.count,
                    page: params.page,
                    size: params.size,
                },
                data: projectGoodsList,
            }, 1130601);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.store.getStorePageListFailed, 3130601);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/project-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getStorePageTemplateList,
        description: '',
        tags: ['Store'],
        operationId: 'get-store-page-template-page-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(store_validate_types_1.GetPageTemplateListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, store_validate_types_1.GetPageTemplateListReq]),
    __metadata("design:returntype", Promise)
], GetStoreProjectList.prototype, "index", null);
GetStoreProjectList = __decorate([
    (0, routing_controllers_1.JsonController)('stores'),
    __metadata("design:paramtypes", [])
], GetStoreProjectList);
exports.GetStoreProjectList = GetStoreProjectList;
