import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { VersionPublishStatus2Req } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetFunctionPublishStatus extends BaseController {
    constructor();
    /**
     * Set the release status of the function content version,
     * which can only be changed from the base status to other statuses, such as beta, release, etc.
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: VersionPublishStatus2Req): Promise<ResData<ContentVersion>>;
}
