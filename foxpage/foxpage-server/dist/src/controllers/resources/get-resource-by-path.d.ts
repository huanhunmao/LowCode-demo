import 'reflect-metadata';
import { FolderChildren } from '../../types/file-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { ResourcePathDetailReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class GetResourceDetailByPath extends BaseController {
    constructor();
    /**
     * Obtain the specified resource details through the path
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    index(ctx: FoxCtx, params: ResourcePathDetailReq): Promise<ResData<FolderChildren>>;
}
