import 'reflect-metadata';
import { ResData } from '../types/index-types';
import { BaseController } from './base-controller';
export declare class GetAppDetail extends BaseController {
    constructor();
    /**
     * Get application details, including default folder information under the application
     * @param  {AppDetailReq} params
     * @returns {AppWithFolder} Promise
     */
    index(params: {
        col: string;
    }): Promise<ResData<any[]>>;
}
