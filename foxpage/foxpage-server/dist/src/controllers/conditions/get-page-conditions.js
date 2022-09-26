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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConditionList = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetConditionList = class GetConditionList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get conditional pagination list
     * @param  {AppPageListCommonReq} params
     * @returns {FileContentAndVersion}
     */
    async index(params) {
        try {
            this.service.folder.info.setPageSize(params);
            if (params.folderId) {
                const folderDetail = await this.service.folder.info.getDetailById(params.folderId);
                if (!folderDetail || folderDetail.deleted || folderDetail.applicationId !== params.applicationId) {
                    return Response.warning(app_config_1.i18n.folder.invalidFolderId, 2100501);
                }
            }
            else {
                params.folderId = await this.service.folder.info.getAppTypeFolderId({
                    applicationId: params.applicationId,
                    type: constant_1.TYPE.CONDITION,
                });
            }
            const fileInfo = await this.service.file.list.getItemFileContentDetail(params, constant_1.TYPE.CONDITION);
            return Response.success({
                pageInfo: {
                    total: fileInfo.counts,
                    page: params.page,
                    size: params.size,
                },
                data: fileInfo.list,
            }, 1100501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.condition.getPageConditionFailed, 3100501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppPageConditions,
        description: '',
        tags: ['Condition'],
        operationId: 'get-condition-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [page_validate_types_1.AppTypePageListCommonReq]),
    __metadata("design:returntype", Promise)
], GetConditionList.prototype, "index", null);
GetConditionList = __decorate([
    (0, routing_controllers_1.JsonController)('condition-searchs'),
    __metadata("design:paramtypes", [])
], GetConditionList);
exports.GetConditionList = GetConditionList;
