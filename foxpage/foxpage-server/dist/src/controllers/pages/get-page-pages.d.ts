import 'reflect-metadata';
import { ContentInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { AppPageListCommonReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageList extends BaseController {
    constructor();
    /**
     * Get the list of pages under the file
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    index(params: AppPageListCommonReq): Promise<ResData<ContentInfo[]>>;
}
