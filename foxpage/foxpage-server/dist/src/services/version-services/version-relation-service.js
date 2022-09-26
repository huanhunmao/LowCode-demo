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
exports.VersionRelationService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class VersionRelationService extends base_service_1.BaseService {
    constructor() {
        super(Model.version);
    }
    /**
     * Single instance
     * @returns VersionRelationService
     */
    static getInstance() {
        this._instance || (this._instance = new VersionRelationService());
        return this._instance;
    }
    /**
     * Get the relation information in the version
     * @param  {ContentVersion[]} contentVersionList
     * @returns Record
     */
    getRelationsFromVersion(contentVersionList) {
        let relationObject = {};
        contentVersionList.forEach((version) => {
            if (!relationObject[version.contentId]) {
                relationObject[version.contentId] = [];
            }
            if (version.content.relation) {
                lodash_1.default.merge(relationObject[version.contentId], lodash_1.default.map(Object.values(version.content.relation), 'id'));
            }
        });
        return relationObject;
    }
    /**
     * Get all components recursively
     * Get all dependencies
     * Find if the component has a version available
     * Find out if there is an available version of the dependency
     * @param  {string} applicationId
     * @param  {any} versionContent
     * @returns Promise
     */
    async getVersionRelationAndComponents(applicationId, versionContent) {
        const componentInfos = Service.content.component.getComponentInfoRecursive(versionContent.schemas);
        const [components, relations] = await Promise.all([
            Service.content.component.getComponentDetailRecursive(applicationId, componentInfos),
            Service.content.relation.getRelationDetailRecursive({}),
        ]);
        // Check the validity of components
        if (components.missingComponents.length > 0) {
            return { code: 1, data: components.missingComponents };
        }
        // Cyclic dependency
        if (components.recursiveItem) {
            return { code: 2, data: components.recursiveItem };
        }
        // Check the validity of components
        if (relations.missingRelations.length > 0) {
            return { code: 3, data: relations.missingRelations };
        }
        // Cyclic dependency
        if (relations.recursiveItem) {
            return { code: 4, data: relations.recursiveItem };
        }
        return { code: 0 };
    }
    /**
     * Return content corresponding to content, file information,
     * version information through contentIds in relations
     * @param  {string[]} relationIds
     * @returns RelationAssocContent
     */
    async getRelationDetail(relationObject, buildVersion = false) {
        let contentRelation = {};
        for (const contentId of Object.keys(relationObject)) {
            const allRelations = await Service.content.relation.getRelationDetailRecursive(relationObject[contentId]);
            const allRelationContentIds = lodash_1.default.map(allRelations.relationList, 'contentId');
            const contentList = await Service.content.info.getDetailByIds(allRelationContentIds);
            let idAndVersion = [];
            // get all relation build version, if not exist, get live version
            if (buildVersion) {
                const buildList = await Service.version.list.getContentMaxVersionDetail(allRelationContentIds);
                idAndVersion = lodash_1.default.map(buildList, (content) => lodash_1.default.pick(content, ['contentId', 'versionNumber']));
            }
            else {
                idAndVersion = lodash_1.default.map(contentList, (content) => {
                    return { contentId: content.id, versionNumber: content.liveVersionNumber };
                });
            }
            const [fileList, versionList] = await Promise.all([
                Service.file.info.getDetailByIds(lodash_1.default.map(contentList, 'fileId')),
                Service.version.list.getContentByIdAndVersionNumber(idAndVersion),
            ]);
            contentRelation[contentId] = { files: fileList, contents: contentList, versions: versionList };
        }
        return contentRelation;
    }
    /**
     * Group relations by file type
     * Return {templates:[],variables:[],conditions:[],functions:[],...}
     * @param  {RelationsRecursive} relationRecursive
     * @returns Promise
     */
    async getTypesRelationVersions(relationRecursive) {
        const contentIds = lodash_1.default.map(relationRecursive.relationList, 'contentId');
        const contentList = await Service.content.info.getDetailByIds(contentIds);
        const fileIds = lodash_1.default.map(contentList, 'fileId');
        const fileList = await Service.file.info.getDetailByIds(fileIds);
        const fileObject = lodash_1.default.keyBy(fileList, 'id');
        const contentFileTypes = lodash_1.default.keyBy(contentList.map((content) => {
            var _a;
            return { id: content.id, type: ((_a = fileObject[content.fileId]) === null || _a === void 0 ? void 0 : _a.type) + 's' || '' };
        }), 'id');
        const relations = {};
        relationRecursive.relationList.forEach((relation) => {
            if (contentFileTypes[relation.contentId]) {
                if (!relations[contentFileTypes[relation.contentId].type]) {
                    relations[contentFileTypes[relation.contentId].type] = [];
                }
                relations[contentFileTypes[relation.contentId].type].push(relation.content);
            }
        });
        return relations;
    }
    /**
     * Through the version object information, recursively obtain the relation details in the version,
     * append it to the relation, and return the version object information
     * @param  {Record<string} versionObject
     * @param  {} ContentVersion>
     * @param  {boolean=true} liveVersion Whether to get the version information of live
     * @returns Promise
     */
    async getVersionRelations(versionObject, liveVersion = true) {
        let relationContentIds = [];
        let versionObjectClone = lodash_1.default.cloneDeep(versionObject);
        let relationVersionObject = {};
        Object.keys(versionObjectClone).forEach((version) => {
            var _a, _b;
            const relationList = lodash_1.default.toArray(((_b = (_a = versionObjectClone[version]) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.relation) || {});
            relationContentIds = relationContentIds.concat(lodash_1.default.map(relationList, 'id'));
        });
        if (relationContentIds.length > 0) {
            if (liveVersion) {
                const idVersions = await Service.content.list.getContentLiveInfoByIds(relationContentIds);
                const relationVersionList = await Service.version.list.getContentInfoByIdAndNumber(idVersions);
                relationVersionObject = lodash_1.default.keyBy(relationVersionList, 'contentId');
            }
            else {
                relationVersionObject = await Service.version.list.getContentMaxVersionDetail(relationContentIds);
            }
            // Recursively get the relation in the relation
            const childRelationVersionObject = await this.getVersionRelations(relationVersionObject, liveVersion);
            lodash_1.default.merge(relationVersionObject, childRelationVersionObject);
        }
        return relationVersionObject;
    }
    /**
     * Add mock relation data to page content relations
     * @param versionRelations
     * @param mockRelations
     * @returns
     */
    moveMockRelations(versionRelations, mockRelations) {
        if (!lodash_1.default.isEmpty(mockRelations)) {
            for (const relationKey in mockRelations) {
                versionRelations[relationKey + 's'] = lodash_1.default.toArray(lodash_1.default.keyBy(lodash_1.default.merge(mockRelations[relationKey], versionRelations[relationKey + 's'] || []), 'id'));
            }
        }
        return versionRelations;
    }
}
exports.VersionRelationService = VersionRelationService;
