import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { ComponentVersionEditReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class GetComponentVersionDetail extends BaseController {
    constructor();
    /**
     * Get the version details of the component
     * @param  {ContentVersionDetailReq} params
     * @returns {ContentVersion}
     */
    index(params: ComponentVersionEditReq): Promise<ResData<ContentVersion>>;
}
