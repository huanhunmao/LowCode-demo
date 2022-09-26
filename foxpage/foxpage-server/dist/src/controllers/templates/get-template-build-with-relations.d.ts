import 'reflect-metadata';
import { PageContentRelations } from '../../types/content-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppContentVersionReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppTemplateBuildInfoList extends BaseController {
    constructor();
    /**
     * Get the details of the build version of the specified template under the application,
     * and include the details of all the relations, the relation details of the already relations
     * Response [{content:{},relations:{templates:[],variables:[],conditions:[],functions:[],...}}]
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    index(ctx: FoxCtx, params: AppContentVersionReq): Promise<ResData<PageContentRelations[]>>;
}
