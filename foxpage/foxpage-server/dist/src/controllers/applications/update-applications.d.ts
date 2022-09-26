import 'reflect-metadata';
import { Application } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateAppReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateApplicationDetail extends BaseController {
    constructor();
    /**
     * Update application details, only application name, introduction and locales can be updated
     * @param  {UpdateAppReq} params
     * @returns Application
     */
    index(ctx: FoxCtx, params: UpdateAppReq): Promise<ResData<Application>>;
}
