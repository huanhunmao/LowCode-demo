import 'reflect-metadata';
import { ComponentWithCategory } from '../../types/component-types';
import { ResData } from '../../types/index-types';
import { GetCategoryComponentReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class GetCategoryComponents extends BaseController {
    constructor();
    /**
     * Get had set category's components in application
     * @param  {GetCategoryComponentReq} params
     * @returns {Content}
     */
    index(params: GetCategoryComponentReq): Promise<ResData<ComponentWithCategory>>;
}
