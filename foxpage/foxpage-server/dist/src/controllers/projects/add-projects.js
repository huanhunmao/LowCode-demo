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
exports.AddProjectDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const project_validate_types_1 = require("../../types/validates/project-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let AddProjectDetail = class AddProjectDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create Project
     * 1, Get the parent folder Id of the project under the application
     * 2. Check if the project name is duplicated
     * 3, Create project
     * @param  {FolderDetailReq} params
     * @param  {Header} headers
     * @returns {Folder}
     */
    async index(ctx, params) {
        if (!(0, tools_1.checkName)(params.name)) {
            return Response.warning(app_config_1.i18n.project.invalidProjectName, 2040201);
        }
        try {
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4040203);
            }
            const folderDetail = Object.assign(lodash_1.default.omit(params, 'path'), {
                id: (0, tools_1.generationId)(constant_1.PRE.FOLDER),
                parentFolderId: '',
                folderPath: params.path ? (0, tools_1.formatToPath)(params.path) : (0, tools_1.formatToPath)(params.name),
                tags: [{ type: constant_1.TYPE.PROJECT_FOLDER }],
                creator: ctx.userInfo.id,
            });
            const result = await this.service.folder.info.addTypeFolderDetail(folderDetail, {
                ctx,
                type: constant_1.TYPE.PROJECT,
                actionType: [constant_1.LOG.CREATE, constant_1.TYPE.PROJECT].join('_'),
            });
            if (result.code === 1) {
                return Response.warning(app_config_1.i18n.project.invalidType, 2040202);
            }
            else if (result.code === 2) {
                return Response.warning(app_config_1.i18n.project.projectNameExist, 2040203);
            }
            await this.service.folder.info.runTransaction(ctx.transactions);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: folderDetail.id, type: constant_1.TYPE.PROJECT });
            return Response.success(result.data, 1040201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.project.addProjectFailed, 3040201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('projects'),
    (0, routing_controllers_1.Post)('workspace/projects'),
    (0, routing_controllers_1.Post)('applications/projects'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addProjectDetail,
        description: '/project/detail',
        tags: ['Project'],
        operationId: 'add-project-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(project_validate_types_1.ProjectDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_validate_types_1.AddProjectDetailReq]),
    __metadata("design:returntype", Promise)
], AddProjectDetail.prototype, "index", null);
AddProjectDetail = __decorate([
    (0, routing_controllers_1.JsonController)(),
    __metadata("design:paramtypes", [])
], AddProjectDetail);
exports.AddProjectDetail = AddProjectDetail;
