import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateFileDetailReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateTemplateDetail extends BaseController {
    constructor();
    /**
     * Update the template details, only the template name and profile can be updated
     * @param  {UpdateFileDetailReq} params
     * @returns {File}
     */
    index(ctx: FoxCtx, params: UpdateFileDetailReq): Promise<ResData<File>>;
}
