import 'reflect-metadata';
import { FileFolderInfo } from '../../types/file-types';
import { ResData } from '../../types/index-types';
import { FileListReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class GetProjectFileList extends BaseController {
    constructor();
    /**
     * Get the list of paging files under the project
     * @param  {ProjectListReq} params
     * @param  {Header} headers
     * @returns {FileFolderInfo}
     */
    index(params: FileListReq): Promise<ResData<FileFolderInfo>>;
}
