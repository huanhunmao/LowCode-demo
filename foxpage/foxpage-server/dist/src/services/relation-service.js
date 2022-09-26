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
exports.RelationService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../config/constant");
const Model = __importStar(require("../models"));
const tools_1 = require("../utils/tools");
const base_service_1 = require("./base-service");
const Service = __importStar(require("./index"));
class RelationService extends base_service_1.BaseService {
    constructor() {
        super(Model.relation);
    }
    /**
     * Single instance
     * @returns OrgService
     */
    static getInstance() {
        this._instance || (this._instance = new RelationService());
        return this._instance;
    }
    /**
     * Check the validity of the data in the relation, that is, it does not exist or is deleted
     * @param  {Record<string} relations
     * @param  {string}>} {id
     * @returns Promise
     */
    async checkRelationStatus(relations) {
        const contentIds = lodash_1.default.map(lodash_1.default.toArray(relations), 'id');
        const invalidContentIds = [];
        const invalidRelations = {};
        if (contentIds.length > 0) {
            const contentList = await Service.content.list.getDetailByIds(contentIds);
            const contentObject = lodash_1.default.keyBy(contentList, 'id');
            for (const contentId of contentIds) {
                if (!contentObject[contentId] ||
                    // contentObject[contentId].liveVersionNumber === 0 ||
                    contentObject[contentId].deleted) {
                    invalidContentIds.push(contentId);
                }
            }
            if (invalidContentIds.length > 0) {
                Object.keys(relations).forEach((relation) => {
                    if (invalidContentIds.indexOf(relations[relation].id) !== -1) {
                        invalidRelations[relation] = relations[relation].id;
                    }
                });
            }
        }
        return invalidRelations;
    }
    /**
     * Get the associated data through useContentId, and check whether the referenced content is valid
     * If the referenced content is valid, and all the files in the content and the referenced content
     * are not the same file, then return to change the relation content
     * @param  {string[]} contentIds
     * @returns Promise
     */
    async getContentRelationalByIds(fileId, contentIds) {
        const relations = await this.find({ 'relation.useContentId': { $in: contentIds }, deleted: false });
        // Check the validity of the cited information
        const relationList = await Service.content.info.getDetailByIds(lodash_1.default.map(relations, 'contentId'));
        const validRelationContentObject = lodash_1.default.keyBy(relationList, 'id');
        return relations.filter((relation) => validRelationContentObject[relation.contentId] &&
            validRelationContentObject[relation.contentId].fileId !== fileId);
    }
    /**
     * Save relation information
     * @param  {string} contentId
     * @param  {number} versionNumber
     * @param  {any} relations
     * @returns Promise
     */
    async saveRelations(contentId, versionNumber, relations, options) {
        const contentRelations = Object.keys(relations).map((key) => {
            return { useContentId: relations[key].id };
        });
        // Get the existing contentId, versionNumber data
        const existRelations = await this.getDetail({ contentId, versionNumber, deleted: false });
        if (existRelations) {
            Model.relation.updateDetailQuery(existRelations.id, { relation: contentRelations });
        }
        else {
            Model.relation.addDetailQuery({
                id: (0, tools_1.generationId)(constant_1.PRE.RELATION),
                contentId,
                versionNumber,
                relation: contentRelations,
                deleted: false,
                creator: options.ctx.userInfo.id,
            });
        }
    }
    /**
     * Set the structure of the returned relations to
     * the structure of {"templates": [], "variables":[],...}
     * @param  {Record<string} relationObject
     * @param  {} ContentVersion>
     * @returns Promise
     */
    async formatRelationResponse(relationObject) {
        const relationContentIds = Object.keys(relationObject);
        let contentFileObject = {};
        if (relationContentIds.length > 0) {
            contentFileObject = await Service.file.list.getContentFileByIds(relationContentIds);
        }
        let relations = {};
        Object.keys(contentFileObject).forEach((contentId) => {
            const type = contentFileObject[contentId].type + 's';
            const relationDetail = relationObject[contentId] || {};
            !relations[type] && (relations[type] = []);
            relations[type].push(Object.assign({ version: (relationDetail === null || relationDetail === void 0 ? void 0 : relationDetail.version) || '' }, (relationDetail === null || relationDetail === void 0 ? void 0 : relationDetail.content) || {}));
        });
        return relations;
    }
    /**
     * Set the structure of relations to the structure of {"templates": [], "variables":[],...}
     * @param  {any[]} versionItemRelations
     * @returns Promise
     */
    async formatRelationDetailResponse(versionItemRelations) {
        const contentFileObject = await Service.file.list.getContentFileByIds(lodash_1.default.map(versionItemRelations, 'id'));
        let itemRelations = {};
        const itemVersionRelations = lodash_1.default.keyBy(versionItemRelations, 'id');
        Object.keys(contentFileObject).forEach((contentId) => {
            if (!itemRelations[contentFileObject[contentId].type + 's']) {
                itemRelations[contentFileObject[contentId].type + 's'] = [];
            }
            itemRelations[contentFileObject[contentId].type + 's'].push(itemVersionRelations[contentId]);
        });
        return itemRelations;
    }
    /**
     * Recursively get the relation details,
     * and check the validity of the relation information at the same time
     * @param  {string[]} ids
     * @param  {ContentVersionString[]} idVersions
     * @returns Promise
     */
    async getAllRelationsByIds(ids, idVersions) {
        if (ids.length === 0 && idVersions.length === 0) {
            return [];
        }
        if (ids.length > 0) {
            const maxVersions = await Service.version.number.getContentMaxVersionByIds(ids);
            maxVersions.forEach((version) => idVersions.push({
                contentId: version._id,
                version: Service.version.number.getVersionFromNumber(version.versionNumber),
            }));
        }
        let versionList = [];
        if (idVersions.length > 0) {
            versionList = await Service.version.list.getContentInfoByIdAndVersion(idVersions);
            const invalidIdVersions = this.getInvalidRelationIdVersion(idVersions, versionList);
            const subIdVersions = this.getRelationIdsFromVersion(versionList);
            const subRelationList = await this.getAllRelationsByIds(subIdVersions.ids, subIdVersions.idVersions);
            if (subRelationList.length > 0) {
                versionList = versionList.concat(subRelationList);
            }
            // Return invalid relation information
            versionList = versionList.concat(invalidIdVersions);
        }
        return versionList;
    }
    /**
     * Get the id and version information of the relation from the version details
     * @param  {ContentVersion[]} versionList
     * @param  {string[]=[]} ignoreType
     * @returns ContentVersionString
     */
    getRelationIdsFromVersion(versionList, ignoreType = []) {
        let relationIds = [];
        let relationVersionIds = [];
        versionList.forEach((version) => {
            var _a;
            const relationList = lodash_1.default.toArray(((_a = version === null || version === void 0 ? void 0 : version.content) === null || _a === void 0 ? void 0 : _a.relation) || {});
            for (const relation of relationList) {
                if (!relation.id || ignoreType.indexOf(relation.type) !== -1) {
                    continue;
                }
                if (relation.version) {
                    relationVersionIds.push({ contentId: relation.id, version: relation.version });
                }
                else {
                    relationIds.push(relation.id);
                }
            }
        });
        return { ids: relationIds, idVersions: relationVersionIds };
    }
    /**
     * Check whether the queried relation details exist, and return non-existent relation information
     * @param  {ContentVersionString[]} idVersions
     * @param  {ContentVersion[]} versionList
     * @returns ContentVersionString
     */
    getInvalidRelationIdVersion(idVersions, versionList) {
        let invalidRelations = [];
        const versionObject = lodash_1.default.keyBy(versionList, (version) => [version.contentId, version.version].join('_'));
        idVersions.forEach((version) => {
            if (!versionObject[[version.contentId, version.version].join('_')]) {
                invalidRelations.push(version);
            }
        });
        return invalidRelations;
    }
}
exports.RelationService = RelationService;
