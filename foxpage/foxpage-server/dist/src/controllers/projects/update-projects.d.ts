import 'reflect-metadata';
import { Folder } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateProjectDetailReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateProjectDetail extends BaseController {
    constructor();
    /**
     * Update project details, only name, path and introduction can be updated
     * @param  {UpdateProjectDetailReq} params
     * @returns {Folder}
     */
    index(ctx: FoxCtx, params: UpdateProjectDetailReq): Promise<ResData<Folder>>;
}
