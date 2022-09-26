import 'reflect-metadata';
import { ContentVersionWithLive } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { ComponentFileVersionReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class GetComponentVersionDetail extends BaseController {
    constructor();
    /**
     * Get the version details of the component
     * @param  {ContentVersionDetailReq} params
     * @returns {ContentVersion}
     */
    index(params: ComponentFileVersionReq): Promise<ResData<ContentVersionWithLive>>;
}
