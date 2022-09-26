import 'reflect-metadata';
import { Log } from '@foxpage/foxpage-server-types';
import { FoxCtx, PageData, ResData } from '../../types/index-types';
import { WorkspaceDynamicListReq } from '../../types/validates/log-validate-types';
import { BaseController } from '../base-controller';
import { UserBase } from '../../../src/types/user-types';
declare type DynamicItem = Log & {
    dataType: {
        scope: string;
        action: string;
        type: string;
    };
    creator: UserBase;
};
export declare class GetWorkspaceDynamicList extends BaseController {
    constructor();
    /**
     * Get current user page data operation.
     *
     * @param  {WorkspaceDynamicListReq} params
     * @returns {Log}
     */
    index(ctx: FoxCtx, params: WorkspaceDynamicListReq): Promise<ResData<PageData<DynamicItem>>>;
}
export {};
