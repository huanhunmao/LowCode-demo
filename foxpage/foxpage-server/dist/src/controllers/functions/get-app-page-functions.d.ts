import 'reflect-metadata';
import { ContentInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { AppTypeFilesReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppPageFunctionList extends BaseController {
    constructor();
    /**
     * Get the pagination list of all functions under the specified application,
     * each function folder has only one content
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    index(params: AppTypeFilesReq): Promise<ResData<ContentInfo[]>>;
}
