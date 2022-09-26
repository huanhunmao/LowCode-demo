import 'reflect-metadata';
import { ResData } from '../../types/index-types';
import { AppProjectGoodsListReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class GetApplicationProjectGoodsList extends BaseController {
    constructor();
    /**
     * Get special type goods paging list in application
     * @param  {AppProjectGoodsListReq} params
     * @returns {GetPageTemplateListRes}
     */
    index(params: AppProjectGoodsListReq): Promise<ResData<any>>;
}
