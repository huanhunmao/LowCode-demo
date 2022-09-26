import 'reflect-metadata';
import { FolderInfo } from '../../types/file-types';
import { FoxCtx, PageData, ResData } from '../../types/index-types';
import { WorkspaceProjectListReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class GetWorkspaceRecycleList extends BaseController {
    constructor();
    /**
     * Get current user all deleted object list, includes project, variable, conditions eg.
     *
     * But current only response deleted projects
     * @param  {WorkspaceProjectListReq} params
     * @param  {Header} headers
     * @returns {FolderInfo}
     */
    index(ctx: FoxCtx, params: WorkspaceProjectListReq): Promise<ResData<PageData<FolderInfo>>>;
}
