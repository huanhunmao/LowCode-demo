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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionLiveService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class VersionLiveService extends base_service_1.BaseService {
    constructor() {
        super(Model.version);
    }
    /**
     * Single instance
     * @returns VersionLiveService
     */
    static getInstance() {
        this._instance || (this._instance = new VersionLiveService());
        return this._instance;
    }
    /**
     * Get the live version details of the specified type of content under the specified application
     * @param  {AppTypeContent} params
     * @returns {ContentVersion[]} Promise
     */
    async getContentLiveDetails(params) {
        const contentIds = params.contentIds || [];
        if (contentIds.length === 0) {
            return [];
        }
        // Get live details
        const contentLiveInfo = await Service.content.list.getContentLiveInfoByIds(contentIds);
        let contentVersionList = [];
        if (contentLiveInfo.length > 0) {
            contentVersionList = await Service.version.list.getContentInfoByIdAndNumber(contentLiveInfo);
        }
        return contentVersionList;
    }
    /**
     * Set the release status of the version, which can only be set from the base version to other versions
     * Only set status to release, not set current data to live
     * @param  {VersionPublish} params
     * @param  {boolean} liveRelation, Mark whether to publish and set the relation associated with the version of live
     * @returns Promise
     */
    async setVersionPublishStatus(params, options) {
        var _a, _b;
        const liveRelation = options.liveRelation || false;
        // Check the status of the version
        const versionDetail = await this.getDetailById(params.id);
        // TODO Need to judge that it is allowed to change from any state to discard
        if (!versionDetail || versionDetail.status !== constant_1.VERSION.STATUS_BASE) {
            return { code: 1 }; // The current status does not allow re-publishing
        }
        // Update version status
        options.ctx.transactions.push(Model.version.updateDetailQuery(params.id, { status: params.status }));
        // Save relation information
        const [contentDetail, invalidRelation] = await Promise.all([
            Service.content.info.getDetailById(versionDetail.contentId),
            Service.relation.checkRelationStatus(((_a = versionDetail === null || versionDetail === void 0 ? void 0 : versionDetail.content) === null || _a === void 0 ? void 0 : _a.relation) || {}),
        ]);
        if (!lodash_1.default.isEmpty(invalidRelation)) {
            return { code: 2, data: invalidRelation };
        }
        // Set the live status of relations
        if (liveRelation) {
            // Get relation and relation's relation infos
            const relations = await Service.version.relation.getVersionRelations({ [params.id]: versionDetail }, false);
            const relationIds = lodash_1.default.keys(relations);
            const contentMock = Service.content.info.getContentExtension(contentDetail, ['mockId']);
            if (!!contentMock.mockId) {
                relationIds.push(contentMock.mockId);
            }
            const relationsLatestVersion = await Service.version.list.getContentMaxVersionDetail(relationIds, constant_1.VERSION.STATUS_BASE);
            if (!lodash_1.default.isEmpty(relationsLatestVersion)) {
                const relationList = lodash_1.default.toArray(relationsLatestVersion);
                // Set publish status
                options.ctx.transactions.push(Service.version.live.bulkSetVersionStatus(lodash_1.default.map(relationList, 'id'), constant_1.VERSION.STATUS_RELEASE));
                // Set live status
                for (const relation of relationList) {
                    Service.content.live.setLiveContent(relation.contentId, relation.versionNumber, {
                        ctx: options.ctx,
                        content: { id: relation.contentId },
                    });
                }
            }
        }
        // Add the relation information to the relation table
        await Service.relation.saveRelations(versionDetail.contentId, versionDetail.versionNumber, ((_b = versionDetail === null || versionDetail === void 0 ? void 0 : versionDetail.content) === null || _b === void 0 ? void 0 : _b.relation) || {}, { ctx: options.ctx });
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.PUBLISH, versionDetail, {
            actionType: options.actionType || [constant_1.LOG.LIVE, constant_1.TYPE.CONTENT].join('_'),
            category: { type: constant_1.TYPE.CONTENT, contentId: contentDetail.id, fileId: contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.fileId },
        }));
        return { code: 0, data: versionDetail };
    }
    /**
     * Batch set the specified version to the specified state
     * @param  {string[]} versionIds
     * @returns void
     */
    bulkSetVersionStatus(versionIds, status, options) {
        let query = {};
        if (versionIds.length > 0) {
            query = Model.version.batchUpdateDetailQuery({ id: { $in: versionIds } }, { status });
            if (options === null || options === void 0 ? void 0 : options.ctx) {
                options.ctx.transactions.push(query);
                versionIds.forEach((versionId) => {
                    options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.VERSION_STATUS, {}, {
                        actionType: constant_1.LOG.VERSION_STATUS,
                        category: { versionId: versionId },
                    }));
                });
            }
        }
        return query;
    }
    /**
     * Get the version details of the specified contentIds and the corresponding relation details
     * @param  {string} applicationId
     * @param  {string[]} contentIds
     * @param  {boolean=false} isBuild Whether to take the live version
     * @returns string
     */
    async getContentAndRelationVersion(contentIds, isBuild = false) {
        var _a;
        let pageList = [];
        if (isBuild) {
            const versionObject = await Service.version.list.getContentMaxVersionDetail(contentIds);
            pageList = lodash_1.default.toArray(versionObject);
        }
        else {
            pageList = await Service.content.live.getContentLiveDetails({
                applicationId: '',
                type: constant_1.TYPE.PAGE,
                contentIds: contentIds,
            });
        }
        let pageContentRelations = [];
        let dependMissing = []; // Invalid dependency information
        let recursiveItem = ''; // Circular dependency information
        for (const page of pageList) {
            dependMissing = [];
            recursiveItem = '';
            const result = await Service.content.relation.getRelationDetailRecursive(((_a = page.content) === null || _a === void 0 ? void 0 : _a.relation) || {}, {}, isBuild);
            // There is a circular dependency or missing dependency information
            if (result.recursiveItem || result.missingRelations.length > 0) {
                dependMissing = result.missingRelations;
                recursiveItem = result.recursiveItem;
                break;
            }
            const relations = await Service.version.relation.getTypesRelationVersions(result);
            pageContentRelations.push({
                id: page.contentId,
                content: page.content,
                version: page.version,
                dslVersion: page.dslVersion || constant_1.DSL_VERSION,
                relations,
                dependMissing,
                recursiveItem,
            });
        }
        return pageContentRelations;
    }
}
exports.VersionLiveService = VersionLiveService;
