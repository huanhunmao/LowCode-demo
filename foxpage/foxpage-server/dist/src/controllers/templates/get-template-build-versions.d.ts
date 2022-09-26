import 'reflect-metadata';
import { PageBuildVersion } from '../../types/content-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { PageBuildVersionReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageBuildVersionDetail extends BaseController {
    constructor();
    /**
     * Get the build version details of the specified template content,
     * and return the details of the relation and the details of the component.
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    index(ctx: FoxCtx, params: PageBuildVersionReq): Promise<ResData<PageBuildVersion>>;
}
