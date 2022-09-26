import 'reflect-metadata';
import { Folder } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateResourceFolderReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateResourceFolderDetail extends BaseController {
    constructor();
    /**
     * Update resource folder details, including name, path, intro, tags
     * @param  {ContentVersionDetailRes} params
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: UpdateResourceFolderReq): Promise<ResData<Folder>>;
}
