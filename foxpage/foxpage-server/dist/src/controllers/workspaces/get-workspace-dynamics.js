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
exports.GetWorkspaceDynamicList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const log_validate_types_1 = require("../../types/validates/log-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetWorkspaceDynamicList = class GetWorkspaceDynamicList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get current user page data operation.
     *
     * @param  {WorkspaceDynamicListReq} params
     * @returns {Log}
     */
    async index(ctx, params) {
        try {
            const creator = ctx.userInfo.id;
            if (!creator) {
                return Response.warning(app_config_1.i18n.user.invalidUser, 2140201);
            }
            const orgDetail = await this.service.org.getDetail({
                id: params.organizationId,
                members: { $elemMatch: { userId: ctx.userInfo.id, status: true } },
            });
            if (!orgDetail || lodash_1.default.isEmpty(orgDetail)) {
                return Response.success({
                    pageInfo: {
                        page: params.page,
                        size: params.size,
                        total: 0,
                    },
                    data: [],
                }, 1140202);
            }
            this.service.folder.info.setPageSize(params);
            // Default time range is last 7 days
            if (!params.startTime || !params.endTime) {
                params.startTime = new Date().getTime() - 7 * 86400000;
                params.endTime = new Date().getTime();
            }
            const operationResult = await this.service.log.getUserOperationList(Object.assign({ operator: creator, organizationId: orgDetail.id }, params));
            // Get operation data base info, include app name
            let versionIds = [];
            let contentIds = [];
            let fileIds = [];
            let folderIds = [];
            let applicationIds = [];
            let userIds = [];
            operationResult.list.forEach((data) => {
                var _a, _b, _c, _d, _e, _f;
                ((_a = data.category) === null || _a === void 0 ? void 0 : _a.versionId) && versionIds.push(data.category.versionId);
                ((_b = data.category) === null || _b === void 0 ? void 0 : _b.contentId) && contentIds.push(data.category.contentId);
                ((_c = data.category) === null || _c === void 0 ? void 0 : _c.fileId) && fileIds.push(data.category.fileId);
                ((_d = data.category) === null || _d === void 0 ? void 0 : _d.folderId) && folderIds.push(data.category.folderId);
                ((_e = data.category) === null || _e === void 0 ? void 0 : _e.applicationId) && applicationIds.push((_f = data.category) === null || _f === void 0 ? void 0 : _f.applicationId);
                userIds.push(data.operator);
            });
            const [versionObject, contentObject, fileObject, folderObject, appObject, userObject,] = await Promise.all([
                this.service.version.info.getDetailObjectByIds(lodash_1.default.uniq(versionIds)),
                this.service.content.info.getDetailObjectByIds(lodash_1.default.uniq(contentIds)),
                this.service.file.info.getDetailObjectByIds(lodash_1.default.uniq(fileIds)),
                this.service.folder.info.getDetailObjectByIds(lodash_1.default.uniq(folderIds)),
                this.service.application.getDetailObjectByIds(lodash_1.default.uniq(applicationIds)),
                this.service.user.getUserBaseObjectByIds(userIds),
            ]);
            let dynamicList = [];
            operationResult.list.forEach((log) => {
                var _a, _b, _c, _d, _e;
                log.category.versionId &&
                    (log.category.version = ((_a = versionObject[log.category.versionId]) === null || _a === void 0 ? void 0 : _a.version) || '');
                log.category.contentId &&
                    (log.category.contentName = ((_b = contentObject[log.category.contentId]) === null || _b === void 0 ? void 0 : _b.title) || '');
                log.category.fileId && (log.category.fileName = ((_c = fileObject[log.category.fileId]) === null || _c === void 0 ? void 0 : _c.name) || '');
                log.category.folderId && (log.category.folderName = ((_d = folderObject[log.category.folderId]) === null || _d === void 0 ? void 0 : _d.name) || '');
                log.category.applicationId &&
                    (log.category.applicationName = ((_e = appObject[log.category.applicationId]) === null || _e === void 0 ? void 0 : _e.name) || '');
                const actionArr = log.action.split('_');
                const actionTypeArr = log.actionType.split('_');
                dynamicList.push(Object.assign({}, log, {
                    dataType: {
                        scope: actionArr[0] || '',
                        type: actionTypeArr[1] || '',
                        action: actionTypeArr[0] || '',
                    },
                    creator: userObject[log.operator] || {},
                }));
            });
            return Response.success({
                pageInfo: {
                    page: params.page,
                    size: params.size,
                    total: operationResult.count,
                },
                data: dynamicList,
            }, 1140201);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.page.getWorkspaceDynamicListFailed, 3140201);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/dynamic-searchs'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getWorkspaceDynamicList,
        description: '',
        tags: ['Workspace'],
        operationId: 'get-workspace-dynamic-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(log_validate_types_1.DynamicListRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, log_validate_types_1.WorkspaceDynamicListReq]),
    __metadata("design:returntype", Promise)
], GetWorkspaceDynamicList.prototype, "index", null);
GetWorkspaceDynamicList = __decorate([
    (0, routing_controllers_1.JsonController)('workspaces'),
    __metadata("design:paramtypes", [])
], GetWorkspaceDynamicList);
exports.GetWorkspaceDynamicList = GetWorkspaceDynamicList;
