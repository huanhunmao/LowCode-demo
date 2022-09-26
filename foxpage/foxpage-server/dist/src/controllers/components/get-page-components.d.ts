import 'reflect-metadata';
import { FileUserInfo } from '../../types/file-types';
import { PageData, ResData } from '../../types/index-types';
import { AppComponentListReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
interface FileContentUserInfo extends FileUserInfo {
    contentId: string;
    online?: boolean;
}
export declare class GetPageComponentList extends BaseController {
    constructor();
    /**
     * Get the paging list of components under the application
     * @param  {AppPageListCommonReq} params
     * @returns {FileUserInfo}
     */
    index(params: AppComponentListReq): Promise<ResData<PageData<FileContentUserInfo>>>;
}
export {};
