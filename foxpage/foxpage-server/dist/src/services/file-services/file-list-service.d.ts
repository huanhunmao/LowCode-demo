import { File, FileTypes } from '@foxpage/foxpage-server-types';
import { FileContentAndVersion } from '../../types/content-types';
import { AppFileList, AppFileType, AppTypeFileParams, FileAssoc, FilePageSearch, FileUserInfo } from '../../types/file-types';
import { PageData, PageSize } from '../../types/index-types';
import { BaseService } from '../base-service';
export declare class FileListService extends BaseService<File> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns FileListService
     */
    static getInstance(): FileListService;
    /**
     * Get file list by folder ID
     * @param  {string} folderId
     * @param  {Partial<File>} options
     * @returns Promise
     */
    getFileListByFolderId(folderId: string, options: Partial<File>): Promise<File[]>;
    /**
     * Get all file detail of the specified type under the specified application
     * @param  {AppTypeContent} params
     * @returns {string[]} Promise
     */
    getAppTypeFileList(params: AppFileType): Promise<File[]>;
    /**
     * Get the details of the specified file list under the specified application
     * @param  {AppTypeContent} params
     * @returns {string[]} Promise
     */
    getAppFileList(params: AppFileList): Promise<File[]>;
    /**
     * Get file page data
     * @param  {FilePageSearch} params
     * @returns {FileUserInfo} Promise
     */
    getPageData(params: FilePageSearch): Promise<PageData<FileUserInfo>>;
    /**
     * Get file details by content id
     * @param  {string[]} contentIds
     * @returns Promise
     */
    getContentFileByIds(contentIds: string[], applicationId?: string): Promise<Record<string, File>>;
    /**
     * Get the paging list of files of the specified type under the application
     * @param  {AppTypeFileParams} params
     * @param  {Partial<PageSize>={}} page
     * @returns File
     */
    getAppTypeFilePageList(params: AppTypeFileParams, pageInfo: PageSize): Promise<PageData<File>>;
    /**
     * Get the file plus name of the specified file, the creator information,
     * and the largest version information under the file
     * @param  {File[]} fileList
     * @param  {{type:string}} options Optional parameters of the file, type: file type
     * @returns Promise
     */
    getFileAssocInfo(fileList: File[], options?: {
        type: string;
    }): Promise<FileAssoc[]>;
    /**
     * Check the special files has been referenced in the application
     * @param  {string} applicationId
     * @param  {string[]} fileIds
     * @returns Promise
     */
    getReferencedByIds(applicationId: string, fileIds: string[], type?: string): Promise<Record<string, File>>;
    /**
     * Get app item (variable, condition, function) list or project item list
     * if params.type is 'live' then get has live version's item
     *
     * response file, content and version detail, include relations detail
     * @param params {applicationId, folderId?, search?, type?, page?, size?}
     * @param type
     * @returns
     */
    getItemFileContentDetail(params: any, type: FileTypes): Promise<{
        list: FileContentAndVersion[];
        counts: number;
    }>;
    /**
     * get user involve file list
     * @param params
     * @returns
     */
    getUserInvolveFiles(params: {
        applicationId: string;
        type: string;
        userId: string;
        skip?: number;
        limit?: number;
    }): Promise<{
        counts: number;
        list: File[];
    }>;
}
