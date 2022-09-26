import 'reflect-metadata';
import { UserBase } from 'src/types/user-types';
import { StoreGoods } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { GetFileListReq } from '../../types/validates/store-validate-types';
import { BaseController } from '../base-controller';
interface GoodsWithAppInfo extends StoreGoods {
    details: {
        id: string;
        applicationId: string;
        applicationName?: string;
        creator?: string;
    };
    application?: Record<string, any>;
    creator: UserBase;
}
export declare class GetStoreFileGoodsList extends BaseController {
    constructor();
    /**
     * Get the data of the store file goods paged list
     * @param  {GetPageTemplateListReq} params
     * @returns {GetPageTemplateListRes}
     */
    index(ctx: FoxCtx, params: GetFileListReq): Promise<ResData<GoodsWithAppInfo>>;
}
export {};
