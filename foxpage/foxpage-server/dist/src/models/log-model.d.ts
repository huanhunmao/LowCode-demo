import { Log } from '@foxpage/foxpage-server-types';
import { DataLogPage } from '../types/log-types';
import { BaseModel } from './base-model';
/**
 * Log data processing related classes
 *
 * @export
 * @class LogModel
 * @extends {BaseModel<Log>}
 */
export declare class LogModel extends BaseModel<Log> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns LogModel
     */
    static getInstance(): LogModel;
    /**
     * Get the special data history operation list
     * @param  {DataLogPage} params
     * @returns Promise
     */
    getDataPageList(params: DataLogPage): Promise<Log[]>;
    /**
     * Get the special data history operation counts
     * @param  {DataLogPage} params
     * @returns Promise
     */
    getDataPageCount(params: DataLogPage): Promise<number>;
}
