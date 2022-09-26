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
exports.GetTemplateContentList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetTemplateContentList = class GetTemplateContentList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the content list details of the specified page
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    async index(params) {
        try {
            // Check file deleted status
            const fileDetail = await this.service.file.info.getDetailById(params.fileId);
            if (!fileDetail || (!params.deleted && fileDetail.deleted)) {
                return Response.warning(app_config_1.i18n.page.fileIsInvalidOrDeleted, 2070801);
            }
            const contentParams = {
                fileId: params.fileId,
                deleted: params.deleted || false,
                search: params.search || '',
                page: 1,
                size: 1000,
            };
            const contentList = await this.service.content.file.getFileContentList(contentParams);
            contentList.forEach((content) => {
                var _a, _b;
                content.isBase = ((_a = lodash_1.default.remove(content.tags, (tag) => !lodash_1.default.isNil(tag.isBase))[0]) === null || _a === void 0 ? void 0 : _a.isBase) || false;
                content.extendId = ((_b = lodash_1.default.remove(content.tags, (tag) => !lodash_1.default.isNil(tag.extendId))[0]) === null || _b === void 0 ? void 0 : _b.extendId) || '';
            });
            return Response.success(contentList, 1070801);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.template.getTemplateContentListFailed, 3070801);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/content-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getTemplateContentList,
        description: '',
        tags: ['Template'],
        operationId: 'get-template-content-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentDetailRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_validate_types_1.ContentListReq]),
    __metadata("design:returntype", Promise)
], GetTemplateContentList.prototype, "index", null);
GetTemplateContentList = __decorate([
    (0, routing_controllers_1.JsonController)('templates'),
    __metadata("design:paramtypes", [])
], GetTemplateContentList);
exports.GetTemplateContentList = GetTemplateContentList;
