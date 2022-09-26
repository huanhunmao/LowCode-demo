import 'reflect-metadata';
import { TagVersionRelation } from '../../types/content-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { TagContentVersionReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class GetTagContentInfo extends BaseController {
    constructor();
    /**
     * Get the content and version information of the specified tag
     * Response：
     * {
     * content: {content info}
     * contentInfo: {
     *  pages: [{content version info}]，
     *  templates: [{template version info}]
     *  variables: [{variable version info}]
     *  conditions: [{condition version info}]
     *  functions: [{function version info}]
     * ....
     * }}
     * @param  {TagContentVersionReq} params
     * @returns {ContentInfo}
     */
    index(ctx: FoxCtx, params: TagContentVersionReq): Promise<ResData<TagVersionRelation[]>>;
}
