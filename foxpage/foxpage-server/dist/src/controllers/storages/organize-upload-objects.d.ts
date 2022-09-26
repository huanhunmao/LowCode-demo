import 'reflect-metadata';
import { ResData } from '../../types/index-types';
import { UploadObjectsReq } from '../../types/validates/storage-validate-types';
import { BaseController } from '../base-controller';
export declare class UploadObjectToStorage extends BaseController {
    constructor();
    /**
     * Organize the specified resource objects and upload them to the specified bucket
     * @param  {StorageListReq} params
     * @returns {FileFolderInfo}
     */
    index(params: UploadObjectsReq): Promise<ResData<string>>;
}
