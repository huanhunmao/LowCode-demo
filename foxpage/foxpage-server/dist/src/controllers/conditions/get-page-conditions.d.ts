import 'reflect-metadata';
import { FileContentAndVersion } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { AppTypePageListCommonReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetConditionList extends BaseController {
    constructor();
    /**
     * Get conditional pagination list
     * @param  {AppPageListCommonReq} params
     * @returns {FileContentAndVersion}
     */
    index(params: AppTypePageListCommonReq): Promise<ResData<FileContentAndVersion[]>>;
}
