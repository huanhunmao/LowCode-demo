import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateContentReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateContentBaseDetail extends BaseController {
    constructor();
    /**
     * The content information of the update condition, including the title and tags fields
     * @param  {UpdateContentReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: UpdateContentReq): Promise<ResData<Content>>;
}
