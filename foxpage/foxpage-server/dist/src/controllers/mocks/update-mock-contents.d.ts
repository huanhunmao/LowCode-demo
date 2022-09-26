import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateContentReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateMockContentDetail extends BaseController {
    constructor();
    /**
     * Update the content information of mocks, including title and tags fields
     * @param  {UpdateContentReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: UpdateContentReq): Promise<ResData<Content>>;
}
