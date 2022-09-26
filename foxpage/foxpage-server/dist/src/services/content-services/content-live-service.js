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
exports.ContentLiveService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class ContentLiveService extends base_service_1.BaseService {
    constructor() {
        super(Model.content);
    }
    /**
     * Single instance
     * @returns ContentLiveService
     */
    static getInstance() {
        this._instance || (this._instance = new ContentLiveService());
        return this._instance;
    }
    /**
     * Get the live version information of content through contentIds
     * @param  {string[]} contentIds
     * @returns Promise
     */
    async getContentLiveIdByIds(contentIds) {
        const contentLiveNumbers = await Model.content.getLiveNumberByIds(contentIds);
        return contentLiveNumbers.map((item) => {
            return { contentId: item.id, versionNumber: item.liveVersionNumber };
        });
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
        const contentFileObject = await Service.file.list.getContentFileByIds(contentIds);
        const validContentIds = [];
        for (const contentId in contentFileObject) {
            if (lodash_1.default.isString(params.type) && contentFileObject[contentId].type === params.type) {
                validContentIds.push(contentId);
            }
            else if (!lodash_1.default.isString(params.type) && params.type.indexOf(contentFileObject[contentId].type) !== -1) {
                validContentIds.push(contentId);
            }
        }
        // Get live details
        const contentLiveInfo = await Service.content.list.getContentLiveInfoByIds(validContentIds);
        return Service.version.list.getContentInfoByIdAndNumber(contentLiveInfo);
    }
    /**
     * Set the live version of the content, you need to check whether the version is in the release state,
     * and it cannot be set to live if it is not.
     * @param  {LiveContentVersion} params
     * @returns Promise
     */
    async setLiveVersion(params, options) {
        const versionDetail = await Service.version.info.getDetail({
            contentId: params.id,
            versionNumber: params.versionNumber,
        });
        if (!versionDetail || versionDetail.deleted) {
            return { code: 1 }; // Invalid version information
        }
        if (versionDetail.status !== constant_1.VERSION.STATUS_RELEASE) {
            return { code: 2 }; // Not in release state
        }
        // Verify content details
        const [result, contentDetail] = await Promise.all([
            Service.version.relation.getVersionRelationAndComponents(params.applicationId, versionDetail.content),
            Service.content.info.getDetailById(versionDetail.contentId),
        ]);
        if (result.code === 0) {
            this.setLiveContent(versionDetail.contentId, versionDetail.versionNumber, {
                ctx: options.ctx,
                content: contentDetail,
                actionType: options.actionType,
            });
            return { code: 0 };
        }
        else {
            return { code: 3, data: JSON.stringify(result) };
        }
    }
    /**
     * Set the live version of the content
     * @param  {string} contentId
     * @param  {number} versionNumber
     * @param  {Content} contentDetail
     * @returns void
     */
    setLiveContent(contentId, versionNumber, options) {
        var _a;
        options.ctx.transactions.push(this.updateDetailQuery(contentId, { liveVersionNumber: versionNumber }));
        options.ctx.operations.push(...Service.log.addLogItem(constant_1.LOG.LIVE, options.content || {}, {
            actionType: options.actionType || [constant_1.LOG.LIVE, constant_1.TYPE.CONTENT].join('_'),
            category: {
                type: constant_1.TYPE.CONTENT,
                fileId: (_a = options.content) === null || _a === void 0 ? void 0 : _a.fileId,
                contentId,
            },
        }));
    }
    /**
     * Set the live version number of multiple content
     * @param  {Record<string} contentIdNumber
     * @param  {} number>
     * @returns void
     */
    bulkSetContentLiveVersion(contentIdNumber) {
        Object.keys(contentIdNumber).forEach((contentId) => {
            this.updateDetailQuery(contentId, { liveVersionNumber: contentIdNumber[contentId] });
        });
    }
}
exports.ContentLiveService = ContentLiveService;
