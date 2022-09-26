import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppFileContentStatusReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetResourceFileContentStatus extends BaseController {
    constructor();
    /**
     * Set resource folder, file, content deletion status
     * @param  {AppFileContentStatusReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: AppFileContentStatusReq): Promise<ResData<Content>>;
}
