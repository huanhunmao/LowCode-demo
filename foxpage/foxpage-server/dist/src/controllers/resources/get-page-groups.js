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
exports.GetResourceGroupPageList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const resource_validate_types_1 = require("../../types/validates/resource-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetResourceGroupPageList = class GetResourceGroupPageList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get a paging list of resources
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    async index(params) {
        this.service.folder.info.setPageSize(params);
        const from = (params.page - 1) * params.size;
        const to = from + params.size;
        try {
            let searchParams = {
                search: params.search || '',
                applicationId: params.applicationId,
                from: from,
                to: to,
            };
            const [appDetail, groupInfo] = await Promise.all([
                this.service.application.getDetailById(params.applicationId),
                this.service.folder.list.getFolderPageList(searchParams, constant_1.TYPE.RESOURCE),
            ]);
            // Get the resource type name
            const appResourceObject = lodash_1.default.keyBy((appDetail === null || appDetail === void 0 ? void 0 : appDetail.resources) || [], 'id');
            groupInfo.list.forEach((group) => {
                (group === null || group === void 0 ? void 0 : group.tags) &&
                    group.tags.forEach((tag) => {
                        var _a;
                        if (tag.resourceType && tag.resourceId) {
                            tag.origin = ((_a = appResourceObject[tag.resourceId]) === null || _a === void 0 ? void 0 : _a.name) || '';
                        }
                    });
            });
            return Response.success({
                data: groupInfo.list,
                pageInfo: {
                    total: groupInfo.count,
                    page: params.page,
                    size: params.size,
                },
            }, 1120701);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.resource.getPageResourceFailed, 3120701);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/group-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getResourceGroupList,
        description: '',
        tags: ['Resource'],
        operationId: 'get-page-resource-group-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FolderListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resource_validate_types_1.ResourceGroupListReq]),
    __metadata("design:returntype", Promise)
], GetResourceGroupPageList.prototype, "index", null);
GetResourceGroupPageList = __decorate([
    (0, routing_controllers_1.JsonController)('resources'),
    __metadata("design:paramtypes", [])
], GetResourceGroupPageList);
exports.GetResourceGroupPageList = GetResourceGroupPageList;
