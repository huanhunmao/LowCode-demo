import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { PageBuildVersionReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetFunctionBuildDetail extends BaseController {
    constructor();
    /**
     * Get the build details of the specified variable content
     * @param  {PageBuildVersionReq} params
     * @returns {PageContentData[]}
     */
    index(params: PageBuildVersionReq): Promise<ResData<ContentVersion>>;
}
