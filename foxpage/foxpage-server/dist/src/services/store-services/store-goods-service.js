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
exports.StoreGoodsService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class StoreGoodsService extends base_service_1.BaseService {
    constructor() {
        super(Model.storeGoods);
    }
    /**
     * Single instance
     * @returns StoreGoodsService
     */
    static getInstance() {
        this._instance || (this._instance = new StoreGoodsService());
        return this._instance;
    }
    /**
     * Get goods details by store target id
     * @param  {string} typeId
     * @returns Promise
     */
    async getDetailByTypeId(typeId) {
        const goodsList = await this.find({ 'details.id': typeId });
        return (goodsList === null || goodsList === void 0 ? void 0 : goodsList[0]) || undefined;
    }
    /**
     * Get store goods paging data
     * @param  {StorePageParams} params
     * @returns Promise
     */
    async getPageList(params) {
        let pageData = [];
        let count = 0;
        // Get page and template goods by project
        if (params.type && [constant_1.TYPE.PAGE, constant_1.TYPE.TEMPLATE].indexOf(params.type) !== -1) {
            const match = { 'details.projectId': { $exists: true }, type: params.type };
            if (params.appIds && params.appIds.length > 0) {
                match['details.applicationId'] = { $in: params.appIds };
            }
            const [projectGoods, projectCount] = await Promise.all([
                this.model.aggregate([
                    { $match: match },
                    { $group: { _id: '$details.projectId', createTime: { $max: '$createTime' } } },
                    { $sort: { createTime: -1 } },
                    { $skip: ((params.page || 1) - 1) * (params.size || 10) },
                    { $limit: params.size || 10 },
                ]),
                this.model.aggregate([{ $match: match }, { $group: { _id: '$details.projectId' } }]),
            ]);
            const projectIds = lodash_1.default.map(projectGoods, '_id');
            pageData = await Service.folder.list.getDetailByIds(projectIds);
            count = projectCount.length || 0;
        }
        else {
            [pageData, count] = await Promise.all([
                Model.storeGoods.getGoodsPageList(params),
                Model.storeGoods.getGoodsCount(params),
            ]);
        }
        return { count: count, list: pageData };
    }
    /**
     * Query product details through the file and application ID of the product
     * @param  {string} applicationId
     * @param  {string} fileId
     * @returns Promise
     */
    async getDetailByAppFileId(applicationId, fileId) {
        return this.getDetail({ 'details.id': fileId, 'details.applicationId': applicationId });
    }
    /**
     * Get the status of the product on the shelf through the application ID and file IDs
     * Return the file ID and file status
     * @param  {string} applicationId
     * @param  {string[]} fileIds
     * @returns Promise
     */
    async getAppFileStatus(applicationId, fileIds) {
        const goodsList = await this.find({
            'details.applicationId': applicationId,
            'details.id': { $in: fileIds },
        });
        return lodash_1.default.map(goodsList, (goods) => {
            return { id: goods.details.id, status: goods.status };
        });
    }
}
exports.StoreGoodsService = StoreGoodsService;
