import 'reflect-metadata';
import { NameVersionPackage } from '../../types/content-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppNameVersionPackagesReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppComponentListByNameVersion extends BaseController {
    constructor();
    /**
     * Get the component content of the specified name and version under the application,
     * response format:
     * {
     *   name,
     *   version,
     *   package:{
     *    name,version,type,...
     *   }
     * }:
     *    The name and version of the first layer are the data in the request parameters,
     *    and the name and version in the package are the actual data of the specific content.
     *    type refers to the type of page，eg. component
     * @param  {AppNameVersionPackagesReq} params
     * @returns {NameVersionPackage[]}
     */
    index(ctx: FoxCtx, params: AppNameVersionPackagesReq): Promise<ResData<NameVersionPackage[]>>;
}
