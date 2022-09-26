import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddComponentReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
export declare class AddComponentDetail extends BaseController {
    constructor();
    /**
     * Create component details
     * @param  {AddComponentReq} params
     * @param  {Header} headers
     * @returns Content
     */
    index(ctx: FoxCtx, params: AddComponentReq): Promise<ResData<Content>>;
}
