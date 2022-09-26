import 'reflect-metadata';
import { ContentInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { AppTypePageListCommonReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageTemplateList extends BaseController {
    constructor();
    /**
     * Get the paged template list information under the file
     * @param  {AppTypePageListCommonReq} params
     * @returns {ContentInfo}
     */
    index(params: AppTypePageListCommonReq): Promise<ResData<ContentInfo[]>>;
}
