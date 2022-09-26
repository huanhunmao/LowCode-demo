import 'reflect-metadata';
import { ContentVersion } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { RemotePagePackageReq } from '../../types/validates/component-validate-types';
import { BaseController } from '../base-controller';
interface RemoteComponentRes {
    resource: {
        groupId: string;
        groupName: string;
        name: string;
        version: string;
        resourceName: string;
        files: Record<string, string | Record<string, string>>;
        id?: string;
    };
    component: {
        id: string;
        version: string;
        content: any;
    };
}
export declare class GetRemoteComponent extends BaseController {
    constructor();
    /**
     * Get remote component page data
     *
     * Get the component list with special conditions
     * Get the component latest version detail
     * @param  {FileListReq} params
     * @returns {FileFolderInfo}
     */
    index(params: RemotePagePackageReq): Promise<ResData<{
        components: RemoteComponentRes[];
        lastVersion: ContentVersion;
    }>>;
}
export {};
