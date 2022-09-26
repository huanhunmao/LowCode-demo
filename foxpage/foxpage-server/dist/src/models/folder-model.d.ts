import { Folder } from '@foxpage/foxpage-server-types';
import { FolderChildrenSearch, FolderPageSearch, WorkspaceFolderSearch } from '../types/file-types';
import { BaseModel } from './base-model';
/**
 * Folder repository related classes
 *
 * @export
 * @class FolderModel
 * @extends {BaseModel<Folder>}
 */
export declare class FolderModel extends BaseModel<Folder> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns FolderModel
     */
    static getInstance(): FolderModel;
    /**
     * Get all folders under the specified folder
     * @param  {any} params
     * @returns Promise
     */
    getFolderListByParentIds(params: FolderChildrenSearch): Promise<Folder[]>;
    /**
     * Get the number of folders under the specified folder
     * @param  {any} params
     * @returns Promise
     */
    getFolderCountByParentIds(params: FolderChildrenSearch): Promise<number>;
    /**
     * Search the data of each page of the folder
     * @param  {FolderPageSearch} params
     * @returns {Folder[]} Promise
     */
    getPageList(params: FolderPageSearch): Promise<Folder[]>;
    /**
     * Get the total number of folders
     * @param  {FolderPageSearch} params
     * @returns {number} Promise
     */
    getCount(params: FolderPageSearch): Promise<number>;
    /**
     * Get user special type folder list
     * @param  {WorkspaceFolderSearch} params
     * @returns Promise
     */
    getWorkspaceFolderList(params: WorkspaceFolderSearch): Promise<Folder[]>;
    /**
     * Get the count of user special type folder list
     * @param  {WorkspaceFolderSearch} params
     * @returns Promise
     */
    getWorkspaceFolderCount(params: WorkspaceFolderSearch): Promise<number>;
}
