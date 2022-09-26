import 'reflect-metadata';
import { PageBuildVersion } from '../../types/content-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { PageBuildVersionReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageBuildVersionDetail extends BaseController {
    constructor();
    /**
     * Get the build version details of the specified page content,
     * and return the details of the relation and the details of the component
     * 1, Get the latest version of the page, if the version [does not exist/not base/deleted],
     *    add a new version (created on the basis of the latest valid version)
     * 2, Get the Live information of the template that the page depends on
     * 3, Get the components of the page/template
     * 4, get the editor of the components in 3 and the dependent components
     * 5, get the details of the components in 3 and 4
     * 6, Get the component's resource id list
     * 7, Get resource details by resource ID
     * 8, Get all the relation information details of the page through the page details
     * 9, encapsulate the returned relation list into {templates:[],variables:[]...} format
     * 10, Replace the resource ID on the page with resource details
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    index(ctx: FoxCtx, params: PageBuildVersionReq): Promise<ResData<PageBuildVersion>>;
}
