import { Folder, StoreGoods } from '@foxpage/foxpage-server-types';
import { PageData } from '../../types/index-types';
import { StoreFileStatus, StorePageParams } from '../../types/store-types';
import { BaseService } from '../base-service';
export declare class StoreGoodsService extends BaseService<StoreGoods> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns StoreGoodsService
     */
    static getInstance(): StoreGoodsService;
    /**
     * Get goods details by store target id
     * @param  {string} typeId
     * @returns Promise
     */
    getDetailByTypeId(typeId: string): Promise<StoreGoods>;
    /**
     * Get store goods paging data
     * @param  {StorePageParams} params
     * @returns Promise
     */
    getPageList(params: StorePageParams): Promise<PageData<StoreGoods | Folder>>;
    /**
     * Query product details through the file and application ID of the product
     * @param  {string} applicationId
     * @param  {string} fileId
     * @returns Promise
     */
    getDetailByAppFileId(applicationId: string, fileId: string): Promise<StoreGoods>;
    /**
     * Get the status of the product on the shelf through the application ID and file IDs
     * Return the file ID and file status
     * @param  {string} applicationId
     * @param  {string[]} fileIds
     * @returns Promise
     */
    getAppFileStatus(applicationId: string, fileIds: string[]): Promise<StoreFileStatus[]>;
}
