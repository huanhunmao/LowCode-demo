import 'reflect-metadata';
import { FileContents } from '../../types/file-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppPageItemListContentReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
export declare class GetPageProjectItemListWithContents extends BaseController {
    constructor();
    /**
     * Get the page items with content list under application
     * if the project id is valid, response items under project
     * @param  {AppPageListCommonReq} params
     * @returns {ContentInfo}
     */
    index(ctx: FoxCtx, params: AppPageItemListContentReq): Promise<ResData<FileContents[]>>;
}
