import 'reflect-metadata';
import { VersionWithExternal } from '../../types/content-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppContentVersionReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppFunctionList extends BaseController {
    constructor();
    /**
     * Get the live version details of the variable specified under the application
     * @param  {AppContentVersionReq} params
     * @returns {PageContentData[]}
     */
    index(ctx: FoxCtx, params: AppContentVersionReq): Promise<ResData<VersionWithExternal[]>>;
}
