import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { SaveResourceListReq } from '../../types/validates/resource-validate-types';
import { BaseController } from '../base-controller';
export declare class SaveRemoteResourceList extends BaseController {
    constructor();
    /**
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    index(ctx: FoxCtx, params: SaveResourceListReq): Promise<ResData<any[]>>;
}
