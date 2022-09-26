"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const p_limit_1 = __importDefault(require("p-limit"));
const foxpage_shared_1 = require("@foxpage/foxpage-shared");
class BaseService {
    constructor(model) {
        this.model = model;
    }
    async runTransaction(queries) {
        await this.model.exec(queries);
    }
    /**
     * Set the default value of the paging parameters
     * @param  {Partial<PageSize>} params
     * @returns Partial
     */
    setPageSize(params) {
        params.page = Number(params.page) || 1;
        params.size = Number(params.size) || 10;
        return { page: params.page, size: params.size };
    }
    /**
     * Search data list
     * @param  {SearchModel} params
     * @returns Promise
     */
    async getList(params) {
        return this.model.getList(params);
    }
    /**
     * Get the number of data with specified conditions
     * @param  {any} params
     * @returns Promise
     */
    async getCount(params) {
        return this.model.getCountDocuments(params);
    }
    /**
     * Get data through custom parameters
     * @param  {any} params
     * @returns Promise
     */
    async find(params, projection, options) {
        if (!options) {
            options = {};
        }
        if (!options.sort) {
            options.sort = { _id: -1 };
        }
        return this.model.find(params, projection, options);
    }
    /**
     * Find data by multiple IDs
     * @param  {string[]} objectIds
     * @returns Promise
     */
    async getDetailByIds(objectIds, projection) {
        if (objectIds.length === 0) {
            return [];
        }
        objectIds = lodash_1.default.uniq(objectIds);
        // Batch query, 1 concurrent request, 200 ids each time
        let promises = [];
        const limit = (0, p_limit_1.default)(1);
        lodash_1.default.chunk(objectIds, 200).forEach((ids) => {
            promises.push(limit(() => this.model.getDetailByIds(ids, projection)));
        });
        return lodash_1.default.flatten(await Promise.all(promises));
    }
    /**
     * Get data list, and response format to object
     * @param  {string[]} objectIds
     * @param  {string} projection?
     * @returns Promise
     */
    async getDetailObjectByIds(objectIds, projection) {
        if (objectIds.length === 0) {
            return {};
        }
        const objectList = await this.getDetailByIds(objectIds, projection);
        return lodash_1.default.keyBy(objectList, 'id');
    }
    /**
     * Query data arbitrarily
     * @param  {T} paramsT
     * @returns Promise
     */
    async getDetail(params) {
        const itemDetail = this.model.findOne(params);
        return itemDetail || {};
    }
    /**
     * Find data by a single ID
     * @param  {string} objectId
     * @returns Promise
     */
    async getDetailById(objectId) {
        const itemDetail = await this.model.findOne({ id: objectId });
        return itemDetail || {};
    }
    /**
     * Query to generate new data
     * @param  {T} detail
     */
    addDetailQuery(detail) {
        return this.model.addDetailQuery(detail);
    }
    /**
     * Create data
     * @param  {T} detail
     * @returns Promise
     */
    addDetail(detail) {
        return this.model.addDetail(detail);
    }
    /**
     * Generate query to update data
     * @param  {string} id
     * @param  {Partial<T&CommonFields>} data
     */
    updateDetailQuery(id, data) {
        return this.model.updateDetailQuery(id, data);
    }
    /**
     * Bulk settings update
     * @param  {Record<string} filter
     * @param  {} any>
     * @param  {Partial<T&CommonFields>} data
     * @returns void
     */
    batchUpdateDetailQuery(filter, data) {
        return this.model.batchUpdateDetailQuery(filter, data);
    }
    /**
     * update data
     * @param  {string} id
     * @param  {Partial<T&CommonFields>} data
     * @returns Promise
     */
    async updateDetail(id, data) {
        return this.model.updateDetail({ id }, Object.assign({ updateTime: new foxpage_shared_1.DateTime() }, data));
    }
    /**
     * batch update detail by ids
     * @param ids
     * @param data
     * @returns
     */
    async batchUpdateDetail(ids, data) {
        return this.model.updateDetail({ id: { $in: ids } }, Object.assign({ updateTime: new foxpage_shared_1.DateTime() }, data));
    }
    /**
     * Set data deletion status
     * @param  {string} id
     * @param  {boolean} status
     * @returns Promise
     */
    setDeleteStatus(ids, status) {
        if (typeof ids === 'string') {
            ids = [ids];
        }
        if (ids.length > 0) {
            return this.batchUpdateDetailQuery({ id: { $in: ids } }, { deleted: status });
        }
        return {};
    }
    /**
     * Delete collection data
     * @param  {mongoose.FilterQuery<T>} params
     */
    deleteDetail(params) {
        return this.model.deleteDetail(params);
    }
    /**
     * Check whether the data of the specified conditions exists
     * @param  {any} params
     * @returns Promise
     */
    async checkExist(params, id) {
        const result = await this.model.findOne(params);
        return result ? result.id !== id : false;
    }
}
exports.BaseService = BaseService;
