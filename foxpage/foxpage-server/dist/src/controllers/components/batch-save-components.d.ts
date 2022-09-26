import 'reflect-metadata';
import { NewResourceDetail } from '../../types/file-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { SaveRemotePackageReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class SaveRemoteComponents extends BaseController {
    constructor();
    /**
     * Check if remote resources exist,
     *    if not, add it, then response the mapping of content id and path
     *    if exist, get resource content id and mapping with path
     * Add content and version detail if component version not exist
     * @param  {SaveRemotePackageReq} params
     * @returns {NewResourceDetail}
     */
    index(ctx: FoxCtx, params: SaveRemotePackageReq): Promise<ResData<NewResourceDetail[]>>;
}
