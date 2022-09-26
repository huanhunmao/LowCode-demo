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
exports.ResourceContentService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class ResourceContentService extends base_service_1.BaseService {
    constructor() {
        super(Model.content);
    }
    /**
     * Single instance
     * @returns ResourceContentService
     */
    static getInstance() {
        this._instance || (this._instance = new ResourceContentService());
        return this._instance;
    }
    /**
     * Get resource details through resource contentId,
     * Return content information with contentId as the key
     * @param  {string[]} contentIds
     * @returns Promise
     */
    async getResourceContentByIds(contentIds) {
        const contentDetailList = await Promise.all(lodash_1.default.chunk(contentIds, 100).map((ids) => Service.version.info.find({ contentId: { $in: ids || [] }, deleted: false }, 'contentId content')));
        let contentObject = {};
        lodash_1.default.flatten(contentDetailList).forEach((content) => {
            contentObject[content.contentId] = content.content;
        });
        return contentObject;
    }
}
exports.ResourceContentService = ResourceContentService;
