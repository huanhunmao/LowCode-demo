import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { PublishProjectPageReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class PublishProjectPage extends BaseController {
    constructor();
    /**
     * Publish the specified page under the project and set it to live, including the data that the page depends on
     * 1. Get the details of the content
     * 2, get the relations of the content
     * 3, filter the relations that need to be published
     * 4, set the release status, set the live status
     *
     * When setting relation live and page live, directly set to live, no need to check status and other information
     * @param  {AppContentStatusReq} params
     * @returns {Content}
     */
    index(ctx: FoxCtx, params: PublishProjectPageReq): Promise<ResData<ContentVersion>>;
}
