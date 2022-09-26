import 'reflect-metadata';
import { ComponentContentInfo } from '../../types/component-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppComponentsReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppComponentListInfos extends BaseController {
    constructor();
    /**
     * Get the live version details of the components under the application
     *
     * Note: Pay attention to the difference between distinction and /live-versions
     * @param  {AppPackagesReq} params
     * @returns {NameVersionPackage[]}
     */
    index(ctx: FoxCtx, params: AppComponentsReq): Promise<ResData<ComponentContentInfo[]>>;
}
