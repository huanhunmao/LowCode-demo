import 'reflect-metadata';
import { PageBuildVersion } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { PageBuildVersionReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetTemplateLiveVersionDetail extends BaseController {
    constructor();
    /**
     * Get the live version details of the specified template content,
     * and return the details of the relation and the details of the component.
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    index(params: PageBuildVersionReq): Promise<ResData<PageBuildVersion>>;
}
