import 'reflect-metadata';
import { ContentVersionInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { ContentVersionListReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
/**
 *
 * @export
 * @class GetVersionList
 * @extends {BaseController}
 */
export declare class GetResourceVersionList extends BaseController {
    constructor();
    /**
     * Get the version list of the page
     * @param  {ContentVersionListReq} params
     * @returns {ContentVersionInfo}
     */
    index(params: ContentVersionListReq): Promise<ResData<ContentVersionInfo[]>>;
}
