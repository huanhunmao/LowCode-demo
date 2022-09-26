import 'reflect-metadata';
import { ProjectPageContent } from '../../types/file-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { ProjectPagesReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class GetProjectPagesList extends BaseController {
    constructor();
    /**
     * Get the list of specified pages under the specified project
     * @param  {ProjectPagesReq} params
     * @param  {Header} headers
     * @returns {FolderInfo}
     */
    index(ctx: FoxCtx, params: ProjectPagesReq): Promise<ResData<ProjectPageContent>>;
}
