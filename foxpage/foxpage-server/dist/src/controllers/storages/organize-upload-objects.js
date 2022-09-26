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
exports.UploadObjectToStorage = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const storage_validate_types_1 = require("../../types/validates/storage-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let UploadObjectToStorage = class UploadObjectToStorage extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Organize the specified resource objects and upload them to the specified bucket
     * @param  {StorageListReq} params
     * @returns {FileFolderInfo}
     */
    async index(params) {
        try {
            const uploadResult = await this.service.storage.organizeUpload(params);
            if (uploadResult.code === 0) {
                return Response.success(app_config_1.i18n.storage.organizeUploadSuccess, 1150301);
            }
            else {
                return Response.warning(app_config_1.i18n.storage.organizeUploadFailed + ':' + uploadResult.data, 2150301);
            }
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.storage.uploadObjectsFailed, 3150301);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/organize-uploads'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.organizeUploadObjectToStorage,
        description: '',
        tags: ['Storage'],
        operationId: 'organize-upload-objects',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileListRes),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [storage_validate_types_1.UploadObjectsReq]),
    __metadata("design:returntype", Promise)
], UploadObjectToStorage.prototype, "index", null);
UploadObjectToStorage = __decorate([
    (0, routing_controllers_1.JsonController)('storages'),
    __metadata("design:paramtypes", [])
], UploadObjectToStorage);
exports.UploadObjectToStorage = UploadObjectToStorage;
