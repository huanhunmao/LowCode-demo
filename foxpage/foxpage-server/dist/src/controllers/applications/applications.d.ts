import 'reflect-metadata';
import { AppWithFolder } from '../../types/app-types';
import { ResData } from '../../types/index-types';
import { AppDetailReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppDetail extends BaseController {
    constructor();
    /**
     * Get application details, including default folder information under the application
     * @param  {AppDetailReq} params
     * @returns {AppWithFolder} Promise
     */
    index(params: AppDetailReq): Promise<ResData<AppWithFolder>>;
}
