import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { DeleteFileReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class SetFileStatus extends BaseController {
    constructor();
    /**
     * Set file deletion status
     * @param  {DeleteFileReq} params
     * @returns {File}
     */
    index(ctx: FoxCtx, params: DeleteFileReq): Promise<ResData<File>>;
}
