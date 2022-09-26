import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddMockReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class AddMockDetail extends BaseController {
    constructor();
    /**
     * Create mock details
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    index(ctx: FoxCtx, params: AddMockReq): Promise<ResData<File>>;
}
