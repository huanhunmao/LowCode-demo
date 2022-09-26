import 'reflect-metadata';
import { PageContentData } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { AppTypeFilesReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAppTemplateFileList extends BaseController {
    constructor();
    /**
     * Get a list of pagination template files under the application,
     * in reverse chronological order, each file only returns one template page information.
     * Only when the file type is a variable, condition or function,
     * the largest version of the template is returned.
     * @param  {AppTypeFilesReq} params
     * @returns {PageContentData[]}
     */
    index(params: AppTypeFilesReq): Promise<ResData<PageContentData[]>>;
}
