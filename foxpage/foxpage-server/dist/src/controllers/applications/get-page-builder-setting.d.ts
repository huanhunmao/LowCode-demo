import 'reflect-metadata';
import { AppSettingInfo } from '../../types/app-types';
import { ResData } from '../../types/index-types';
import { AppSettingListReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageBuilderSettingList extends BaseController {
    constructor();
    /**
     * Get paging app builder setting data, include store page, template and package
     * @param  {AppSettingListReq} params
     * @returns {AppInfo}
     */
    index(params: AppSettingListReq): Promise<ResData<AppSettingInfo>>;
}
