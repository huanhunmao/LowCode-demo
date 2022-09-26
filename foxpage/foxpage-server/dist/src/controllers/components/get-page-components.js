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
exports.GetPageComponentList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetPageComponentList = class GetPageComponentList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the paging list of components under the application
     * @param  {AppPageListCommonReq} params
     * @returns {FileUserInfo}
     */
    async index(params) {
        try {
            this.service.folder.info.setPageSize(params);
            // Get the root folder id of the component
            const appComponentFolderId = await this.service.folder.info.getAppTypeFolderId({
                applicationId: params.applicationId,
                type: constant_1.TYPE.COMPONENT,
            });
            if (!appComponentFolderId) {
                return Response.warning(app_config_1.i18n.component.invalidFolderType, 2111101);
            }
            const fileParams = {
                applicationId: params.applicationId,
                folderId: appComponentFolderId,
                type: params.type,
                search: params.search,
                sort: { createTime: -1 },
                from: (params.page - 1) * params.size,
                to: params.page * params.size,
            };
            const fileList = await this.service.file.list.getPageData(fileParams);
            // Get normal and referenced file ids
            let fileIds = [];
            let referenceIds = [];
            lodash_1.default.map(fileList.list, (file) => {
                var _a;
                if (file.tags && ((_a = file.tags[0]) === null || _a === void 0 ? void 0 : _a.type) === constant_1.TAG.DELIVERY_REFERENCE) {
                    referenceIds.push(file.tags[0].reference.id);
                }
                else {
                    fileIds.push(file.id);
                }
            });
            const [contentList, referenceList, onlineList] = await Promise.all([
                this.service.content.file.getContentByFileIds(fileIds),
                this.service.content.file.getContentByFileIds(referenceIds),
                this.service.store.goods.find({ 'details.id': { $in: fileIds }, status: 1, deleted: false }),
            ]);
            const contentObject = lodash_1.default.keyBy(contentList, 'fileId');
            const referenceObject = lodash_1.default.keyBy(referenceList, 'fileId');
            const fileOnlineObject = lodash_1.default.keyBy(lodash_1.default.map(onlineList, 'details'), 'id');
            const componentBuildVersionObject = await this.service.version.list.getContentMaxVersionDetail(lodash_1.default.concat(lodash_1.default.map(contentList, 'id'), lodash_1.default.map(referenceList, 'id')));
            let fileContentList = [];
            fileList.list.forEach((file) => {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                let contentId = ((_a = contentObject[file.id]) === null || _a === void 0 ? void 0 : _a.id) || ((_e = referenceObject[(_d = (_c = (_b = file === null || file === void 0 ? void 0 : file.tags) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.reference) === null || _d === void 0 ? void 0 : _d.id]) === null || _e === void 0 ? void 0 : _e.id) || '';
                let liveVersionNumber = ((_f = contentObject[file.id]) === null || _f === void 0 ? void 0 : _f.liveVersionNumber) || 0;
                if (liveVersionNumber === 0 && ((_h = (_g = file.tags) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.type) === constant_1.TAG.DELIVERY_REFERENCE) {
                    liveVersionNumber = ((_m = referenceObject[(_l = (_k = (_j = file === null || file === void 0 ? void 0 : file.tags) === null || _j === void 0 ? void 0 : _j[0]) === null || _k === void 0 ? void 0 : _k.reference) === null || _l === void 0 ? void 0 : _l.id]) === null || _m === void 0 ? void 0 : _m.liveVersionNumber) || 0;
                }
                fileContentList.push(Object.assign({
                    release: liveVersionNumber > 0 ? this.service.version.number.getVersionFromNumber(liveVersionNumber) : '',
                    base: componentBuildVersionObject[contentId] &&
                        componentBuildVersionObject[contentId].status === constant_1.VERSION.STATUS_BASE ?
                        componentBuildVersionObject[contentId].version : '',
                    online: !!fileOnlineObject[file.id],
                    contentId
                }, file));
            });
            return Response.success({
                data: fileContentList,
                pageInfo: {
                    page: params.page,
                    size: params.size,
                    total: fileList.count,
                },
            }, 1111101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.getPagePagesFailed, 3111101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getPageComponentsList,
        description: '',
        tags: ['Component'],
        operationId: 'get-page-component-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileListRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [component_validate_types_1.AppComponentListReq]),
    __metadata("design:returntype", Promise)
], GetPageComponentList.prototype, "index", null);
GetPageComponentList = __decorate([
    (0, routing_controllers_1.JsonController)('component-searchs'),
    __metadata("design:paramtypes", [])
], GetPageComponentList);
exports.GetPageComponentList = GetPageComponentList;
