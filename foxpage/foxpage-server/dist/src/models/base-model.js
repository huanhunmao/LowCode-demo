"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
const lodash_1 = __importDefault(require("lodash"));
const mongoose_1 = __importDefault(require("mongoose"));
const foxpage_shared_1 = require("@foxpage/foxpage-shared");
class BaseModel {
    constructor(model) {
        this.ignoreFields = ' -_id -members._id -tags._id -host._id -resources._id';
        this.model = model;
    }
    /**
     * queries: [
     *   {type:'update', model: Object, data:[{},{}]
     *   {type:'insert', model: Object, data: {}|[]}
     * ]
     */
    async exec(queries) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction(); // { writeConcern: { w: 2 } }
        try {
            for (const query of queries) {
                if (query.type === 'update') {
                    await query.model.updateMany(...query.data, { session });
                }
                else if (query.type === 'insert') {
                    await query.model.insertMany(lodash_1.default.isArray(query.data) ? query.data : [query.data], {
                        session,
                    });
                }
            }
            await session.commitTransaction();
            await session.endSession();
        }
        catch (error) {
            await session.abortTransaction();
            await session.endSession();
            console.log(error);
            throw new Error('Run mongo transaction error:' + error.message);
        }
    }
    /**
     * Query list
     * @param  {SearchModel} params
     * @returns Promise
     */
    async getList(params) {
        const search = params.search || {};
        const page = (params && params.page) || 1;
        const size = (params && params.size) || 10;
        const from = (page - 1) * size;
        return this.model
            .find(search, this.ignoreFields, {
            sort: { _id: -1 },
            skip: from,
            limit: size,
        })
            .lean();
    }
    /**
     * Find details by a single ID
     * @param  {string} objectId
     * @returns Promise
     */
    async getById(objectId) {
        return this.model.findById(objectId).lean();
    }
    /**
     * Get the number of data for the specified filter condition
     * @param  {mongoose.FilterQuery<T>} filter
     * @returns Promise
     */
    async getCountDocuments(filter) {
        return this.model.countDocuments(filter);
    }
    /**
     * Query data with custom conditions
     * @param  {mongoose.FilterQuery<T>} filter
     * @param  {Object={}} projection
     * @param  {mongoose.QueryOptions={}} options
     * @returns Promise
     */
    async find(filter, projection = '', options = {}) {
        projection = projection || this.ignoreFields;
        !options.sort && (options.sort = { _id: -1 });
        return this.model.find(filter, projection, options).lean();
    }
    /**
     * Find a single record by condition
     * @param  {mongoose.FilterQuery<T>} condition
     * @param  {Object} projection?
     * @param  {mongoose.QueryOptions} options?
     * @returns Promise
     */
    async findOne(condition, projection = '', options = {}) {
        projection = projection || this.ignoreFields;
        return this.model.findOne(condition, projection, options).lean();
    }
    /**
     * Get details by Id
     * @param  {string[]} objectIds
     * @returns Promise
     */
    async getDetailByIds(objectIds, projection = '') {
        projection = projection || this.ignoreFields;
        return this.model.find({ id: { $in: objectIds } }, projection, {}).lean();
    }
    /**
     * Query to generate new data
     * @param  {T} detail
     */
    addDetailQuery(detail) {
        return { type: 'insert', model: this.model, data: detail };
    }
    /**
     * Create data
     * @param  {T|T[]} detail
     * @returns Promise
     */
    async addDetail(detail, options = {}) {
        const data = detail instanceof Array ? detail : [detail];
        return this.model.create(data, options);
    }
    /**
     * Generate query to update data
     * @param  {string} id
     * @param  {Partial<T&CommonFields>} data
     */
    updateDetailQuery(id, data) {
        return {
            type: 'update',
            model: this.model,
            data: [{ id }, Object.assign({ updateTime: new foxpage_shared_1.DateTime() }, data)],
        };
    }
    /**
     * Update data
     * @param  {mongoose.FilterQuery<T>} filter
     * @param  {mongoose.UpdateQuery<T>} doc
     * @returns Promise
     */
    async updateDetail(filter, doc) {
        return this.model.updateMany(filter, doc);
    }
    /**
     * Bulk settings update
     * @param  {Record<string} filter
     * @param  {} any>
     * @param  {Partial<T&CommonFields>} data
     * @returns void
     */
    batchUpdateDetailQuery(filter, data) {
        return {
            type: 'update',
            model: this.model,
            data: [filter, Object.assign({ updateTime: new foxpage_shared_1.DateTime() }, data)],
        };
    }
    /**
     * Set data status
     * @param  {string} id
     * @param  {boolean} status
     * @returns Promise
     */
    async setDeleteStatus(ids, status) {
        return this.model.updateMany({ id: { $in: ids } }, { deleted: status });
    }
    /**
     * Delete collection data
     * @param  {mongoose.FilterQuery<T>} filter
     * @returns Promise
     */
    async deleteDetail(filter) {
        return this.model.deleteMany(filter);
    }
    /**
     * query aggregate data list
     * @param  {any={}} params
     * @returns Promise
     */
    async aggregate(params = {}) {
        return this.model.aggregate(params);
    }
}
exports.BaseModel = BaseModel;
