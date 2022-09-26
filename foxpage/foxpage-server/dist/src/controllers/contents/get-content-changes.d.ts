import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { ContentChangeReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class GetContentChanges extends BaseController {
    constructor();
    /**
     * Get changed content information under the application
     * @param  {ContentChangeReq} params
     * @param  {Header} headers
     * @returns Content
     */
    index(params: ContentChangeReq): Promise<ResData<Content>>;
}
