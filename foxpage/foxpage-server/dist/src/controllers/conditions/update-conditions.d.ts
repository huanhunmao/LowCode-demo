import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateTypeFileDetailReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateConditionDetail extends BaseController {
    constructor();
    /**
     * Update condition details,
     * only condition name and introduction, type, content name and version content can be updated
     * @param  {UpdateTypeFileDetailReq} params
     * @returns {File}
     */
    index(ctx: FoxCtx, params: UpdateTypeFileDetailReq): Promise<ResData<File>>;
}
