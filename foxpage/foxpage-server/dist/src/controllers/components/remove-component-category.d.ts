import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { DeleteComponentCategoryReq } from '../../types/validates/component-validate-types';
import { FileDetailRes } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
export declare class RemoveComponentCategory extends BaseController {
    constructor();
    /**
     * Delete component category
     * @param  {AppIDReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: DeleteComponentCategoryReq): Promise<ResData<FileDetailRes>>;
}
