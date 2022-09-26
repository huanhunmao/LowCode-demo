import 'reflect-metadata';
import { NewResourceDetail } from '../../types/file-types';
import { ResData } from '../../types/index-types';
import { ResourceGroupReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class GetRemoteResourceList extends BaseController {
    constructor();
    /**
     * Get remote resource server info list
     * 1, get resource group detail
     * 2, get resource list by plugin
     * 3, check if the resources exist
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    index(params: ResourceGroupReq): Promise<ResData<NewResourceDetail[]>>;
}
