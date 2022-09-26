import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { ResourceContentDetailReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class GetResourceContentDetail extends BaseController {
    constructor();
    /**
     * Get the content details of the specified resource
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    index(params: ResourceContentDetailReq): Promise<ResData<ContentVersion>>;
}
