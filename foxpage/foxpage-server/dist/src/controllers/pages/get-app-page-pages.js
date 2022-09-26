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
exports.GetAppPageFileList = void 0;
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
let GetAppPageFileList = class GetAppPageFileList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get a list of paging files under the app, in reverse chronological order
     * @param  {AppTypeFilesReq} params
     * @returns {PageContentData[]}
     */
    async index(params) {
        try {
            const typePageParams = Object.assign({ type: constant_1.TYPE.PAGE, deleted: false }, params);
            const pageInfo = this.service.file.list.setPageSize(params);
            const result = await this.service.file.list.getAppTypeFilePageList(typePageParams, pageInfo);
            let fileList = result.list;
            if ((result === null || result === void 0 ? void 0 : result.list.length) > 0) {
                fileList = await this.service.file.list.getFileAssocInfo(result.list);
                fileList = fileList.map(file => lodash_1.default.omit(file, 'version'));
            }
            return Response.success({
                pageInfo: {
                    total: result.count,
                    page: pageInfo.page,
                    size: pageInfo.size,
                },
                data: fileList,
            }, 1050301);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.page.getAppPageFileFailed, 3050301);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/file-searchs/migration'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppTypeFileList,
        description: '',
        tags: ['Page'],
        operationId: 'get-app-page-file-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_validate_types_1.AppTypeFilesReq]),
    __metadata("design:returntype", Promise)
], GetAppPageFileList.prototype, "index", null);
GetAppPageFileList = __decorate([
    (0, routing_controllers_1.JsonController)('pages'),
    __metadata("design:paramtypes", [])
], GetAppPageFileList);
exports.GetAppPageFileList = GetAppPageFileList;
