import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppSettingDetailReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateApplicationSettingDetail extends BaseController {
    constructor();
    /**
     * Update application builder setting detail
     * @param  {ResponseBase} params
     * @returns Application
     */
    index(ctx: FoxCtx, params: AppSettingDetailReq): Promise<ResData<string>>;
}
