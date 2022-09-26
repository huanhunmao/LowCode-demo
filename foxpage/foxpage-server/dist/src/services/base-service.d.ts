import mongoose from 'mongoose';
import { BaseModel } from '../models/base-model';
import { PageSize, SearchModel } from '../types/index-types';
export declare class BaseService<T> {
    model: BaseModel<T>;
    constructor(model: BaseModel<T>);
    runTransaction(queries?: any[]): Promise<void>;
    /**
     * Set the default value of the paging parameters
     * @param  {Partial<PageSize>} params
     * @returns Partial
     */
    setPageSize(params: Partial<PageSize>): PageSize;
    /**
     * Search data list
     * @param  {SearchModel} params
     * @returns Promise
     */
    getList(params: SearchModel): Promise<T[]>;
    /**
     * Get the number of data with specified conditions
     * @param  {any} params
     * @returns Promise
     */
    getCount(params: any): Promise<number>;
    /**
     * Get data through custom parameters
     * @param  {any} params
     * @returns Promise
     */
    find(params: any, projection?: string, options?: Record<string, any>): Promise<T[]>;
    /**
     * Find data by multiple IDs
     * @param  {string[]} objectIds
     * @returns Promise
     */
    getDetailByIds(objectIds: string[], projection?: string): Promise<T[]>;
    /**
     * Get data list, and response format to object
     * @param  {string[]} objectIds
     * @param  {string} projection?
     * @returns Promise
     */
    getDetailObjectByIds(objectIds: string[], projection?: string): Promise<Record<string, T>>;
    /**
     * Query data arbitrarily
     * @param  {T} paramsT
     * @returns Promise
     */
    getDetail(params: mongoose.FilterQuery<T>): Promise<T>;
    /**
     * Find data by a single ID
     * @param  {string} objectId
     * @returns Promise
     */
    getDetailById(objectId: string): Promise<T>;
    /**
     * Query to generate new data
     * @param  {T} detail
     */
    addDetailQuery(detail: T | T[]): any;
    /**
     * Create data
     * @param  {T} detail
     * @returns Promise
     */
    addDetail(detail: T): Promise<T[]>;
    /**
     * Generate query to update data
     * @param  {string} id
     * @param  {Partial<T&CommonFields>} data
     */
    updateDetailQuery(id: string, data: Partial<T>): any;
    /**
     * Bulk settings update
     * @param  {Record<string} filter
     * @param  {} any>
     * @param  {Partial<T&CommonFields>} data
     * @returns void
     */
    batchUpdateDetailQuery(filter: Record<string, any>, data: Partial<T>): any;
    /**
     * update data
     * @param  {string} id
     * @param  {Partial<T&CommonFields>} data
     * @returns Promise
     */
    updateDetail(id: string, data: Partial<T>): Promise<any>;
    /**
     * batch update detail by ids
     * @param ids
     * @param data
     * @returns
     */
    batchUpdateDetail(ids: string[], data: Partial<T>): Promise<any>;
    /**
     * Set data deletion status
     * @param  {string} id
     * @param  {boolean} status
     * @returns Promise
     */
    setDeleteStatus(ids: string | string[], status: boolean): any;
    /**
     * Delete collection data
     * @param  {mongoose.FilterQuery<T>} params
     */
    deleteDetail(params: mongoose.FilterQuery<T>): Promise<any>;
    /**
     * Check whether the data of the specified conditions exists
     * @param  {any} params
     * @returns Promise
     */
    checkExist(params: any, id?: string): Promise<boolean>;
}
