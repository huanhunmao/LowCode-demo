import 'reflect-metadata';
import { FileUserInfo } from '../../types/file-types';
import { PageData, ResData } from '../../types/index-types';
import { FileListReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class GetFileList extends BaseController {
    constructor();
    /**
     * Get file list
     * @param  {FileListReq} params
     * @returns {FileUserInfo}
     */
    index(params: FileListReq): Promise<ResData<PageData<FileUserInfo>>>;
}
