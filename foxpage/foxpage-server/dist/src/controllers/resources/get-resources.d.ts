import 'reflect-metadata';
import { FolderChildren } from '../../types/file-types';
import { ResData } from '../../types/index-types';
import { ResourceDetailReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class GetResourceDetail extends BaseController {
    constructor();
    /**
     * Get the details of the specified resource
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    index(params: ResourceDetailReq): Promise<ResData<FolderChildren>>;
}
