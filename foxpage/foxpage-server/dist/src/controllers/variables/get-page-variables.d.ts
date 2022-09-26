import 'reflect-metadata';
import { FileContentAndVersion } from '../../types/content-types';
import { ResData } from '../../types/index-types';
import { AppTypePageListCommonReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageVariableList extends BaseController {
    constructor();
    /**
     * Get the information of the paging variable list under the file
     * if folderId is valid and type = all, return variables in special project and app
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    index(params: AppTypePageListCommonReq): Promise<ResData<FileContentAndVersion[]>>;
}
