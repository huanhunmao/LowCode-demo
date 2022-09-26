import 'reflect-metadata';
import { ContentInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { ResourceContentListReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class GetResourceContentList extends BaseController {
    constructor();
    /**
     * Get the list of pages under the file
     * @param  {ResourceContentListReq} params
     * @returns {ContentInfo}
     */
    index(params: ResourceContentListReq): Promise<ResData<ContentInfo[]>>;
}
