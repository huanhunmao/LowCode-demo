import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { VersionPublishStatusReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetPageVersionPublishStatus extends BaseController {
    constructor();
    /**
     * Set the release status of the template content version,
     * which can only be changed from the base status to other statuses, such as beta, release, etc.
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: VersionPublishStatusReq): Promise<ResData<ContentVersion>>;
}
