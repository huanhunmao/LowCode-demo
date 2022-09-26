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
exports.PublishProjectPage = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const project_validate_types_1 = require("../../types/validates/project-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let PublishProjectPage = class PublishProjectPage extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Publish the specified page under the project and set it to live, including the data that the page depends on
     * 1. Get the details of the content
     * 2, get the relations of the content
     * 3, filter the relations that need to be published
     * 4, set the release status, set the live status
     *
     * When setting relation live and page live, directly set to live, no need to check status and other information
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    async index(ctx, params) {
        var _a, _b;
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { type: constant_1.TYPE.PROJECT });
            const hasAuth = await this.service.auth.folder(params.projectId, { ctx });
            if (!hasAuth) {
                return Response.accessDeny(app_config_1.i18n.system.accessDeny, 4040701);
            }
            // Get content version details
            let idVersionList = [];
            const [maxVersions, contentList] = await Promise.all([
                this.service.version.number.getContentMaxVersionByIds(params.ids),
                this.service.content.list.getDetailByIds(params.ids),
            ]);
            maxVersions.forEach((version) => idVersionList.push({
                contentId: version._id,
                version: this.service.version.number.getVersionFromNumber(version.versionNumber),
            }));
            let versionList = [];
            if (idVersionList.length > 0) {
                versionList = await this.service.version.list.getContentInfoByIdAndVersion(idVersionList);
            }
            // Get relations
            const { ids, idVersions } = this.service.relation.getRelationIdsFromVersion(versionList, [
                constant_1.TYPE.TEMPLATE,
            ]);
            // Recursively get all relations
            const allRelationList = await this.service.relation.getAllRelationsByIds(ids, idVersions);
            // TODO Need to exclude relation data under non-current projects
            // Check the validity of the relationship
            let invalidRelations = [];
            let releaseStatusIds = [];
            let liveStatusIds = {};
            allRelationList.forEach((relation) => {
                if (!relation.status || relation.status === constant_1.VERSION.STATUS_DISCARD) {
                    invalidRelations.push(relation);
                }
                else if (relation.status === constant_1.VERSION.STATUS_BASE) {
                    releaseStatusIds.push(relation.id);
                }
                liveStatusIds[relation.contentId] = relation.versionNumber || 0;
            });
            // Return wrong relation information
            if (invalidRelations.length > 0) {
                const contentIds = lodash_1.default.map(invalidRelations, 'contentId');
                const contentFileObject = await this.service.file.list.getContentFileByIds(contentIds);
                return Response.warning(app_config_1.i18n.project.invalidPageRelations + ':' + lodash_1.default.map(lodash_1.default.toArray(contentFileObject), 'name').join(','), 2040701);
            }
            // Set publishing status
            let releaseCodes = {};
            const maxObject = lodash_1.default.keyBy(maxVersions, '_id');
            this.service.version.live.bulkSetVersionStatus(releaseStatusIds, constant_1.VERSION.STATUS_RELEASE, { ctx });
            // The data of relation is set to live state, excluding data that is already live
            const liveStatusKeys = Object.keys(liveStatusIds);
            const liveStatusList = await this.service.content.list.getDetailByIds(liveStatusKeys);
            const liveStatusContentObject = lodash_1.default.keyBy(liveStatusList, 'id');
            for (const id of liveStatusKeys) {
                if (((_a = liveStatusContentObject[id]) === null || _a === void 0 ? void 0 : _a.liveVersionNumber) !== liveStatusIds[id]) {
                    this.service.content.live.setLiveContent(id, liveStatusIds[id] || 0, {
                        ctx,
                        content: { id },
                    });
                }
            }
            const contentObject = lodash_1.default.keyBy(contentList, 'id');
            const versionObject = lodash_1.default.keyBy(versionList, 'contentId');
            // The page is set to release and live status, excluding pages that are already live status
            for (const id of params.ids) {
                if (((_b = contentObject[id]) === null || _b === void 0 ? void 0 : _b.liveVersionNumber) === maxObject[id].versionNumber) {
                    continue;
                }
                const liveParams = {
                    applicationId: params.applicationId,
                    id: versionObject[id].id,
                    status: constant_1.VERSION.STATUS_RELEASE,
                };
                const releaseResult = await this.service.version.live.setVersionPublishStatus(liveParams, { ctx });
                this.service.content.live.setLiveContent(id, maxObject[id].versionNumber || 0, {
                    ctx,
                    content: contentObject[id],
                });
                releaseResult.code === 2 && (releaseCodes[id] = Object.keys(releaseResult.data));
            }
            // Page publishing results
            if (lodash_1.default.isEmpty(releaseCodes)) {
                await this.service.content.info.runTransaction(ctx.transactions);
                const newVersionList = await this.service.version.list.getContentInfoByIdAndVersion(idVersionList);
                return Response.success(newVersionList, 1040701);
            }
            else {
                return Response.warning(app_config_1.i18n.project.invalidRelationDataStatus + ':' + lodash_1.default.toArray(releaseCodes).join(','), 2040702);
            }
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.project.publishProjectPageFailed, 3040701);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Put)('/page-publish'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.publishProjectPages,
        description: '',
        tags: ['Project'],
        operationId: 'publish-project-page',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(project_validate_types_1.PublishProjectPageRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, project_validate_types_1.PublishProjectPageReq]),
    __metadata("design:returntype", Promise)
], PublishProjectPage.prototype, "index", null);
PublishProjectPage = __decorate([
    (0, routing_controllers_1.JsonController)('projects'),
    __metadata("design:paramtypes", [])
], PublishProjectPage);
exports.PublishProjectPage = PublishProjectPage;
