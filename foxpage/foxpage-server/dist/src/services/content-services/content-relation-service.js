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
exports.ContentRelationService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class ContentRelationService extends base_service_1.BaseService {
    constructor() {
        super(Model.content);
    }
    /**
     * Single instance
     * @returns ContentRelationService
     */
    static getInstance() {
        this._instance || (this._instance = new ContentRelationService());
        return this._instance;
    }
    /**
     * Recursively get the relations details,
     * Check if the dependency exists,
     * Check if there is a circular dependency
     *
     * The version of the template data in the relation should be the live version,
     * and the other content has a version, which is the specified version,
     * and if not, the latest version is used
     * @param  {DslRelation} relations
     *  @param {isBuild: boolean} = false, return the details of the build, including the relation
     * @returns Promise
     */
    async getRelationDetailRecursive(relations, relayChain = {}, isBuild = false) {
        if (lodash_1.default.isEmpty(relations)) {
            return { relationList: [], dependence: {}, recursiveItem: '', missingRelations: [] };
        }
        // Get the id and version information in the relation
        const contentItemVersion = this.getTypeContentIdVersionFromRelation(lodash_1.default.toArray(relations));
        const templateIds = contentItemVersion.templateIds;
        const contentIds = contentItemVersion.otherTypeIds;
        const contentIdsWithVersion = contentItemVersion.itemVersions;
        // Get the live version of relation by ID
        let versionNumbers = [];
        if (isBuild) {
            versionNumbers = await Service.version.list.getContentLiveOrBuildVersion(contentIds.concat(templateIds));
        }
        else {
            let contentVersionNumbers = [];
            [versionNumbers, contentVersionNumbers] = await Promise.all([
                Service.content.live.getContentLiveIdByIds(templateIds),
                Service.version.number.getContentMaxVersionByIds(contentIds),
            ]);
            contentVersionNumbers.forEach((content) => versionNumbers.push({ contentId: content._id, versionNumber: content.versionNumber }));
        }
        // Get details through contentId and versionNumber, get details through contentId and version
        const contentVersionList = await Promise.all([
            Service.version.list.getContentByIdAndVersionNumber(versionNumbers),
            Service.version.list.getContentByIdAndVersionString(contentIdsWithVersion),
        ]);
        // Get the dependency information in the dependency and check whether the relationship exists
        let missingRelations = [];
        let contentDetails = lodash_1.default.flatten(contentVersionList);
        const idNumberNotExist = Service.version.check.notExistVersionNumber(versionNumbers, contentDetails);
        const idVersionNotExist = Service.version.check.notExistVersion(contentIdsWithVersion, contentDetails);
        if (idNumberNotExist.length > 0 || idVersionNotExist.length > 0) {
            missingRelations = lodash_1.default.map(idNumberNotExist, 'contentId').concat(lodash_1.default.map(idVersionNotExist, 'contentId'));
        }
        let childrenRelations = {};
        contentDetails.forEach((content) => lodash_1.default.merge(childrenRelations, content.content.relation || {}));
        // Check for circular dependencies
        const relationObject = Service.version.relation.getRelationsFromVersion(contentDetails);
        const contentRelation = Service.content.check.checkCircularDependence(relayChain, relationObject);
        if (contentRelation &&
            contentRelation.recursiveItem === '' &&
            !lodash_1.default.isEmpty(contentRelation.dependencies) &&
            !lodash_1.default.isEmpty(childrenRelations)) {
            const relationDetails = await this.getRelationDetailRecursive(childrenRelations, contentRelation.dependencies, isBuild);
            contentDetails = contentDetails.concat(relationDetails.relationList);
            contentRelation.recursiveItem = relationDetails.recursiveItem;
            missingRelations.concat(relationDetails.missingRelations);
        }
        return {
            relationList: contentDetails,
            dependence: relationObject,
            recursiveItem: contentRelation.recursiveItem,
            missingRelations,
        };
    }
    /**
     * Get template content id, other types of content id,
     * and content id containing version from relation
     * @param  {any[]} itemList
     * @param  {string='id'} idKey
     * @returns any
     */
    getTypeContentIdVersionFromRelation(itemList, idKey = 'id') {
        let templateIds = [];
        let otherTypeIds = [];
        let itemVersions = [];
        itemList.forEach((item) => {
            if (item.type && item.type === constant_1.TYPE.TEMPLATE) {
                templateIds.push(item[idKey]);
            }
            else if (item.version) {
                itemVersions.push(item);
            }
            else {
                otherTypeIds.push(item[idKey]);
            }
        });
        return { templateIds, otherTypeIds, itemVersions };
    }
}
exports.ContentRelationService = ContentRelationService;
