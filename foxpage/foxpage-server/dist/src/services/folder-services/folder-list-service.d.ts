import { AppFolderTypes, File, Folder } from '@foxpage/foxpage-server-types';
import { FileFolderChildren, FileFolderContentInfoChildren, FileFolderInfo, FileListSearch, FolderChildrenSearch, FolderInfo, FolderPageSearch, FolderUserInfo, WorkspaceFolderSearch } from '../../types/file-types';
import { PageData } from '../../types/index-types';
import { BaseService } from '../base-service';
export declare class FolderListService extends BaseService<Folder> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentInfoService
     */
    static getInstance(): FolderListService;
    /**
     * Get the folder list under the specified folder under the application,
     * and only return the format of Folder
     * @param  {string} applicationId
     * @param  {string} parentFolderId
     * @returns {Folder[]} Promise
     */
    getAppFolderList(applicationId: string, parentFolderId: string): Promise<Folder[]>;
    /**
     * Get all the parents of the specified folder and return the parents as an array field
     * {folderId: [{folderId1}, {folderId1's children}, ..., {folderId}]}
     * @param  {string[]} folderIds
     * @returns Promise
     */
    getAllParentsRecursive(folderIds: string[]): Promise<Record<string, Folder[]>>;
    /**
     * Get a list of sub-files (folders) under the specified folder
     * @param  {string} folderId
     * @returns FileInfo
     */
    getPageChildrenList(params: FileListSearch, fileTypes?: string[]): Promise<{
        count: number;
        data: FileFolderInfo;
    }>;
    /**
     * Get all the subsets under the specified folder,
     * including sub-folders and sub-files,
     * by default to get 1 level of sub-level data
     * @param  {string[]} folderIds
     * @param  {boolean=false} hasContent Whether to return content information under file
     * @param  {number=10} depth?
     * @param  {string[]} fileTypes? Get files of the specified type
     * @returns Promise
     */
    getAllChildrenRecursive(params: {
        folderIds: string[];
        depth?: number;
        hasContent?: boolean;
        fileTypes?: string[];
        deleted?: boolean;
    }): Promise<Record<string, FileFolderContentInfoChildren>>;
    /**
     * Get the folder list under the specified folder, and return the user and application information
     * @param  {FolderChildrenSearch} params
     * @returns {FolderInfo} Promise
     */
    getFolderChildrenList(params: FolderChildrenSearch): Promise<PageData<FolderInfo>>;
    /**
     * Get paged folder data, including folder creator information
     * @param  {FolderPageSearch} params
     * @param  {AppFolderTypes} type
     * @returns Promise
     */
    getFolderPageList(params: FolderPageSearch, type: AppFolderTypes): Promise<PageData<FolderUserInfo>>;
    /**
     * Get the folder id and file id under the specified file,
     * and get all the content id and version id under the file
     * @param  {FileFolderChildren} folderChildren
     * @returns Promise
     */
    getIdsFromFolderChildren(folderChildren: FileFolderChildren): Promise<Record<string, any[]>>;
    /**
     * Get file and folder information under the folder
     * @param  {FileFolderChildren} folderChildren
     * @returns string
     */
    getIdsFromFolderRecursive(folderChildren: FileFolderChildren): {
        files: File[];
        folders: Folder[];
    };
    /**
     * Get the special user and special type folder list
     * response creator name and application name
     * @param  {WorkspaceFolderSearch} params
     * @returns Promise
     */
    getWorkspaceFolderList(params: WorkspaceFolderSearch): Promise<PageData<FolderInfo>>;
    /**
     * Get aggregate folder data
     * @param  {any[]} aggregate
     * @returns Promise
     */
    folderAggregate(aggregate: any[]): Promise<any>;
    /**
     * Get user involve project
     * @param params
     * @returns
     */
    getInvolveProject(params: any): Promise<any>;
}
