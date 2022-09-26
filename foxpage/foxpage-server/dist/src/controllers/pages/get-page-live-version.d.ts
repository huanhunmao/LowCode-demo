import 'reflect-metadata';
import { PageBuildVersion } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { PageBuildVersionReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageLiveVersionDetail extends BaseController {
    constructor();
    /**
     * Get page live version detail
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    index(params: PageBuildVersionReq): Promise<ResData<PageBuildVersion>>;
}
