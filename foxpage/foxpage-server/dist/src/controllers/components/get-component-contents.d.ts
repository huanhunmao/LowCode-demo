import 'reflect-metadata';
import { ContentInfo } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { ComponentFileContentReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
interface FileContentDetail extends ContentInfo {
    liveVersion: string;
    type?: string;
    online?: boolean;
}
export declare class GetComponentVersionDetail extends BaseController {
    constructor();
    /**
     * Get the content details of the component
     * @param  {ContentVersionDetailReq} params
     * @returns {ContentVersion}
     */
    index(params: ComponentFileContentReq): Promise<ResData<FileContentDetail>>;
}
export {};
