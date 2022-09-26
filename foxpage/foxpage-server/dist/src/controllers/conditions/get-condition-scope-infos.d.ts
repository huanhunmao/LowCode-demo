import 'reflect-metadata';
import { ContentScopeInfo } from '../../types/content-types';
import { PageData, ResData } from '../../types/index-types';
import { ProjectScopeTypeReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppConditionScopeInfoList extends BaseController {
    constructor();
    /**
     * Get the live version details under the application,
     * the latest version details under the project (not necessarily the live version)
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    index(params: ProjectScopeTypeReq): Promise<ResData<PageData<ContentScopeInfo[]>>>;
}
