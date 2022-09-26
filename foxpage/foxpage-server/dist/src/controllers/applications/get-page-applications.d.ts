import 'reflect-metadata';
import { GetApplicationListRes } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppListReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class GetApplicationPageList extends BaseController {
    constructor();
    /**
     * Get a pagination list of application in a single organization
     * @param  {AppListReq} params
     * @returns {AppInfo}
     */
    index(ctx: FoxCtx, params: AppListReq): Promise<ResData<GetApplicationListRes>>;
}
