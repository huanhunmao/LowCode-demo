import 'reflect-metadata';
import { ContentScopeInfo } from '../../types/content-types';
import { FoxCtx, PageData, ResData } from '../../types/index-types';
import { ProjectScopeTypeReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppScopeMockList extends BaseController {
    constructor();
    /**
     * Get the live version details of the mocks under the application,
     * the latest version details under the project (not necessarily the live version).
     * Only one of the names and search fields is passed. If passed at the same time, the search field is taken by default
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    index(ctx: FoxCtx, params: ProjectScopeTypeReq): Promise<ResData<PageData<ContentScopeInfo[]>>>;
}
