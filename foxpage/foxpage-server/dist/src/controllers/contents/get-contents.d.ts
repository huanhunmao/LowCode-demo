import 'reflect-metadata';
import { ContentInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { ContentListReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class GetContentList extends BaseController {
    constructor();
    /**
     * Get a list of contents under the specified file
     * @param  {ContentListReq} params
     * @returns {ContentInfo}
     */
    index(params: ContentListReq): Promise<ResData<ContentInfo[]>>;
}
