import 'reflect-metadata';
import { Log } from '@foxpage/foxpage-server-types';
import { PageData, ResData } from '../../types/index-types';
import { WorkspaceHistoryReq } from '../../types/validates/log-validate-types';
import { BaseController } from '../base-controller';
export declare class GetWorkspaceRequestDetail extends BaseController {
    constructor();
    /**
     * Get the special data history
     *
     * @param  {WorkspaceRequestReq} params
     * @returns {LogRequestDetail}
     */
    index(params: WorkspaceHistoryReq): Promise<ResData<PageData<Log>>>;
}
