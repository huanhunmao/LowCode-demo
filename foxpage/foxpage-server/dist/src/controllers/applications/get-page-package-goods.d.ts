import 'reflect-metadata';
import { ResData } from '../../types/index-types';
import { AppPackageGoodsListReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class GetApplicationPackageGoodsList extends BaseController {
    constructor();
    /**
     * Get special type paging package goods list in application
     * @param  {AppPackageGoodsListReq} params
     * @returns {GetPageTemplateListRes}
     */
    index(params: AppPackageGoodsListReq): Promise<ResData<any>>;
}
