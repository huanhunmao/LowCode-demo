import { StorageListRes } from '@foxpage/foxpage-server-types';
export declare class StorageService {
    private static _instance;
    private plugins;
    constructor();
    /**
     * Single instance
     * @returns StorageService
     */
    static getInstance(): StorageService;
    /**
     * Get object list of the special prefix
     * @param  {string} prefix
     * @param  {{maxKeys:number}} options?
     * @returns Promise
     */
    getList(prefix: string, options?: {
        bucket?: string;
        maxKeys: number;
    }): Promise<StorageListRes[]>;
    /**
     * Download object
     * @param  {string} prefix
     * @returns Promise
     */
    downloads(prefix: string): Promise<any>;
    /**
     * Upload object to another bucket after organize
     * 1, download objects
     * 2, zip objects
     * 3, upload to another bucket
     * @param  {any} params
     * {
     *    bucket: origin object bucket, default is same as origin object bucket
     *    targetBucket: target upload bucket, default is same as origin object bucket
     * }
     * @returns string
     */
    organizeUpload(params: {
        prefix: string;
        bucket?: string;
        targetBucket?: string;
        targetPrefix?: string;
    }): Promise<{
        code: number;
        data: string | string[];
    }>;
}
