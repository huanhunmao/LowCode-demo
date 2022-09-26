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
exports.GetAppPageConditionList = void 0;
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
let GetAppPageConditionList = class GetAppPageConditionList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get a list of all conditional pages under the specified application,
     * each conditional folder has only one content
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    async index(params) {
        try {
            const typePageParams = Object.assign({ type: constant_1.TYPE.CONDITION, deleted: false }, params);
            const pageInfo = this.service.file.list.setPageSize(params);
            const result = await this.service.file.list.getAppTypeFilePageList(typePageParams, pageInfo);
            // Get the folder name of the file and the content information of the file
            let fileList = result.list;
            let contentObject = {};
            const fileIds = lodash_1.default.map(fileList, 'id');
            [fileList, contentObject] = await Promise.all([
                this.service.file.list.getFileAssocInfo((result === null || result === void 0 ? void 0 : result.list) || [], { type: constant_1.TYPE.CONDITION }),
                this.service.content.list.getContentObjectByFileIds(fileIds)
            ]);
            fileList.forEach(condition => {
                if (!condition.version) {
                    condition.version = {};
                }
                if (contentObject[condition.id]) {
                    condition.version.live = this.service.version.number.getVersionFromNumber(contentObject[condition.id].liveVersionNumber);
                }
            });
            return Response.success({
                pageInfo: {
                    total: result.count,
                    page: pageInfo.page,
                    size: pageInfo.size,
                },
                data: fileList,
            }, 1100201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.condition.getAppPageConditionsFailed, 3100201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/file-searchs-migrations'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppScopeConditions,
        description: '',
        tags: ['Condition'],
        operationId: 'get-app-condition-page-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_validate_types_1.AppTypeFilesReq]),
    __metadata("design:returntype", Promise)
], GetAppPageConditionList.prototype, "index", null);
GetAppPageConditionList = __decorate([
    (0, routing_controllers_1.JsonController)('conditions'),
    __metadata("design:paramtypes", [])
], GetAppPageConditionList);
exports.GetAppPageConditionList = GetAppPageConditionList;
