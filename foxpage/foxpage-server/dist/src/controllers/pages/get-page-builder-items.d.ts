import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { ContentInfo } from '../../types/content-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AppPageBuilderItemReq } from '../../types/validates/page-validate-types';
import { BaseController } from '../base-controller';
interface FileContents extends File {
    contents: ContentInfo[];
}
export declare class GetPageBuilderItemList extends BaseController {
    constructor();
    /**
     * Get application builder available items
     * @param  {AppPageBuilderItemReq} params
     * @returns {ContentInfo}
     */
    index(ctx: FoxCtx, params: AppPageBuilderItemReq): Promise<ResData<FileContents>>;
}
export {};
