import 'reflect-metadata';
import { ContentInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { AppTypePageListCommonReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageMockList extends BaseController {
    constructor();
    /**
     * Get the information of the paging mock list under the file
     * if folderId is valid and type = all, return mock in special project and app
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    index(params: AppTypePageListCommonReq): Promise<ResData<ContentInfo[]>>;
}
