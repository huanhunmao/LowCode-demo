import { AppFolderTypes, Folder } from '@foxpage/foxpage-server-types';
import { AppDefaultFolderSearch, AppFolderType, AppsFolderType, AppTypeFolderUpdate, FolderPathSearch } from '../../types/file-types';
import { FoxCtx, TypeStatus } from '../../types/index-types';
import { BaseService } from '../base-service';
export declare class FolderInfoService extends BaseService<Folder> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentInfoService
     */
    static getInstance(): FolderInfoService;
    /**
     * Add the details of the new folder, return to the new query
     * @param  {Partial<Folder>} params
     * @returns Folder
     */
    create(params: Partial<Folder>, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Folder;
    /**
     * Get the id of the specified default folder of the specified application
     * @param  {AppFolderType} params
     * @returns Promise
     */
    getAppTypeFolderId(params: AppFolderType): Promise<string>;
    /**
     * Get app multi default folder ids
     * @param  {AppsFolderType} params
     * @returns Promise {appId: folderId}
     */
    getAppsTypeFolderId(params: AppsFolderType): Promise<Record<string, string>>;
    /**
     * Get the default folder Ids of the specified type under the specified application
     * @param  {AppDefaultFolderSearch} params
     * @returns {string[]} Promise
     */
    getAppDefaultFolderIds(params: AppDefaultFolderSearch): Promise<Set<string>>;
    /**
     * Get the id of the folder by path
     * @param  {string} parentFolderId
     * @param  {string[]} pathList
     * @returns Promise
     */
    getFolderIdByPathRecursive(params: FolderPathSearch, options: {
        ctx: FoxCtx;
        createFolder?: boolean;
    }): Promise<string>;
    /**
     * Add folders of specified types under the application, such as items, variables, conditions, etc.
     * @param  {Folder} folderDetail
     * @param  {Record<string, number | Folder>} type
     * @param  {Record<string, any>} distinctParams, filter same data
     * @returns Promise
     */
    addTypeFolderDetail(folderDetail: Partial<Folder>, options: {
        ctx: FoxCtx;
        type: AppFolderTypes;
        actionType?: string;
        distinctParams?: Record<string, any>;
    }): Promise<Record<string, number | Folder>>;
    /**
     * Update the file details of the specified type under the application
     * @param  {AppTypeFolderUpdate} folderDetail
     * @param  {AppFolderTypes} type
     * @returns Promise
     */
    updateTypeFolderDetail(folderDetail: AppTypeFolderUpdate, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Promise<Record<string, number>>;
    /**
     * Update the specified data directly
     * @param  {string} id
     * @param  {Partial<Content>} params
     * @returns void
     */
    updateContentItem(id: string, params: Partial<Folder>, options: {
        ctx: FoxCtx;
    }): void;
    /**
     * Update the delete status of the folder.
     * When deleting, you need to check whether there is any content being referenced.
     * When you enable it, you don’t need to check
     * @param  {TypeStatus} params
     * @param  {number} checkType, 1: check reference, 2: check children, "Bit and"
     * @returns Promise
     */
    setFolderDeleteStatus(params: TypeStatus, options: {
        ctx: FoxCtx;
        checkType?: number;
    }): Promise<Record<string, number>>;
    /**
     * Set the delete status of specified folders in batches,
     * @param  {Folder[]} folderList
     * @returns void
     */
    batchSetFolderDeleteStatus(folderList: Folder[], options: {
        ctx: FoxCtx;
        status?: boolean;
        type?: string;
    }): void;
}
