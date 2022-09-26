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
exports.SaveEditorComponents = void 0;
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
let SaveEditorComponents = class SaveEditorComponents extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Save multi editor, if not exist, add it
     * @param  {SaveRemotePackageReq} params
     * @returns {NewResourceDetail}
     */
    async index(ctx, params) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        try {
            const hasAuth = await this.service.auth.application(params.applicationId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4112101);
            }
            // get app component type folder id
            const componentFolderId = await this.service.folder.info.getAppTypeFolderId({
                applicationId: params.applicationId,
                type: constant_1.TYPE.COMPONENT,
            });
            // Get editor list
            const editorNames = lodash_1.default.map(params.components, 'name');
            const editorFiles = await this.service.file.list.find({
                applicationId: params.applicationId,
                folderId: componentFolderId,
                name: { $in: editorNames },
                deleted: false,
            });
            const notExistEditors = lodash_1.default.pullAll(editorNames, lodash_1.default.map(editorFiles, 'name'));
            // get editor path's match contentId
            let invalidEditorPath = [];
            await Promise.all(lodash_1.default.map(params.components, async (item) => {
                var _a, _b, _c, _d;
                const browser = ((_d = (_c = (_b = (_a = item.component) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.resource) === null || _c === void 0 ? void 0 : _c.entry) === null || _d === void 0 ? void 0 : _d.browser) || '';
                if (browser && !lodash_1.default.startsWith(browser, constant_1.PRE.CONTENT + '_')) {
                    const contentId = await this.service.resource.getContentIdByPath(item.groupId, lodash_1.default.drop(browser.split('/')));
                    !contentId && invalidEditorPath.push(browser);
                    item.component.content.resource.entry.browser = contentId;
                }
            }));
            if (invalidEditorPath.length > 0) {
                return Response.accessDeny(app_config_1.i18n.resource.invalidPath, 2112101);
            }
            // add new editor
            let newVersion = {};
            let editorNameMap = {};
            const nameFileDetail = {};
            const nameContentDetail = {};
            const editorObject = lodash_1.default.keyBy(params.components, 'name');
            for (const name of notExistEditors) {
                nameFileDetail[name] = this.service.file.info.create({
                    applicationId: params.applicationId,
                    name,
                    folderId: componentFolderId,
                    type: constant_1.TYPE.EDITOR,
                    tags: [{ type: constant_1.TAG.RESOURCE_GROUP, resourceGroupId: ((_a = editorObject[name]) === null || _a === void 0 ? void 0 : _a.groupId) || '' }]
                }, { ctx });
                nameContentDetail[name] = this.service.content.info.create({
                    title: lodash_1.default.trim(name),
                    fileId: nameFileDetail[name].id,
                }, { ctx });
                if ((_d = (_c = (_b = editorObject[name]) === null || _b === void 0 ? void 0 : _b.component) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.schema) {
                    editorObject[name].component.content.schema = JSON.stringify((_f = (_e = editorObject[name]) === null || _e === void 0 ? void 0 : _e.component) === null || _f === void 0 ? void 0 : _f.content.schema);
                }
                this.service.version.info.create({
                    contentId: nameContentDetail[name].id,
                    version: '0.0.1',
                    versionNumber: 1,
                    status: constant_1.VERSION.STATUS_BASE,
                    content: Object.assign({ id: nameContentDetail[name].id }, (_h = (_g = editorObject[name]) === null || _g === void 0 ? void 0 : _g.component) === null || _h === void 0 ? void 0 : _h.content),
                }, { ctx });
                editorNameMap[name] = { id: nameContentDetail[name].id || '', version: '0.0.1' };
            }
            // Get file content ids, get editor latest version
            const fileContent = await this.service.content.file.getContentByFileIds(lodash_1.default.map(editorFiles, 'id'));
            const maxContentVersion = await this.service.version.list.getContentMaxVersionDetail(lodash_1.default.map(fileContent, 'id'));
            // check need create version editor
            const contentObject = lodash_1.default.keyBy(fileContent, 'id');
            for (const contentId in maxContentVersion) {
                const versionBrowserId = (_l = (_k = (_j = maxContentVersion[contentId].content) === null || _j === void 0 ? void 0 : _j.resource) === null || _k === void 0 ? void 0 : _k.entry) === null || _l === void 0 ? void 0 : _l.browser;
                if (editorObject[contentObject[contentId].title]) {
                    const newVersionBrowserId = (_q = (_p = (_o = (_m = editorObject[contentObject[contentId].title].component) === null || _m === void 0 ? void 0 : _m.content) === null || _o === void 0 ? void 0 : _o.resource) === null || _p === void 0 ? void 0 : _p.entry) === null || _q === void 0 ? void 0 : _q.browser;
                    if (newVersionBrowserId && newVersionBrowserId !== versionBrowserId) {
                        newVersion[contentId] = {
                            contentId: contentId,
                            versionNumber: maxContentVersion[contentId].versionNumber + 1,
                            content: ((_r = editorObject[contentObject[contentId].title].component) === null || _r === void 0 ? void 0 : _r.content) || {},
                        };
                        editorNameMap[contentObject[contentId].title] = {
                            id: contentId || '',
                            version: this.service.version.number.getVersionFromNumber(maxContentVersion[contentId].versionNumber + 1),
                        };
                    }
                    else {
                        editorNameMap[contentObject[contentId].title] = {
                            id: contentId || '',
                            version: this.service.version.number.getVersionFromNumber(maxContentVersion[contentId].versionNumber),
                        };
                    }
                }
            }
            // create new version
            for (const contentId in newVersion) {
                if ((_s = newVersion[contentId].content) === null || _s === void 0 ? void 0 : _s.schema) {
                    newVersion[contentId].content.schema = JSON.stringify(newVersion[contentId].content.schema);
                }
                this.service.version.info.create({
                    contentId: contentId,
                    version: this.service.version.number.getVersionFromNumber(newVersion[contentId].versionNumber),
                    versionNumber: newVersion[contentId].versionNumber,
                    status: constant_1.VERSION.STATUS_BASE,
                    content: Object.assign({ id: contentId }, newVersion[contentId].content || {}),
                }, { ctx });
            }
            await this.service.file.info.runTransaction(ctx.transactions);
            return Response.success(editorNameMap, 1112101);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.saveRemoteComponentFailed, 3112101);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/editor-batch'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.saveRemoteComponents,
        description: '',
        tags: ['Component'],
        operationId: 'save-editor-component-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(index_validate_types_1.ResponseBase),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, component_validate_types_1.SaveEditorPackageReq]),
    __metadata("design:returntype", Promise)
], SaveEditorComponents.prototype, "index", null);
SaveEditorComponents = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], SaveEditorComponents);
exports.SaveEditorComponents = SaveEditorComponents;
