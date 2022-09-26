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
exports.GetFileAllParentList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetFileAllParentList = class GetFileAllParentList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the special data (folder, file, content, version) all parent detail
     * @param  {GetFileParentReq} params
     * @returns {FileUserInfo}
     */
    async index(params) {
        try {
            const dataType = this.service.log.checkDataIdType(params.id);
            if (!dataType.type) {
                return Response.success([], 1170201);
            }
            let parentList = [];
            let contentId = '';
            if (dataType.type === constant_1.TYPE.VERSION) {
                const versionDetail = await this.service.version.info.getDetailById(params.id);
                contentId = versionDetail.contentId;
                versionDetail && parentList.push(versionDetail);
            }
            let fileId = '';
            if (dataType.type === constant_1.TYPE.CONTENT || contentId) {
                const contentDetail = await this.service.content.info.getDetailById(contentId || params.id);
                fileId = contentDetail.fileId;
                contentDetail && parentList.unshift(contentDetail);
            }
            let folderId = '';
            if (dataType.type === constant_1.TYPE.FILE || fileId) {
                const fileDetail = await this.service.file.info.getDetailById(fileId || params.id);
                folderId = fileDetail.folderId;
                fileDetail && parentList.unshift(fileDetail);
            }
            if (dataType.type === constant_1.TYPE.FOLDER || folderId) {
                const folderParentList = await this.service.folder.list.getAllParentsRecursive([
                    folderId || params.id,
                ]);
                parentList = folderParentList[folderId || params.id].concat(parentList);
            }
            // Remove system default folder item
            if (parentList[0] &&
                lodash_1.default.has(parentList[0], 'parentFolderId') &&
                parentList[0].parentFolderId === '') {
                delete parentList[0];
            }
            return Response.success(parentList, 1170201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.file.getFileParentListFailed, 3170201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/parents'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getFileAllPatents,
        description: '',
        tags: ['File'],
        operationId: 'get-file-parents-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [file_validate_types_1.GetFileParentReq]),
    __metadata("design:returntype", Promise)
], GetFileAllParentList.prototype, "index", null);
GetFileAllParentList = __decorate([
    (0, routing_controllers_1.JsonController)('files'),
    __metadata("design:paramtypes", [])
], GetFileAllParentList);
exports.GetFileAllParentList = GetFileAllParentList;
