import 'reflect-metadata';
import { File } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddProjectPagesReq } from '../../types/validates/project-validate-types';
import { BaseController } from '../base-controller';
export declare class AddAppsPageDetail extends BaseController {
    constructor();
    /**
     * Create page details under the new application project, create page,
     * content and version through application ID, folderId
     * If version already exists, add a new version
     * The path field indicates that the folder is created, and the name is the file
     * {
          "name": "name1",
          "path":"common/abc",
          "content": {
            "locales": "",
            "detail": "{}"
          }
        }
     * @param  {FileDetailReq} params
     * @returns {File}
     */
    index(ctx: FoxCtx, params: AddProjectPagesReq): Promise<ResData<File>>;
}
