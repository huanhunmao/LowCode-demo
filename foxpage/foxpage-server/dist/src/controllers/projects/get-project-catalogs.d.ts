import 'reflect-metadata';
import { Folder } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { FileListReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class GetProjectCatalog extends BaseController {
    constructor();
    /**
     * Get the file directory under the specified project
     * @param  {FolderDetailReq} params
     * @param  {Header} headers
     * @returns {Folder}
     */
    index(params: FileListReq): Promise<ResData<Folder>>;
}
