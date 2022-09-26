import 'reflect-metadata';
import { Folder, StoreGoods } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { GetPackageListReq } from '../../types/validates/store-validate-types';
import { BaseController } from '../base-controller';
interface ProjectGoodsInfo extends Folder {
    files: StoreGoods[];
    applicationName: string;
}
export declare class GetStorePackageList extends BaseController {
    constructor();
    /**
     * Get the pagination data of store packages
     * @param  {GetPackageListReq} params
     * @returns {GetPageTemplateListRes}
     */
    index(ctx: FoxCtx, params: GetPackageListReq): Promise<ResData<ProjectGoodsInfo>>;
}
export {};
