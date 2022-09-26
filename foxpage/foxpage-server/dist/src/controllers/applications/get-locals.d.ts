import 'reflect-metadata';
import { ResData } from '../../types/index-types';
import { AppLocalesReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class GetApplicationLocales extends BaseController {
    constructor();
    /**
     * Get all optional locales of the application
     * @param  {AppListReq} params
     * @returns {AppInfo}
     */
    index(params: AppLocalesReq): Promise<ResData<string[]>>;
}
