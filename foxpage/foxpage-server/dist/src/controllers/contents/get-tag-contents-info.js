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
exports.GetTagContentInfo = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetTagContentInfo = class GetTagContentInfo extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the content and version information of the specified tag
     * Response：
     * {
     * content: {content info}
     * contentInfo: {
     *  pages: [{content version info}]，
     *  templates: [{template version info}]
     *  variables: [{variable version info}]
     *  conditions: [{condition version info}]
     *  functions: [{function version info}]
     * ....
     * }}
     * @param  {TagContentVersionReq} params
     * @returns {ContentInfo}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            if (!params.tags) {
                params.tags = [];
            }
            // Get qualified content details
            const contentVersionList = await this.service.content.tag.getAppContentByTags(params);
            // Return empty results
            if (contentVersionList.length === 0) {
                return Response.success([], 1160501);
            }
            // Get content details, relation version details
            let contentVersionObject = {};
            let relationObject = {};
            const contentIds = lodash_1.default.map(contentVersionList, (version) => {
                var _a;
                contentVersionObject[version.id] = version;
                relationObject[version.id] = ((_a = version.content) === null || _a === void 0 ? void 0 : _a.relation) || {};
                return version.id;
            });
            let contentList = [];
            let relationDetails = {};
            [contentList, relationDetails] = await Promise.all([
                this.service.content.info.getDetailByIds(contentIds),
                this.service.version.relation.getRelationDetail(relationObject),
            ]);
            const contentFileIds = lodash_1.default.map(contentList, 'fileId');
            let contentFileObject;
            if (contentFileIds.length > 0) {
                const fileList = await this.service.file.list.getDetailByIds(contentFileIds);
                contentFileObject = lodash_1.default.keyBy(fileList, 'id');
            }
            // Combine the returned data
            let tagContentList = [];
            let contentInfo = {};
            contentList.forEach((content) => {
                var _a;
                const contentRelation = relationDetails[content.id] || {};
                // Combine the classified content of content info
                const fileObject = lodash_1.default.keyBy(contentRelation.files, 'id');
                const contentObject = lodash_1.default.keyBy(contentRelation.contents, 'id');
                const versionObject = lodash_1.default.keyBy(contentRelation.versions, 'contentId');
                contentInfo[content.id] = { pages: [] };
                (_a = contentRelation.contents) === null || _a === void 0 ? void 0 : _a.forEach((relation) => {
                    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                    const fileType = ((contentObject[relation.id] && fileObject[contentObject[relation.id].fileId]
                        ? fileObject[contentObject[relation.id].fileId].type + 's'
                        : ''));
                    contentInfo[content.id] = {
                        pages: [
                            Object.assign({}, (_a = contentVersionObject[content.id]) === null || _a === void 0 ? void 0 : _a.content, {
                                dslVersion: ((_b = contentVersionObject[content.id]) === null || _b === void 0 ? void 0 : _b.dslVersion) || constant_1.DSL_VERSION,
                                name: content.title,
                                version: (_c = contentVersionObject[content.id]) === null || _c === void 0 ? void 0 : _c.version,
                                versionNumber: this.service.version.number.createNumberFromVersion(((_d = contentVersionObject[content.id]) === null || _d === void 0 ? void 0 : _d.version) || '0.0.1'),
                                fileId: content.fileId
                            })
                        ]
                    };
                    if (fileType) {
                        !contentInfo[content.id][fileType] && (contentInfo[content.id][fileType] = []);
                        (_e = contentInfo[content.id][fileType]) === null || _e === void 0 ? void 0 : _e.push(Object.assign({}, ((_f = versionObject[relation.id]) === null || _f === void 0 ? void 0 : _f.content) || undefined, {
                            name: (_g = contentObject[relation.id]) === null || _g === void 0 ? void 0 : _g.title,
                            version: (_h = versionObject[relation.id]) === null || _h === void 0 ? void 0 : _h.version,
                            versionNumber: this.service.version.number.createNumberFromVersion(((_j = versionObject[relation.id]) === null || _j === void 0 ? void 0 : _j.version) || '0.0.1'),
                            fileId: (_k = contentObject[relation.id]) === null || _k === void 0 ? void 0 : _k.fileId
                        }));
                    }
                });
                contentInfo[content.id].files = (contentFileObject[content.fileId]
                    ? [contentFileObject[content.fileId]]
                    : []);
                tagContentList.push({ content: content, contentInfo: contentInfo[content.id] || {} });
            });
            return Response.success(tagContentList, 1160501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.content.getContentListFailed, 3160501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)('/tag-versions'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getContentTagsVersions,
        description: '',
        tags: ['Content'],
        operationId: 'get-tag-content-version',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.TagVersionRelationRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, content_validate_types_1.TagContentVersionReq]),
    __metadata("design:returntype", Promise)
], GetTagContentInfo.prototype, "index", null);
GetTagContentInfo = __decorate([
    (0, routing_controllers_1.JsonController)('content'),
    __metadata("design:paramtypes", [])
], GetTagContentInfo);
exports.GetTagContentInfo = GetTagContentInfo;
