import 'reflect-metadata';
import { Folder } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddProjectDetailReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class AddProjectDetail extends BaseController {
    constructor();
    /**
     * Create Project
     * 1, Get the parent folder Id of the project under the application
     * 2. Check if the project name is duplicated
     * 3, Create project
     * @param  {FolderDetailReq} params
     * @param  {Header} headers
     * @returns {Folder}
     */
    index(ctx: FoxCtx, params: AddProjectDetailReq): Promise<ResData<Folder>>;
}
