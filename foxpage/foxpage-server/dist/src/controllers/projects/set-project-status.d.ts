import 'reflect-metadata';
import { FoxCtx, ResData } from '../../types/index-types';
import { ProjectDeleteReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class SetFolderStatus extends BaseController {
    constructor();
    /**
     * Set project folder deletion status
     * @param  {ProjectDeleteReq} params
     * @returns {File}
     */
    index(ctx: FoxCtx, params: ProjectDeleteReq): Promise<ResData<File>>;
}
