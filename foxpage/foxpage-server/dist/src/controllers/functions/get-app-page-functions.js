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
exports.GetAppPageFunctionList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
// migration to files/get-page-type-items.ts
let GetAppPageFunctionList = class GetAppPageFunctionList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the pagination list of all functions under the specified application,
     * each function folder has only one content
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    async index(params) {
        try {
            const typePageParams = Object.assign({ type: constant_1.TYPE.FUNCTION, deleted: false }, params);
            const pageInfo = this.service.file.list.setPageSize(params);
            const result = await this.service.file.list.getAppTypeFilePageList(typePageParams, pageInfo);
            let fileList = result.list;
            let contentObject = {};
            const fileIds = lodash_1.default.map(fileList, 'id');
            [fileList, contentObject] = await Promise.all([
                this.service.file.list.getFileAssocInfo(result.list, { type: constant_1.TYPE.FUNCTION }),
                this.service.content.list.getContentObjectByFileIds(fileIds)
            ]);
            fileList.forEach(fun => {
                if (!fun.version) {
                    fun.version = {};
                }
                if (contentObject[fun.id]) {
                    fun.version.live = this.service.version.number.getVersionFromNumber(contentObject[fun.id].liveVersionNumber);
                }
            });
            return Response.success({
                pageInfo: {
                    total: result.count,
                    page: pageInfo.page,
                    size: pageInfo.size,
                },
                data: fileList,
            }, 1090201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.function.getAppPageFunctionFailed, 3090201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/file-searchs-migrations'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppScopeFunctions,
        description: '',
        tags: ['Function'],
        operationId: 'get-app-function-page-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_validate_types_1.AppTypeFilesReq]),
    __metadata("design:returntype", Promise)
], GetAppPageFunctionList.prototype, "index", null);
GetAppPageFunctionList = __decorate([
    (0, routing_controllers_1.JsonController)('functions'),
    __metadata("design:paramtypes", [])
], GetAppPageFunctionList);
exports.GetAppPageFunctionList = GetAppPageFunctionList;
