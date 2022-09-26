import 'reflect-metadata';
import { ResData } from '../../types/index-types';
import { ResourceRemoteURLReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class GetResourceRemoteURL extends BaseController {
    constructor();
    /**
     * Get resource group remote url
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    index(params: ResourceRemoteURLReq): Promise<ResData<string>>;
}
