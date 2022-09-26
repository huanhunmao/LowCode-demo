import 'reflect-metadata';
import { StorageListRes } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { StorageListReq } from '../../types/validates/storage-validate-types';
import { BaseController } from '../base-controller';
export declare class GetStorageList extends BaseController {
    constructor();
    /**
     * Get the details of the specified object list
     * @param  {StorageListReq} params
     * @returns {FileFolderInfo}
     */
    index(params: StorageListReq): Promise<ResData<StorageListRes[]>>;
}
