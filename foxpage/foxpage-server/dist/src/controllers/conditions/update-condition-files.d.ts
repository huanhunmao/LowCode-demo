import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateFileDetailReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateConditionDetail extends BaseController {
    constructor();
    /**
     * Update condition file details, only condition name and introduction can be updated
     * @param  {UpdateFileDetailReq} params
     * @returns {File}
     */
    index(ctx: FoxCtx, params: UpdateFileDetailReq): Promise<ResData<File>>;
}
