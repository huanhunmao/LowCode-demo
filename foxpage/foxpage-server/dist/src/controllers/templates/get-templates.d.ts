import 'reflect-metadata';
import { PageContentData } from '../../types/content-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppContentVersionReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppTemplateList extends BaseController {
    constructor();
    /**
     * Get the live version details of the specified template under the application
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    index(ctx: FoxCtx, params: AppContentVersionReq): Promise<ResData<PageContentData[]>>;
}
