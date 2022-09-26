import 'reflect-metadata';
import { FolderUserInfo } from '../../types/file-types';
import { PageData, ResData } from '../../types/index-types';
import { ResourceGroupListReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class GetResourceGroupPageList extends BaseController {
    constructor();
    /**
     * Get a paging list of resources
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    index(params: ResourceGroupListReq): Promise<ResData<PageData<FolderUserInfo>>>;
}
