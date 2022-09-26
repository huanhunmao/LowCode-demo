import { File } from '@foxpage/foxpage-server-types';
import { AppFileType, FileNameSearch, FilePageSearch } from '../types/file-types';
import { BaseModel } from './base-model';
/**
 * File repository related classes
 *
 * @export
 * @class FileModel
 * @extends {BaseModel<File>}
 */
export declare class FileModel extends BaseModel<File> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns FileModel
     */
    static getInstance(): FileModel;
    /**
     * Get the data of each page of the file
     * @param  {FilePageSearch} params
     * @returns {File[]} Promise
     */
    getPageList(params: FilePageSearch): Promise<File[]>;
    /**
     * Get the total number of files under specified conditions
     * @param  {FilePageSearch} params
     * @returns {number} Promise
     */
    getCount(params: FilePageSearch): Promise<number>;
    /**
     * Get file information by name
     * @param  {FileNameSearch} params
     * @returns {File]} Promise
     */
    getDetailByNames(params: FileNameSearch): Promise<File[]>;
    /**
     * Get all file information of a specified type under a specified application
     * @param  {AppFileType} params
     * @returns Promise
     */
    getAppFileList(params: AppFileType): Promise<File[]>;
}
