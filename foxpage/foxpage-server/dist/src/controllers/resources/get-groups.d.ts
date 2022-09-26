import 'reflect-metadata';
import { FolderResourceGroup } from '../../types/file-types';
import { ResData } from '../../types/index-types';
import { ResourceInfoReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class GetResourceGroupDetail extends BaseController {
    constructor();
    /**
     * Get the details of the specified resource
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    index(params: ResourceInfoReq): Promise<ResData<FolderResourceGroup>>;
}
