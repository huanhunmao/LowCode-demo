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
exports.AddApplicationDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const app_validate_types_1 = require("../../types/validates/app-validate-types");
const Response = __importStar(require("../../utils/response"));
const tools_1 = require("../../utils/tools");
const base_controller_1 = require("../base-controller");
let AddApplicationDetail = class AddApplicationDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Create application info, include default type folders in application root, eg. project,
     * variable, condition and function folder etc.
     * @param  {AddAppDetailReq} params
     * @param  {Header} headers
     * @returns {AppWithFolder}
     */
    async index(ctx, params) {
        try {
            const validOrg = await this.service.org.checkOrgValid(params.organizationId);
            if (!validOrg) {
                return Response.warning(app_config_1.i18n.org.invalidOrgId, 2030101);
            }
            // Check if the same slug exists under the organization
            if (params.slug) {
                const appDetail = await this.service.application.getDetail(lodash_1.default.pick(params, ['organizationId', 'slug']));
                if (appDetail && !appDetail.deleted) {
                    return Response.warning(app_config_1.i18n.app.appSlugExist, 2030102);
                }
            }
            // Check locale can not repeat or invalid valid
            let checkedLocales = [];
            lodash_1.default.map(params.locales || [], (locale) => {
                locale.length === 5 && checkedLocales.push(locale);
            });
            if (lodash_1.default.uniq(checkedLocales).length !== (params.locales || []).length) {
                return Response.warning(app_config_1.i18n.app.invalidLocales, 2030103);
            }
            // Create application
            const appParams = Object.assign({ id: (0, tools_1.generationId)(constant_1.PRE.APP) }, params);
            this.service.application.create(appParams, { ctx });
            // Create default root folders
            const folderTypes = [
                constant_1.TYPE.PROJECT,
                constant_1.TYPE.VARIABLE,
                constant_1.TYPE.CONDITION,
                constant_1.TYPE.COMPONENT,
                constant_1.TYPE.LIBRARY,
                constant_1.TYPE.RESOURCE,
                constant_1.TYPE.FUNCTION,
            ];
            for (const name of folderTypes) {
                this.service.folder.info.create({
                    applicationId: appParams.id,
                    name: '_' + name,
                    tags: [{ type: name }],
                }, { ctx });
            }
            // save info
            await this.service.application.runTransaction(ctx.transactions);
            const appDetailWithFolder = await this.service.application.getAppDetailWithFolder(appParams.id);
            ctx.logAttr = Object.assign(ctx.logAttr, { id: appParams.id, type: constant_1.TYPE.APPLICATION });
            return Response.success(appDetailWithFolder, 1030101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.app.addNewDetailFailed, 3030101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.addAppDetail,
        description: '',
        tags: ['Application'],
        operationId: 'add-application-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(app_validate_types_1.AppDetailWithFolderRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, app_validate_types_1.AddAppDetailReq]),
    __metadata("design:returntype", Promise)
], AddApplicationDetail.prototype, "index", null);
AddApplicationDetail = __decorate([
    (0, routing_controllers_1.JsonController)('applications'),
    __metadata("design:paramtypes", [])
], AddApplicationDetail);
exports.AddApplicationDetail = AddApplicationDetail;
