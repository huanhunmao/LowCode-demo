import { File, Tag } from '@foxpage/foxpage-server-types';
import { AppFileTag, FileCheck } from '../../types/file-types';
import { BaseService } from '../base-service';
export declare class FileCheckService extends BaseService<File> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentInfoService
     */
    static getInstance(): FileCheckService;
    /**
     * Verify the existence of the file under the specified conditions.
     * If the id of the result is consistent with the fileId, it does not exist, otherwise it exists
     * @param  {string} fileId
     * @param  {FileCheck} params
     * @returns Promise
     */
    checkFileNameExist(fileId: string, params: FileCheck): Promise<boolean>;
    /**
     * Verify that the specified pathname already exists
     * @param  {AppFileTag} params
     * @returns Promise
     */
    pathNameExist(params: AppFileTag): Promise<boolean>;
    /**
     * Get a valid pathname
     * @param  {Tag[]} tags
     * @returns string
     */
    getValidPathname(tags: Tag[]): string;
}
