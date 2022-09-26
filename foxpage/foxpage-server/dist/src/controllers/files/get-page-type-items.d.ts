import 'reflect-metadata';
import { PageContentData } from '../../types/content-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppTypeFilesReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppPageFileList extends BaseController {
    constructor();
    /**
     * Get a list of paging files under the app, group by app scope and project scope
     * the types list is, page|template|variable|condition|function|mock
     * response file detail with creator base info
     * @param  {AppTypeFilesReq} params
     * @returns {PageContentData[]}
     */
    index(ctx: FoxCtx, params: AppTypeFilesReq): Promise<ResData<PageContentData[]>>;
}
