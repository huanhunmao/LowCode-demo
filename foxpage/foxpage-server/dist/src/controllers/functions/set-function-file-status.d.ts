import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppContentStatusReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetFunctionFileStatus extends BaseController {
    constructor();
    /**
     * Set the delete status of the function file
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: AppContentStatusReq): Promise<ResData<File>>;
}
