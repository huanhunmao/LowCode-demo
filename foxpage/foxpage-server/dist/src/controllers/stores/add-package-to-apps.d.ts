import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddGoodsToApplicationReq } from '../../types/validates/store-validate-types';
import { BaseController } from '../base-controller';
export declare class AddStorePackageToApplication extends BaseController {
    constructor();
    /**
     * Add store pages and template products to the specified application,
     * current only support create a reference to the package.
     * When creating referenced component information,
     * you need to add the referenced information on the label of the created component file
     * @param  {GetPageTemplateListReq} params
     * @returns {GetPageTemplateListRes}
     */
    index(ctx: FoxCtx, params: AddGoodsToApplicationReq): Promise<ResData<any>>;
}
