import 'reflect-metadata';
import { Folder, StoreGoods } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { GetPageTemplateListReq } from '../../types/validates/store-validate-types';
import { BaseController } from '../base-controller';
interface ProjectGoodsInfo extends Folder {
    files: StoreGoods[];
    applicationName: string;
}
export declare class GetStoreProjectList extends BaseController {
    constructor();
    /**
     * Get the pagination data of store pages and templates, and display it according to the project
     * @param  {GetPageTemplateListReq} params
     * @returns {GetPageTemplateListRes}
     */
    index(ctx: FoxCtx, params: GetPageTemplateListReq): Promise<ResData<ProjectGoodsInfo>>;
}
export {};
