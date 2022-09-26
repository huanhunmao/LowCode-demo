import { Log } from '@foxpage/foxpage-server-types';
import { FoxCtx, PageData } from '../types/index-types';
import { ContentChange, DataLogPage, UserOperationParams } from '../types/log-types';
import { BaseService } from './base-service';
export declare class LogService extends BaseService<Log> {
    private static _instance;
    protected transactionId: string;
    protected logData: any[];
    protected logActionMethod: string;
    protected targetDataId: string;
    protected dataType: string;
    constructor();
    /**
     * Single instance
     * @returns LogService
     */
    static getInstance(): LogService;
    /**
     * Save the change log of the current request
     * @returns Promise
     */
    saveChangeLogs(ctx: FoxCtx): Promise<void>;
    /**
     * Save current request log
     * @param  {any} params
     * @returns Promise
     */
    saveRequest(options: {
        ctx: FoxCtx;
    }): Promise<void>;
    /**
     * After obtaining the specified time, the content information list on the right.
     * In the returned content, the content tag data is placed in the tag field,
     * and the file data is placed in the file. Others are placed in the corresponding types, such as
     * {
     *  tag:{updates:{},removes:{}},
     *  file:{updates:{},removes:{}},
     *  page:{updates:{},removes:{}},
     *  template:{updates:{},removes:{}},
     *  variable:{updates:{},removes:{}}
     *  ...
     * }
     * @param  {ContentChange} params
     * @returns Promise
     */
    getChangesContentList(params: ContentChange): Promise<Record<string, any>>;
    /**
     * Get the content of the specified id
     * @param  {string} id
     * @returns Promise
     */
    getDataDetail(id: string): Promise<any>;
    /**
     * Special log records, the classification is designated as application level,
     * and the content only contains the field data of id and before
     * @param  {string} action
     * @param  {any} data
     * @returns void
     */
    addLogItem<T extends {
        id: string;
        contentId?: string;
    }>(action: string, data: T | T[], options?: {
        dataType?: string;
        fileId?: string;
        actionType?: string;
        category?: Record<string, string>;
    }): any[];
    /**
     * Get the special user, special time, special action and special app's operation list and count
     * @param  {UserOperationParams} params
     * @returns {list:Log[], count:number}
     */
    getUserOperationList(params: UserOperationParams): Promise<{
        list: Log[];
        count: number;
    }>;
    /**
     * Get request details by transaction Id
     * @param  {string} transactionId
     * @returns Promise
     */
    getListByTransactionId(transactionId: string): Promise<Log[]>;
    /**
     * Get the special data history list and counts
     * @param  {DataLogPage} params
     * @returns Promise
     */
    getDataHistory(params: DataLogPage): Promise<PageData<Log>>;
    /**
     * Get the special ids's base info
     * @param  {string[]} ids
     * @returns Promise
     */
    getLogDataInfo(ids: string[]): Promise<Record<string, any>>;
    /**
     * Check data id's type
     * @param  {string} id
     * @returns string
     */
    checkDataIdType(id: string): {
        id: string;
        type: string;
    };
    /**
     * filter request sensitive data, pwd...
     * @param data
     */
    filterSensitiveData(data: any): any;
    /**
     * Get version, content file and folder parent ids
     * @param categoryList
     * @returns
     */
    getCategoryIds(operationLogs: Record<string, any>[]): Promise<Record<string, any>>;
}
