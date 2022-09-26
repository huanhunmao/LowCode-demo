import 'reflect-metadata';
import { Log } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { WorkspaceRequestReq } from '../../types/validates/log-validate-types';
import { BaseController } from '../base-controller';
interface LogRequestDetail {
    request: Partial<Log>;
    details: Log[];
}
export declare class GetWorkspaceRequestDetail extends BaseController {
    constructor();
    /**
     * Get the special request details
     *
     * @param  {WorkspaceRequestReq} params
     * @returns {LogRequestDetail}
     */
    index(params: WorkspaceRequestReq): Promise<ResData<LogRequestDetail>>;
}
export {};
