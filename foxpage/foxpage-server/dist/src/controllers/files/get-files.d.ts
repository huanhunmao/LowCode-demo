import 'reflect-metadata';
import { FileWithOnline } from '../../types/file-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppFileListReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class GetFileList extends BaseController {
    constructor();
    /**
     * Get the details of the specified file under the specified application
     * @param  {FileListReq} params
     * @returns {FileUserInfo}
     */
    index(ctx: FoxCtx, params: AppFileListReq): Promise<ResData<FileWithOnline[]>>;
}
