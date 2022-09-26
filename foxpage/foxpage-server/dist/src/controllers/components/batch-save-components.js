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
exports.SaveRemoteComponents = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const index_validate_types_1 = require("../../types/validates/index-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let SaveRemoteComponents = class SaveRemoteComponents extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Check if remote resources exist,
     *    if not, add it, then response the mapping of content id and path
     *    if exist, get resource content id and mapping with path
     * Add content and version detail if component version not exist
     * @param  {SaveRemotePackageReq} params
     * @returns {NewResourceDetail}
     */
    async index(ctx, params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        try {
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4110301);
            }
            let componentFileIds = [];
            params.components.map((item) => {
                var _a;
                ((_a = item === null || item === void 0 ? void 0 : item.component) === null || _a === void 0 ? void 0 : _a.id) && componentFileIds.push(item.component.id);
            });
            let appTypeId = '';
            let fileContentObject = {};
            let componentFileList = [];
            [appTypeId, fileContentObject, componentFileList] = await Promise.all([
                this.service.folder.info.getAppTypeFolderId({
                    applicationId: params.applicationId,
                    type: constant_1.TYPE.COMPONENT
                }),
                this.service.content.list.getContentObjectByFileIds(componentFileIds),
                this.service.file.list.getDetailByIds(componentFileIds),
            ]);
            const componentFileObject = lodash_1.default.keyBy(lodash_1.default.filter(componentFileList, { deleted: false }), 'id');
            let errMsg = {};
            for (const item of params.components) {
                const checkResult = await this.service.resource.checkRemoteResourceExist([item.resource], {
                    id: item.resource.groupId,
                    applicationId: params.applicationId,
                });
                // create file if not exist
                if (!((_a = item === null || item === void 0 ? void 0 : item.component) === null || _a === void 0 ? void 0 : _a.id) || ((_b = componentFileObject[item.component.id]) === null || _b === void 0 ? void 0 : _b.deleted) !== false) {
                    const componentDetail = await this.service.file.info.getDetail({
                        folderId: appTypeId,
                        name: item.resource.name,
                        deleted: false,
                    });
                    if (!componentDetail || lodash_1.default.isEmpty(componentDetail)) {
                        const fileDetail = this.service.file.info.create({
                            applicationId: params.applicationId || '',
                            name: lodash_1.default.trim(item.resource.name) || '',
                            folderId: appTypeId,
                            type: constant_1.TYPE.COMPONENT,
                        }, { ctx });
                        item.component.id = fileDetail.id;
                    }
                    else {
                        item.component.id = componentDetail.id;
                    }
                }
                const entries = ((_d = (_c = item.component.content) === null || _c === void 0 ? void 0 : _c.resource) === null || _d === void 0 ? void 0 : _d.entry) || {};
                let editorEntry = ((_f = (_e = item.component.content) === null || _e === void 0 ? void 0 : _e.resource) === null || _f === void 0 ? void 0 : _f['editor-entry'][0]) || {};
                if (checkResult.code === 0) {
                    // Resource not exist
                    const contentIdMap = this.service.resource.saveResources([item.resource], {
                        ctx,
                        applicationId: params.applicationId,
                        folderId: item.resource.groupId,
                    });
                    // Mapping component entry and resource content id
                    for (const entryItem in entries) {
                        if (!((_g = entries[entryItem]) === null || _g === void 0 ? void 0 : _g.contentId) && ((_h = entries[entryItem]) === null || _h === void 0 ? void 0 : _h.path)) {
                            // need to remove groupName, resourceName and version in entries[entryItem]
                            entries[entryItem] = lodash_1.default.get(contentIdMap[item.resource.resourceName], lodash_1.default.drop(entries[entryItem].path.split('/'), 3));
                        }
                    }
                    if (!editorEntry.id && editorEntry.path) {
                        editorEntry.id = lodash_1.default.get(contentIdMap[item.resource.resourceName], lodash_1.default.drop(editorEntry.path.split('/'), 3));
                        delete editorEntry.contentId;
                        delete editorEntry.path;
                    }
                }
                else {
                    // Resource exist, replace it by content id direct
                    const pathPre = [
                        item.resource.groupName,
                        item.resource.resourceName,
                        item.resource.version,
                        '',
                    ].join('/');
                    for (const entryItem in entries) {
                        const itemPath = ((_j = entries[entryItem]) === null || _j === void 0 ? void 0 : _j.path) || '';
                        if ((_l = (_k = checkResult.contentPath) === null || _k === void 0 ? void 0 : _k[item.resource.id]) === null || _l === void 0 ? void 0 : _l[lodash_1.default.replace(itemPath, pathPre, '')]) {
                            entries[entryItem] =
                                checkResult.contentPath[item.resource.id][lodash_1.default.replace(itemPath, pathPre, '')];
                        }
                        else {
                            entries[entryItem] = await this.service.resource.getContentIdByPath(item.resource.groupId, lodash_1.default.drop(itemPath.split('/')));
                        }
                    }
                    if (!editorEntry.id && editorEntry.path) {
                        if ((_o = (_m = checkResult.contentPath) === null || _m === void 0 ? void 0 : _m[item.resource.id]) === null || _o === void 0 ? void 0 : _o[lodash_1.default.replace(editorEntry.path, pathPre, '')]) {
                            editorEntry.id =
                                checkResult.contentPath[item.resource.id][lodash_1.default.replace(editorEntry.path, pathPre, '')];
                        }
                        else {
                            editorEntry.id = await this.service.resource.getContentIdByPath(item.resource.groupId, lodash_1.default.drop(editorEntry.path.split('/')));
                        }
                        delete editorEntry.contentId;
                        delete editorEntry.path;
                    }
                }
                // Save component info
                let componentContentId = ((_p = fileContentObject[item.component.id]) === null || _p === void 0 ? void 0 : _p.id) || '';
                if (!componentContentId) {
                    // Add component content
                    const contentDetail = this.service.content.info.create({ title: item.resource.name || '', fileId: item.component.id }, { ctx });
                    componentContentId = contentDetail.id;
                }
                // Check if version has exist, and check file group resource tag
                const [versionDetail, componentFileDetail] = await Promise.all([
                    this.service.version.info.find({
                        contentId: componentContentId,
                        version: item.component.version,
                        deleted: false,
                    }),
                    this.service.file.info.getDetailById(item.component.id),
                ]);
                // Version has exist
                if (versionDetail.length > 0 || lodash_1.default.has(versionDetail[0], 'id')) {
                    errMsg = {
                        code: 1,
                        data: [((_q = fileContentObject[item.component.id]) === null || _q === void 0 ? void 0 : _q.title) || '', item.component.version],
                    };
                    break;
                }
                // Update file tag
                const fileTags = componentFileDetail.tags || [];
                const fileResourceGroupDetail = lodash_1.default.find(fileTags, (tag) => {
                    return tag.type === constant_1.TAG.RESOURCE_GROUP && tag.resourceGroupId;
                });
                if (!fileResourceGroupDetail || !fileResourceGroupDetail.resourceGroupId) {
                    fileTags.push({ type: constant_1.TAG.RESOURCE_GROUP, resourceGroupId: item.resource.groupId });
                    ctx.transactions.push(this.service.file.info.updateDetailQuery(item.component.id, { tags: fileTags }));
                }
                if (item.component.content.schema) {
                    item.component.content.schema = JSON.stringify(item.component.content.schema);
                }
                // Add component new version
                this.service.version.info.create({
                    contentId: componentContentId,
                    version: item.component.version,
                    versionNumber: this.service.version.number.createNumberFromVersion(item.component.version),
                    content: Object.assign({ id: componentContentId }, item.component.content || {}),
                }, { ctx });
            }
            // Response error msg
            if (errMsg.code) {
                return Response.warning(app_config_1.i18n.component.versionExist + ':' + errMsg.data.join(','), 2110301);
            }
            await this.service.file.info.runTransaction(ctx.transactions);
            return Response.success(app_config_1.i18n.component.saveRemoteComponentSuccess, 1110301);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.saveRemoteComponentFailed, 3110301);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/batch'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.saveRemoteComponents,
        description: '',
        tags: ['Component'],
        operationId: 'save-remote-component-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(index_validate_types_1.ResponseBase),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, component_validate_types_1.SaveRemotePackageReq]),
    __metadata("design:returntype", Promise)
], SaveRemoteComponents.prototype, "index", null);
SaveRemoteComponents = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], SaveRemoteComponents);
exports.SaveRemoteComponents = SaveRemoteComponents;
