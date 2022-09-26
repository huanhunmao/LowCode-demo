import 'reflect-metadata';
import { AppWithFolder } from '../../types/app-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddAppDetailReq } from '../../types/validates/app-validate-types';
import { BaseController } from '../base-controller';
export declare class AddApplicationDetail extends BaseController {
    constructor();
    /**
     * Create application info, include default type folders in application root, eg. project,
     * variable, condition and function folder etc.
     * @param  {AddAppDetailReq} params
     * @param  {Header} headers
     * @returns {AppWithFolder}
     */
    index(ctx: FoxCtx, params: AddAppDetailReq): Promise<ResData<AppWithFolder>>;
}
