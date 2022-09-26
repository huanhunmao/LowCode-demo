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
exports.UpdateFileDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let UpdateFileDetail = class UpdateFileDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Update file details, only file name and introduction can be updated
     * @param  {UpdateFileDetailReq} params
     * @returns {File}
     */
    async index(ctx, params) {
        // Check the validity of the name
        if (!(0, tools_1.checkName)(params.name)) {
            return Response.warning(app_config_1.i18n.file.invalidName, 2170601);
        }
        try {
            // Permission check
            const hasAuth = await this.service.auth.file(params.id, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4170601);
            }
            const fileDetail = await this.service.file.info.getDetailById(params.id);
            if (!fileDetail || fileDetail.deleted) {
                return Response.warning(app_config_1.i18n.file.invalidFileId, 2170602);
            }
            // If the file name is updated, check whether the new file name exists,
            // and you need to check it in the fields listed below
            if (fileDetail.name !== params.name) {
                const newFileParams = lodash_1.default.pick(fileDetail, [
                    'name',
                    'applicationId',
                    'folderId',
                    'type',
                    'suffix',
                    'deleted',
                ]);
                newFileParams.name = params.name;
                newFileParams.deleted = false;
                const newFileExist = await this.service.file.check.checkExist(newFileParams);
                if (newFileExist) {
                    return Response.warning(app_config_1.i18n.file.nameExist, 2170603);
                }
            }
            // Update file info
            const fileNameIntro = lodash_1.default.pick(params, ['name', 'intro']);
            await this.service.file.info.updateDetail(params.id, fileNameIntro);
            // Get file details
            const newFileDetail = await this.service.file.info.getDetailById(params.id);
            return Response.success(newFileDetail, 1170601);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.file.updateFailed, 3170601);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/detail'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.updateFileDetail,
        description: '',
        tags: ['File'],
        operationId: 'update-file-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.UpdateFileDetailReq]),
    __metadata("design:returntype", Promise)
], UpdateFileDetail.prototype, "index", null);
UpdateFileDetail = __decorate([
    (0, routing_controllers_1.JsonController)('file'),
    __metadata("design:paramtypes", [])
], UpdateFileDetail);
exports.UpdateFileDetail = UpdateFileDetail;
