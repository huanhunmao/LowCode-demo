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
exports.GetPageBuilderSettingList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const app_validate_types_1 = require("../../types/validates/app-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetPageBuilderSettingList = class GetPageBuilderSettingList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get paging app builder setting data, include store page, template and package
     * @param  {AppSettingListReq} params
     * @returns {AppInfo}
     */
    async index(params) {
        var _a;
        try {
            const pageSize = this.service.application.setPageSize(params);
            const appDetail = await this.service.application.getDetailById(params.applicationId);
            let pageTypeList = [];
            let counts = 0;
            if (appDetail && appDetail.setting && params.type) {
                const typeList = appDetail.setting[params.type] || [];
                const search = (_a = params.search) === null || _a === void 0 ? void 0 : _a.toLowerCase();
                pageTypeList = lodash_1.default.chunk(lodash_1.default.filter(typeList, (item) => {
                    var _a, _b, _c, _d, _e;
                    // search by component id, name, nickname or category name
                    if (search) {
                        if (search === ((_a = item.id) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || ((_b = item.name) === null || _b === void 0 ? void 0 : _b.toLowerCase().indexOf(search)) !== -1) {
                            return true;
                        }
                        else if (params.type === constant_1.TYPE.COMPONENT &&
                            (((((_c = item.category.groupName) === null || _c === void 0 ? void 0 : _c.toLowerCase()) || '') +
                                '.' +
                                (((_d = item.category.categoryName) === null || _d === void 0 ? void 0 : _d.toLowerCase()) || '')).indexOf(search) !== -1 ||
                                (((_e = item.category.name) === null || _e === void 0 ? void 0 : _e.toLowerCase()) || '').indexOf(search) !== -1)) {
                            return true;
                        }
                        return false;
                    }
                    return true;
                }), pageSize.size)[pageSize.page - 1];
                counts = typeList.length;
            }
            const fileIds = lodash_1.default.map(pageTypeList, 'id');
            const fileList = await this.service.file.list.getDetailByIds(fileIds);
            const userBaseObject = await this.service.user.getUserBaseObjectByIds(lodash_1.default.map(fileList, 'creator'));
            let buildPageList = [];
            const fileObject = lodash_1.default.keyBy(fileList, 'id');
            (pageTypeList || []).forEach((item) => {
                var _a, _b;
                const fileDelivery = this.service.content.tag.getTagsByKeys(((_a = fileObject[item.id]) === null || _a === void 0 ? void 0 : _a.tags) || [], [
                    constant_1.TAG.DELIVERY_CLONE,
                    constant_1.TAG.DELIVERY_REFERENCE,
                ]);
                buildPageList.push(Object.assign({
                    id: item.id,
                    name: item.name,
                    status: item.status,
                    delivery: fileDelivery[constant_1.TAG.DELIVERY_CLONE]
                        ? constant_1.TAG.DELIVERY_CLONE
                        : fileDelivery[constant_1.TAG.DELIVERY_REFERENCE]
                            ? constant_1.TAG.DELIVERY_REFERENCE
                            : '',
                    category: item.category || {},
                    creator: userBaseObject[(_b = fileObject[item.id]) === null || _b === void 0 ? void 0 : _b.creator] || {},
                }, lodash_1.default.pick(fileObject[item.id], ['type', 'createTime', 'updateTime'])));
            });
            return Response.success({
                pageInfo: {
                    total: counts,
                    page: params.page,
                    size: params.size,
                },
                data: buildPageList,
            }, 1031101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.app.listError, 3031101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/builder-setting-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppSettingItemList,
        description: 'app-builder-setting',
        tags: ['Application'],
        operationId: 'get-page-builder-setting-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(app_validate_types_1.AppSettingItemRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [app_validate_types_1.AppSettingListReq]),
    __metadata("design:returntype", Promise)
], GetPageBuilderSettingList.prototype, "index", null);
GetPageBuilderSettingList = __decorate([
    (0, routing_controllers_1.JsonController)('applications'),
    __metadata("design:paramtypes", [])
], GetPageBuilderSettingList);
exports.GetPageBuilderSettingList = GetPageBuilderSettingList;
