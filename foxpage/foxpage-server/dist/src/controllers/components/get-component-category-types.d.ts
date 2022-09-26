import 'reflect-metadata';
import { ComponentCategoryTypes } from '../../types/component-types';
import { ResData } from '../../types/index-types';
import { AppIDReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class GetComponentCategoryTypes extends BaseController {
    constructor();
    /**
     * Get the application's component category types
     * @param  {AppIDReq} params
     * @returns {Content}
     */
    index(params: AppIDReq): Promise<ResData<ComponentCategoryTypes[]>>;
}
