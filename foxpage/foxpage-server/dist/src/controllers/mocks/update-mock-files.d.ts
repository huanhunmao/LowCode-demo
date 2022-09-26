import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateFileDetailReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateMockFileDetail extends BaseController {
    constructor();
    /**
     * Update mock details, only mock name and introduction can be updated
     * @param  {UpdateFileDetailReq} params
     * @returns {File}
     */
    index(ctx: FoxCtx, params: UpdateFileDetailReq): Promise<ResData<File>>;
}
