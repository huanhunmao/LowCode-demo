import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { VersionPublishStatusReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class SetPageVersionPublishStatus extends BaseController {
    constructor();
    /**
     * Set the release status of the page content version,
     * only the base status can be changed to other statuses, such as beta, release, etc.
     * When publishing the page, if the page has dependent data other than the template and the data is updated,
     * all dependent data will be published
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: VersionPublishStatusReq): Promise<ResData<ContentVersion>>;
}
