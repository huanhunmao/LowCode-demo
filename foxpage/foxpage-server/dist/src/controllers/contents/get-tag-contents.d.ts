import 'reflect-metadata';
import { Content } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { TagContentVersionReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
interface TagContent {
    content: Content;
}
export declare class GetContentTagContent extends BaseController {
    constructor();
    /**
     * Get the content of the specified tag
     * Response：
     * {* content: {content info}}[]
     * @param  {TagContentVersionReq} params
     * @returns {ContentInfo}
     */
    index(ctx: FoxCtx, params: TagContentVersionReq): Promise<ResData<TagContent[]>>;
}
export {};
