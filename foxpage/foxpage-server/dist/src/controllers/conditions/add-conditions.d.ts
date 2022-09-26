import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { FileVersionDetailReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class AddConditionDetail extends BaseController {
    constructor();
    /**
     * Create condition details
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    index(ctx: FoxCtx, params: FileVersionDetailReq): Promise<ResData<File>>;
}
