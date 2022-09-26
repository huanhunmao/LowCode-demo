import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { CloneContentReq } from '../../types/validates/content-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdatePageVersionDetail extends BaseController {
    constructor();
    /**
     * Update content version by clone special content version
     * @param  {CloneContentReq} params
     * @returns {ContentVersion}
     */
    index(ctx: FoxCtx, params: CloneContentReq): Promise<ResData<ContentVersion>>;
}
