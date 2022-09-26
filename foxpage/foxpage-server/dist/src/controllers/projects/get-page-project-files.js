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
exports.GetProjectFileList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetProjectFileList = class GetProjectFileList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the list of paging files under the project
     * @param  {ProjectListReq} params
     * @param  {Header} headers
     * @returns {FileFolderInfo}
     */
    async index(params) {
        var _a, _b;
        try {
            // Check if the folder is deleted
            const folderDetail = await this.service.folder.info.getDetailById(params.id);
            if (!folderDetail || (!params.deleted && folderDetail.deleted)) {
                return Response.warning(app_config_1.i18n.project.projectIsInvalidOrDeleted, 2040301);
            }
            this.service.folder.list.setPageSize(params);
            const childrenList = await this.service.folder.list.getPageChildrenList(params, [constant_1.TYPE.TEMPLATE, constant_1.TYPE.PAGE]);
            const fileIds = lodash_1.default.map(((_a = childrenList.data) === null || _a === void 0 ? void 0 : _a.files) || [], 'id');
            const fileContents = await this.service.content.list.find({ fileId: { $in: fileIds }, deleted: false });
            let fileContentList = {};
            fileContents.forEach(content => {
                if (!fileContentList[content.fileId]) {
                    fileContentList[content.fileId] = [];
                }
                fileContentList[content.fileId].push(content);
            });
            (((_b = childrenList.data) === null || _b === void 0 ? void 0 : _b.files) || []).forEach(file => {
                file.hasContent = lodash_1.default.has(fileContentList, file.id);
                file.hasLiveContent = (lodash_1.default.filter(fileContentList[file.id] || [], content => content.liveVersionNumber > 0)).length > 0;
            });
            return Response.success({
                pageInfo: {
                    page: params.page,
                    size: params.size,
                    total: childrenList.count,
                },
                data: childrenList.data || {},
            }, 1040301);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.project.getChildrenFilesFailed, 3040301);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/files'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getPageProjectFiles,
        description: '',
        tags: ['Project'],
        operationId: 'get-page-project-files',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileFolderListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_validate_types_1.FileListReq]),
    __metadata("design:returntype", Promise)
], GetProjectFileList.prototype, "index", null);
GetProjectFileList = __decorate([
    (0, routing_controllers_1.JsonController)('projects'),
    __metadata("design:paramtypes", [])
], GetProjectFileList);
exports.GetProjectFileList = GetProjectFileList;
