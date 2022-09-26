import 'reflect-metadata';
import { ContentVersionWithLive } from '../../types/content-types';
import { PageData, ResData } from '../../types/index-types';
import { AppComponentVersionListReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class GetComponentPageVersionList extends BaseController {
    constructor();
    /**
     * Get the paging list of components under the application
     * @param  {AppPageListCommonReq} params
     * @returns {FileUserInfo}
     */
    index(params: AppComponentVersionListReq): Promise<ResData<PageData<ContentVersionWithLive>>>;
}
