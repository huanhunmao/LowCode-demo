import 'reflect-metadata';
import { GetApplicationListRes } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { AllAppListReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAllApplicationPageList extends BaseController {
    constructor();
    /**
     * Get a pagination list of applications in all organizations
     * @param  {AllAppListReq} params
     * @returns {AppInfo}
     */
    index(params: AllAppListReq): Promise<ResData<GetApplicationListRes>>;
}
