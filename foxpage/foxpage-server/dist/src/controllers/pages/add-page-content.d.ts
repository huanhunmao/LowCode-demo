import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddContentReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class AddPageContentDetail extends BaseController {
    constructor();
    /**
     * New page content details
     * @param  {FileDetailReq} params
     * @param  {Header} headers
     * @returns {File}
     */
    index(ctx: FoxCtx, params: AddContentReq): Promise<ResData<Content>>;
}
