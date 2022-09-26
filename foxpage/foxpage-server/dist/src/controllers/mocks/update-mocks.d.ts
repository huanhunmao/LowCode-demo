import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateTypeFileDetailReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateMockDetail extends BaseController {
    constructor();
    /**
     * Update the mock details,
     * only update the mock name and introduction, type,
     * and update the content name and version content.
     * @param  {UpdateTypeFileDetailReq} params
     * @returns {File}
     */
    index(ctx: FoxCtx, params: UpdateTypeFileDetailReq): Promise<ResData<File>>;
}
