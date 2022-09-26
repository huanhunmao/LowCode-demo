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
exports.AddFileDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let AddFileDetail = class AddFileDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create document details
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    async index(ctx, params) {
        // Check the validity of the name
        if (!(0, tools_1.checkName)(params.name)) {
            return Response.warning(app_config_1.i18n.file.invalidName, 2170101);
        }
        try {
            const [appDetail, fileExist] = await Promise.all([
                this.service.application.getDetailById(params.applicationId),
                this.service.file.info.getDetail(Object.assign({ deleted: false }, params)),
            ]);
            // Check the validity of the application ID
            if (!appDetail) {
                return Response.warning(app_config_1.i18n.app.idInvalid, 2170102);
            }
            // Check the existence of the file
            if (fileExist) {
                return Response.warning(app_config_1.i18n.file.nameExist, 2170103);
            }
            // Add file info
            const fileDetail = Object.assign({}, params, { id: (0, tools_1.generationId)(constant_1.PRE.FILE), creator: '' });
            this.service.file.info.create(fileDetail, { ctx });
            // By default, a content page is created at the same time as the file is created
            const contentDetail = {
                id: (0, tools_1.generationId)(constant_1.PRE.CONTENT),
                title: params.name,
                fileId: fileDetail.id,
                tags: [],
                creator: '',
                liveVersionNumber: 0,
            };
            this.service.content.info.create(contentDetail, { ctx });
            // For page type file, template, a content version needs to be created by default
            if (['page', 'template'].indexOf(params.type) !== -1) {
                const newVersionDetail = {
                    id: (0, tools_1.generationId)(constant_1.PRE.CONTENT_VERSION),
                    contentId: contentDetail.id,
                    version: '0.0.1',
                    versionNumber: 1,
                    creator: '',
                    content: { id: contentDetail.id },
                };
                this.service.version.info.create(newVersionDetail, { ctx });
            }
            await this.service.file.info.runTransaction(ctx.transactions);
            const newFileDetail = await this.service.file.info.getDetailById(fileDetail.id);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: newFileDetail.id, type: constant_1.TYPE.FILE });
            return Response.success(newFileDetail, 1170101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.file.addNewFailed, 3170101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/detail'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addFileDetail,
        description: '',
        tags: ['File'],
        operationId: 'add-file-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.FileDetailReq]),
    __metadata("design:returntype", Promise)
], AddFileDetail.prototype, "index", null);
AddFileDetail = __decorate([
    (0, routing_controllers_1.JsonController)('file'),
    __metadata("design:paramtypes", [])
], AddFileDetail);
exports.AddFileDetail = AddFileDetail;
