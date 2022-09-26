import mongoose from 'mongoose';
import { DBQuery, SearchModel } from '../types/index-types';
export declare class BaseModel<T> {
    protected model: mongoose.Model<T>;
    protected ignoreFields: string;
    constructor(model: mongoose.Model<T>);
    /**
     * queries: [
     *   {type:'update', model: Object, data:[{},{}]
     *   {type:'insert', model: Object, data: {}|[]}
     * ]
     */
    exec(queries: any): Promise<void>;
    /**
     * Query list
     * @param  {SearchModel} params
     * @returns Promise
     */
    getList(params: SearchModel): Promise<T[]>;
    /**
     * Find details by a single ID
     * @param  {string} objectId
     * @returns Promise
     */
    getById(objectId: string): Promise<T>;
    /**
     * Get the number of data for the specified filter condition
     * @param  {mongoose.FilterQuery<T>} filter
     * @returns Promise
     */
    getCountDocuments(filter: mongoose.FilterQuery<T>): Promise<number>;
    /**
     * Query data with custom conditions
     * @param  {mongoose.FilterQuery<T>} filter
     * @param  {Object={}} projection
     * @param  {mongoose.QueryOptions={}} options
     * @returns Promise
     */
    find(filter: mongoose.FilterQuery<T>, projection?: string, options?: mongoose.QueryOptions): Promise<T[]>;
    /**
     * Find a single record by condition
     * @param  {mongoose.FilterQuery<T>} condition
     * @param  {Object} projection?
     * @param  {mongoose.QueryOptions} options?
     * @returns Promise
     */
    findOne(condition: mongoose.FilterQuery<T>, projection?: string, options?: mongoose.QueryOptions): Promise<T>;
    /**
     * Get details by Id
     * @param  {string[]} objectIds
     * @returns Promise
     */
    getDetailByIds(objectIds: string[], projection?: string): Promise<T[]>;
    /**
     * Query to generate new data
     * @param  {T} detail
     */
    addDetailQuery(detail: T | T[]): DBQuery;
    /**
     * Create data
     * @param  {T|T[]} detail
     * @returns Promise
     */
    addDetail(detail: T | T[], options?: mongoose.SaveOptions): Promise<T[]>;
    /**
     * Generate query to update data
     * @param  {string} id
     * @param  {Partial<T&CommonFields>} data
     */
    updateDetailQuery(id: string, data: Partial<T>): DBQuery;
    /**
     * Update data
     * @param  {mongoose.FilterQuery<T>} filter
     * @param  {mongoose.UpdateQuery<T>} doc
     * @returns Promise
     */
    updateDetail(filter: mongoose.FilterQuery<T>, doc: mongoose.UpdateQuery<T>): Promise<any>;
    /**
     * Bulk settings update
     * @param  {Record<string} filter
     * @param  {} any>
     * @param  {Partial<T&CommonFields>} data
     * @returns void
     */
    batchUpdateDetailQuery(filter: Record<string, any>, data: Partial<T>): DBQuery;
    /**
     * Set data status
     * @param  {string} id
     * @param  {boolean} status
     * @returns Promise
     */
    setDeleteStatus(ids: string | string[], status: boolean): Promise<any>;
    /**
     * Delete collection data
     * @param  {mongoose.FilterQuery<T>} filter
     * @returns Promise
     */
    deleteDetail(filter: mongoose.FilterQuery<T>): Promise<any>;
    /**
     * query aggregate data list
     * @param  {any={}} params
     * @returns Promise
     */
    aggregate(params?: any): Promise<any>;
}
