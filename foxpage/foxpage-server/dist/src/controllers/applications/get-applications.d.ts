import 'reflect-metadata';
import { Application } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppListByIdsReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class GetApplicationList extends BaseController {
    constructor();
    /**
     * Get the details of the specified applications
     * @param  {AppListReq} params
     * @returns {AppInfo}
     */
    index(ctx: FoxCtx, params: AppListByIdsReq): Promise<ResData<Application[]>>;
}
