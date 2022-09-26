import 'reflect-metadata';
import { ContentInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { AppTypeFilesReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppPageConditionList extends BaseController {
    constructor();
    /**
     * Get a list of all conditional pages under the specified application,
     * each conditional folder has only one content
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    index(params: AppTypeFilesReq): Promise<ResData<ContentInfo[]>>;
}
