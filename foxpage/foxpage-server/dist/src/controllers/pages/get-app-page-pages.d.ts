import 'reflect-metadata';
import { PageContentData } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { AppTypeFilesReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppPageFileList extends BaseController {
    constructor();
    /**
     * Get a list of paging files under the app, in reverse chronological order
     * @param  {AppTypeFilesReq} params
     * @returns {PageContentData[]}
     */
    index(params: AppTypeFilesReq): Promise<ResData<PageContentData[]>>;
}
