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
exports.GetTemplates = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetTemplates = class GetTemplates extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get all live version template data under the specified application
     * @param  {ContentListReq} params
     * @returns {ContentInfo}
     */
    async index(params) {
        try {
            let templateList = [];
            // 获取模板的FileIds
            const fileList = await this.service.file.list.getAppTypeFileList({
                applicationId: params.applicationId,
                type: constant_1.TYPE.TEMPLATE,
            });
            const fileIds = lodash_1.default.map(fileList, 'id');
            let contentList = [];
            if (fileIds.length > 0) {
                // Get contentId with live version
                contentList = await this.service.content.file.getContentByFileIds(fileIds);
            }
            // contentId, versionNumber
            let contentLiveNumbers = [];
            if (contentList.length > 0) {
                contentList.forEach((content) => {
                    if (content.liveVersionNumber > 0 && !content.deleted) {
                        contentLiveNumbers.push({
                            contentId: content.id,
                            versionNumber: content.liveVersionNumber,
                        });
                    }
                });
            }
            // Get the details of content
            let contentVersion = [];
            if (contentLiveNumbers.length > 0) {
                contentVersion = await this.service.version.list.getContentByIdAndVersionNumber(contentLiveNumbers);
            }
            const contentObject = lodash_1.default.keyBy(contentList, 'id');
            contentVersion.forEach((version) => {
                var _a, _b;
                templateList.push({
                    id: (_a = contentObject[version.contentId]) === null || _a === void 0 ? void 0 : _a.id,
                    title: (_b = contentObject[version.contentId]) === null || _b === void 0 ? void 0 : _b.title,
                    version: version,
                });
            });
            return Response.success(templateList, 1160701);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.content.getTemplateListFailed, 3160701);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('s'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.templateList,
        description: '',
        tags: ['Template'],
        operationId: 'template-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentDetailRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [content_validate_types_1.TemplateListReq]),
    __metadata("design:returntype", Promise)
], GetTemplates.prototype, "index", null);
GetTemplates = __decorate([
    (0, routing_controllers_1.JsonController)('template'),
    __metadata("design:paramtypes", [])
], GetTemplates);
exports.GetTemplates = GetTemplates;
