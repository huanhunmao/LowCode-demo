import 'reflect-metadata';
import { ContentInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { ContentListReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class GetTemplateContentList extends BaseController {
    constructor();
    /**
     * Get the content list details of the specified page
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    index(params: ContentListReq): Promise<ResData<ContentInfo[]>>;
}
