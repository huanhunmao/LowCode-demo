import 'reflect-metadata';
import { FolderInfo } from '../../types/file-types';
import { FoxCtx, PageData, ResData } from '../../types/index-types';
import { ProjectListReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class GetProjectPageList extends BaseController {
    constructor();
    /**
     * Get the paging data of the project under the organization,
     * if the applicationId is passed, get the project under the application
     * 1. Get all applications under the organization
     * 2, Get all the folders (Projects) under the application in reverse order by folder creation time
     *
     * filter project data by type (user|team|organization app)
     * @param  {ProjectListReq} params
     * @param  {Header} headers
     * @returns {FolderInfo}
     */
    index(ctx: FoxCtx, params: ProjectListReq): Promise<ResData<PageData<FolderInfo>>>;
}
