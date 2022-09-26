import 'reflect-metadata';
import { DownloadObjectsReq } from '../../types/validates/storage-validate-types';
import { BaseController } from '../base-controller';
export declare class DownloadStorageObjects extends BaseController {
    constructor();
    /**
     * Load a list of objects with the specified prefix
     * @param  {StorageListReq} params
     * @returns {FileFolderInfo}
     */
    index(ctx: any, params: DownloadObjectsReq): Promise<any>;
}
