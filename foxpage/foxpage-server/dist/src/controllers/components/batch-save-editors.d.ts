import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { SaveEditorPackageReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class SaveEditorComponents extends BaseController {
    constructor();
    /**
     * Save multi editor, if not exist, add it
     * @param  {SaveRemotePackageReq} params
     * @returns {NewResourceDetail}
     */
    index(ctx: FoxCtx, params: SaveEditorPackageReq): Promise<ResData<Record<string, any>[]>>;
}
