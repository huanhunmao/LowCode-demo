import 'reflect-metadata';
import { ContentInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { AppPageCatalogCommonReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageCatalogList extends BaseController {
    constructor();
    /**
     * Get a list of file directory pages
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    index(params: AppPageCatalogCommonReq): Promise<ResData<ContentInfo[]>>;
}
