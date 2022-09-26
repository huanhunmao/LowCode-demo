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
exports.GetFileList = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetFileList = class GetFileList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get file list
     * @param  {FileListReq} params
     * @returns {FileUserInfo}
     */
    async index(params) {
        this.service.file.info.setPageSize(params);
        const from = (params.page - 1) * params.size;
        const to = from + params.size;
        try {
            const searchParams = {
                search: params.search || '',
                applicationId: params.applicationId,
                folderId: params.id || '',
                type: params.type,
                from: from,
                to: to,
            };
            const fileData = await this.service.file.list.getPageData(searchParams);
            // Response
            const data = {
                pageInfo: {
                    page: params.page,
                    size: params.size,
                    total: fileData.count,
                },
                data: fileData.list,
            };
            return Response.success(data, 1170401);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.file.listError, 3170401);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('s'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.fileList,
        description: '',
        tags: ['File'],
        operationId: 'file-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_validate_types_1.FileListReq]),
    __metadata("design:returntype", Promise)
], GetFileList.prototype, "index", null);
GetFileList = __decorate([
    (0, routing_controllers_1.JsonController)('file'),
    __metadata("design:paramtypes", [])
], GetFileList);
exports.GetFileList = GetFileList;
