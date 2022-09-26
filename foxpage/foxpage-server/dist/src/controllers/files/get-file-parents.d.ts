import 'reflect-metadata';
import { Content, ContentVersion, File, Folder } from '@foxpage/foxpage-server-types';
import { ResData } from '../../types/index-types';
import { GetFileParentReq } from '../../types/validates/file-validate-types';
import { BaseController } from '../base-controller';
declare type MixedData = Folder | File | Content | ContentVersion;
export declare class GetFileAllParentList extends BaseController {
    constructor();
    /**
     * Get the special data (folder, file, content, version) all parent detail
     * @param  {GetFileParentReq} params
     * @returns {FileUserInfo}
     */
    index(params: GetFileParentReq): Promise<ResData<MixedData[]>>;
}
export {};
