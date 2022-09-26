import 'reflect-metadata';
import { FolderUserInfo } from '../../types/file-types';
import { PageData, ResData } from '../../types/index-types';
import { ResourceListReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class GetResourcePageList extends BaseController {
    constructor();
    /**
     * Get a list of paging resources
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    index(params: ResourceListReq): Promise<ResData<PageData<FolderUserInfo>>>;
}
