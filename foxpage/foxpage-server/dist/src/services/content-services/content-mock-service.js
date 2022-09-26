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
exports.ContentMockService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
// import * as Model from '../models';
const Service = __importStar(require("../index"));
class ContentMockService {
    constructor() {
    }
    /**
     * Single instance
     * @returns ContentMockService
     */
    static getInstance() {
        this._instance || (this._instance = new ContentMockService());
        return this._instance;
    }
    /**
     * get content extensions, eg. extendId, mockId
     * @param contentIds
     */
    async getContentExtension(contentIds) {
        const contentList = await Service.content.info.getDetailByIds(contentIds);
        const contentExtension = {};
        contentList.forEach(content => {
            contentExtension[content.id] = Service.content.info.getContentExtension(content, ['extendId', 'mockId']);
        });
        return contentExtension;
    }
    ;
    /**
     * get mock content build version, if not build version,  max version, get the live
     * @param contentIds
     * @returns
     */
    async getMockBuildVersions(contentIds) {
        var _a, _b, _c;
        if (contentIds.length === 0) {
            return {};
        }
        let mockIds = [];
        let contentMockMap = {};
        const contentExtension = await this.getContentExtension(contentIds);
        for (const contentId in contentExtension) {
            contentExtension[contentId].mockId && mockIds.push(contentExtension[contentId].mockId);
            contentMockMap[contentExtension[contentId].mockId] = contentId;
        }
        const contentVersionList = await Service.version.info.find({ contentId: { $in: mockIds }, deleted: false }, 'contentId versionNumber status', { sort: { versionNumber: 'desc' } });
        let baseVersionInfoObject = {};
        contentVersionList.forEach((version) => {
            if (!baseVersionInfoObject[version.contentId] && version.status !== constant_1.VERSION.STATUS_DISCARD) {
                baseVersionInfoObject[version.contentId] = lodash_1.default.pick(version, ['contentId', 'versionNumber']);
            }
        });
        const buildList = await Service.version.list.getContentByIdAndVersionNumber(lodash_1.default.toArray(baseVersionInfoObject));
        const buildObject = lodash_1.default.keyBy(buildList, 'contentId');
        let contentMockVersion = {};
        for (const contentId of contentIds) {
            const relations = await this.getMockRelations([buildObject[(_a = contentExtension[contentId]) === null || _a === void 0 ? void 0 : _a.mockId]]);
            contentMockVersion[contentId] = {
                mock: ((_c = buildObject[(_b = contentExtension[contentId]) === null || _b === void 0 ? void 0 : _b.mockId]) === null || _c === void 0 ? void 0 : _c.content) || {},
                extension: contentExtension[contentId] || {},
                relations,
            };
        }
        return contentMockVersion;
    }
    /**
     * Get content mock live versions, if no live version, response empty
     * Response object {contentId: mockContentVersion}
     * @param contentIds
     * @returns
     */
    async getMockLiveVersions(contentIds) {
        var _a, _b, _c;
        if (contentIds.length === 0) {
            return {};
        }
        let mockIds = [];
        let contentMockMap = {};
        const contentExtension = await this.getContentExtension(contentIds);
        for (const contentId in contentExtension) {
            contentExtension[contentId].mockId && mockIds.push(contentExtension[contentId].mockId);
            contentMockMap[contentExtension[contentId].mockId] = contentId;
        }
        const mockLiveInfo = [];
        const mockContentList = await Service.content.info.getDetailByIds(mockIds);
        mockContentList.forEach(content => {
            if (content.liveVersionNumber > 0) {
                mockLiveInfo.push({ id: content.id, liveVersionNumber: content.liveVersionNumber });
            }
        });
        const liveList = await Service.version.list.getContentInfoByIdAndNumber(mockLiveInfo);
        const liveObject = lodash_1.default.keyBy(liveList, 'contentId');
        const mockObject = {};
        for (const contentId of contentIds) {
            const relations = await this.getMockRelations([liveObject[(_a = contentExtension[contentId]) === null || _a === void 0 ? void 0 : _a.mockId]]);
            mockObject[contentId] = {
                mock: ((_c = liveObject[(_b = contentExtension[contentId]) === null || _b === void 0 ? void 0 : _b.mockId]) === null || _c === void 0 ? void 0 : _c.content) || {},
                extension: contentExtension[contentId] || {},
                relations
            };
        }
        return mockObject;
    }
    /**
     * Get mock relation details
     * @param versionList
     * @returns
     */
    async getMockRelations(versionList) {
        var _a, _b;
        versionList = lodash_1.default.pullAll(versionList, undefined);
        if (versionList.length === 0) {
            return {};
        }
        const relationIds = lodash_1.default.map(lodash_1.default.toArray(((_b = (_a = versionList[0]) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.relation) || {}), 'id');
        const [relationVersions, contentFileObject] = await Promise.all([
            Service.relation.getAllRelationsByIds(relationIds, []),
            Service.file.list.getContentFileByIds(relationIds),
        ]);
        let relationObject = {};
        relationVersions.forEach(relation => {
            var _a;
            if (((_a = contentFileObject[relation.contentId]) === null || _a === void 0 ? void 0 : _a.type) &&
                !relationObject[contentFileObject[relation.contentId].type]) {
                relationObject[contentFileObject[relation.contentId].type] = [];
            }
            relationObject[contentFileObject[relation.contentId].type].push(relation.content);
        });
        return relationObject;
    }
}
exports.ContentMockService = ContentMockService;
