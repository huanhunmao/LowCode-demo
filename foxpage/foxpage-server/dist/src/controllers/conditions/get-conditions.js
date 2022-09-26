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
exports.GetAppConditionList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetAppConditionList = class GetAppConditionList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the details of the live version of the specified conditions under the application
     * @param  {AppContentVersionReq} params
     * @returns {VersionWithExternal[]}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            const [pageList, contentList] = await Promise.all([
                this.service.content.live.getContentLiveDetails({
                    applicationId: params.applicationId,
                    type: constant_1.TYPE.CONDITION,
                    contentIds: params.ids || [],
                }),
                this.service.content.list.getDetailByIds(params.ids),
            ]);
            let pageVersions = [];
            const contentObject = lodash_1.default.keyBy(contentList, 'id');
            pageList.forEach(item => {
                var _a, _b;
                pageVersions.push(Object.assign({}, item.content || {}, {
                    name: ((_a = contentObject[item.contentId]) === null || _a === void 0 ? void 0 : _a.title) || '',
                    version: item.version || '',
                    versionNumber: this.service.version.number.createNumberFromVersion(item.version || '0.0.1'),
                    fileId: ((_b = contentObject[item.contentId]) === null || _b === void 0 ? void 0 : _b.fileId) || '',
                }));
            });
            return Response.success(pageVersions, 1100401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.condition.getAppConditionFailed, 3100401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/lives'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppConditions,
        description: '',
        tags: ['Condition'],
        operationId: 'get-condition-live-version-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.PageContentDataRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, page_validate_types_1.AppContentVersionReq]),
    __metadata("design:returntype", Promise)
], GetAppConditionList.prototype, "index", null);
GetAppConditionList = __decorate([
    (0, routing_controllers_1.JsonController)('conditions'),
    __metadata("design:paramtypes", [])
], GetAppConditionList);
exports.GetAppConditionList = GetAppConditionList;
