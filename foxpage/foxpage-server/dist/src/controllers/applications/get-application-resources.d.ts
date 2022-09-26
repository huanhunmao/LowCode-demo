import 'reflect-metadata';
import { AppResource } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { AppDetailReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class GetApplicationResources extends BaseController {
    constructor();
    /**
     * Get the resource details of the specified application
     * @param  {AppListReq} params
     * @returns {AppInfo}
     */
    index(params: AppDetailReq): Promise<ResData<AppResource[]>>;
}
