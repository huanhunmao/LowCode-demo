import 'reflect-metadata';
import { ContentVersionWithLive } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { PageContentVersionDetailReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class GetVersionDetail extends BaseController {
    constructor();
    /**
     * Get details of the version specified by the condition
     * @param  {PageContentVersionDetailReq} params
     * @returns {ContentVersion}
     */
    index(params: PageContentVersionDetailReq): Promise<ResData<ContentVersionWithLive>>;
}
