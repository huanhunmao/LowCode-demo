import 'reflect-metadata';
import { FolderInfo } from '../../types/file-types';
import { FoxCtx, PageData, ResData } from '../../types/index-types';
import { WorkspaceProjectListReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class GetWorkspaceProjectPageList extends BaseController {
    constructor();
    /**
     * Get current user all project list, exclude deleted project
     * @param  {WorkspaceProjectListReq} params
     * @param  {Header} headers
     * @returns {FolderInfo}
     */
    index(ctx: FoxCtx, params: WorkspaceProjectListReq): Promise<ResData<PageData<FolderInfo>>>;
}
