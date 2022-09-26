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
exports.GetAppPageFileList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const page_validate_types_1 = require("../../types/validates/page-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
;
// multi route type mapping
const typeMap = {
    'pages': constant_1.TYPE.PAGE,
    'templates': constant_1.TYPE.TEMPLATE,
    'variables': constant_1.TYPE.VARIABLE,
    'conditions': constant_1.TYPE.CONDITION,
    'functions': constant_1.TYPE.FUNCTION,
    'mocks': constant_1.TYPE.MOCK,
};
let GetAppPageFileList = class GetAppPageFileList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get a list of paging files under the app, group by app scope and project scope
     * the types list is, page|template|variable|condition|function|mock
     * response file detail with creator base info
     * @param  {AppTypeFilesReq} params
     * @returns {PageContentData[]}
     */
    async index(ctx, params) {
        const apiType = this.getRoutePath(ctx.request.url, typeMap, 1);
        const hasScopeTypes = [constant_1.TYPE.VARIABLE, constant_1.TYPE.CONDITION, constant_1.TYPE.FUNCTION, constant_1.TYPE.MOCK];
        try {
            const typePageParams = Object.assign({}, params, { type: apiType, deleted: false });
            const pageSize = this.service.file.list.setPageSize(params);
            // filter the special project type list
            if (params.scope === constant_1.TYPE.PROJECT && params.folderId) {
                typePageParams.scope = '';
                typePageParams.scopeId = params.folderId;
            }
            else if (hasScopeTypes.indexOf(apiType) !== -1) {
                typePageParams.scopeId = await this.service.folder.info.getAppTypeFolderId({
                    applicationId: params.applicationId,
                    type: apiType,
                });
            }
            const result = await this.service.file.list.getAppTypeFilePageList(typePageParams, pageSize);
            let fileList = result.list;
            let contentObject = {};
            if ((result === null || result === void 0 ? void 0 : result.list.length) > 0) {
                [fileList, contentObject] = await Promise.all([
                    this.service.file.list.getFileAssocInfo(result.list, { type: apiType }),
                    hasScopeTypes.indexOf(apiType) !== -1 ?
                        this.service.content.list.getContentObjectByFileIds(lodash_1.default.map(fileList, 'id')) :
                        {}
                ]);
                fileList = fileList.map(file => {
                    if (!file.version) {
                        file.version = {};
                    }
                    if (contentObject[file.id]) {
                        file.version.live = this.service.version.number.getVersionFromNumber(contentObject[file.id].liveVersionNumber);
                    }
                    return hasScopeTypes.indexOf(apiType) === -1 ? lodash_1.default.omit(file, 'version') : file;
                });
            }
            return Response.success({
                pageInfo: this.paging(result.count, pageSize),
                data: fileList,
            }, 1170601);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.page.getAppPageFileFailed, 1170601);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('pages/file-searchs'),
    (0, routing_controllers_1.Get)('templates/file-searchs'),
    (0, routing_controllers_1.Get)('variables/file-searchs'),
    (0, routing_controllers_1.Get)('conditions/file-searchs'),
    (0, routing_controllers_1.Get)('functions/file-searchs'),
    (0, routing_controllers_1.Get)('mocks/file-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppTypeFileList,
        description: '',
        tags: ['Page'],
        operationId: 'get-app-type-file-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(page_validate_types_1.AppContentListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, page_validate_types_1.AppTypeFilesReq]),
    __metadata("design:returntype", Promise)
], GetAppPageFileList.prototype, "index", null);
GetAppPageFileList = __decorate([
    (0, routing_controllers_1.JsonController)(''),
    __metadata("design:paramtypes", [])
], GetAppPageFileList);
exports.GetAppPageFileList = GetAppPageFileList;
