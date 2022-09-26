import { Content, ContentVersion, File } from '@foxpage/foxpage-server-types';
import { AppTypeFileUpdate, FileContentVersion, FileFolderContentChildren, FileNameSearch, FilePathSearch, FolderChildren, NewFileInfo } from '../../types/file-types';
import { FoxCtx, TypeStatus } from '../../types/index-types';
import { BaseService } from '../base-service';
export declare class FileInfoService extends BaseService<File> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentInfoService
     */
    static getInstance(): FileInfoService;
    /**
     * Add file details, only generate query statements needed for transactions,
     * and return the details of the created content
     * @param  {Partial<File>} params
     * @returns File
     */
    create(params: Partial<File>, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): File;
    /**
     * Create file details, the content of the specified type file, version information
     * @param  {NewFileInfo} params
     * @returns Record
     */
    addFileDetail(params: NewFileInfo, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Promise<Record<string, number | (File & {
        contentId: string;
    })>>;
    /**
     * Update file details
     * @param  {AppTypeFileUpdate} params
     * @returns Promise
     */
    updateFileDetail(params: AppTypeFileUpdate, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Promise<Record<string, number>>;
    /**
     * Update the specified data directly
     * @param  {string} id
     * @param  {Partial<Content>} params
     * @returns void
     */
    updateFileItem(id: string, params: Partial<File>, options: {
        ctx: FoxCtx;
    }): void;
    /**
     * Update the deletion status of the file. When deleting,
     * you need to check whether there is any content being referenced.
     * When you enable it, you don’t need to check
     * @param  {TypeStatus} params
     * @returns Promise
     */
    setFileDeleteStatus(params: TypeStatus, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Promise<Record<string, number>>;
    /**
     * Set the delete status of specified files in batches,
     * @param  {File[]} fileList
     * @returns void
     */
    batchSetFileDeleteStatus(fileList: File[], options: {
        ctx: FoxCtx;
        status?: boolean;
        actionType?: string;
    }): void;
    /**
     * Obtain file information by file name
     * @param  {FileNameSearch} params
     * @returns {File[]} Promise
     */
    getFileIdByNames(params: FileNameSearch): Promise<File[]>;
    /**
     * Get file information by name
     * @param  {FilePathSearch} params
     * @param  {boolean=false} createNew
     * @returns Promise
     */
    getFileDetailByNames(params: FilePathSearch, options: {
        ctx: FoxCtx;
        createNew?: boolean;
    }): Promise<Partial<File>>;
    /**
     * Create file content and content version information
     * return fileId,contentId,versionId
     * @param  {File} params
     * @returns Promise
     */
    createFileContentVersion(params: File, options: FileContentVersion): Record<string, string>;
    /**
     * Recursively get the file id in the hierarchical file directory
     * @param  {{folders:FolderChildren[];files:File[]}} params
     * @returns string
     */
    getFileIdFromResourceRecursive(params: {
        folders: FolderChildren[];
        files: File[];
    }): string[];
    /**
     * Recursively put content details into the corresponding file
     * @param  {FileFolderContentChildren} params
     * @param  {Record<string} contentObject
     * @param  {Record<string} versionObject
     * @returns FileFolderContentChildren
     */
    addContentToFileRecursive(params: FileFolderContentChildren, contentObject: Record<string, Content>, versionObject: Record<string, ContentVersion>): FileFolderContentChildren;
    /**
     * Get file details through pathName
     * @param  {string} applicationId
     * @param  {string} pathName
     * @returns Promise
     */
    getFileDetailByPathname(applicationId: string, pathName: string): Promise<Partial<File>>;
    /**
     * Copy files
     * Get all the contents of the source file, or the contents of the live version
     * Copy the details of each content to the content of the new page
     * If there are dependencies in the content that already exist in the relations,
     *  use the relation information directly
     *
     * setLive: set the first version to live after clone from store
     * @param  {string} sourceFileId
     * @param  {string} options?
     * @returns Promise
     */
    copyFile(sourceFileId: string, targetApplicationId: string, options: {
        ctx: FoxCtx;
        folderId: string;
        hasLive: boolean;
        type?: string;
        targetFileId?: string;
        relations?: Record<string, Record<string, string>>;
        setLive?: boolean;
    }): Promise<Record<string, Record<string, string>>>;
    /**
     * add reference file
     * check file exist, if not, create it
     * @param sourceFileId
     * @param sourceApplicationId
     * @param options
     * @returns
     */
    referenceFile(sourceFileId: string, sourceApplicationId: string, options: {
        ctx: FoxCtx;
        targetApplicationId: string;
        targetFolderId: string;
        fileName?: string;
        type?: string;
    }): Promise<File>;
    /**
     * @param  {any[]} tagList
     * @param  {string[]} tagIndexes
     * @returns any
     */
    removeTags(tagList: any[], tagIndexes: string[]): any[];
    /**
     * filter reference file map
     * @param fileList
     * @returns
     */
    filterReferenceFile(fileList: File[]): Record<string, string>;
}
