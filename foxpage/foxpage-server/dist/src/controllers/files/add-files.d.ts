import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { FileDetailReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class AddFileDetail extends BaseController {
    constructor();
    /**
     * Create document details
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    index(ctx: FoxCtx, params: FileDetailReq): Promise<ResData<File>>;
}
