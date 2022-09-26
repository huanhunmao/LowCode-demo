import 'reflect-metadata';
import { TemplateDetail } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { TemplateListReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class GetTemplates extends BaseController {
    constructor();
    /**
     * Get all live version template data under the specified application
     * @param  {ContentListReq} params
     * @returns {ContentInfo}
     */
    index(params: TemplateListReq): Promise<ResData<TemplateDetail[]>>;
}
