import { Content, ContentVersion, File } from '@foxpage/foxpage-server-types';
import { ContentLiveVersion, FolderFileContent } from '../../types/content-types';
import { AppFileType } from '../../types/file-types';
import { BaseService } from '../base-service';
export declare class ContentListService extends BaseService<Content> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentListService
     */
    static getInstance(): ContentListService;
    /**
     * Get all content information of the specified type under the specified application.
     * If the file is component file and it reference from store,
     * then need replace file id to get content info
     * @param  {AppFileType} params
     * @returns {Content} Promise
     */
    getAppContentList(params: AppFileType): Promise<Content[]>;
    /**
     * Get the corresponding content and version details through fileIds
     * @param  {string[]} fileIds
     * @returns ContentVersion
     */
    getContentAndVersionListByFileIds(fileIds: string[]): Promise<{
        contentList: Content[];
        versionList: ContentVersion[];
    }>;
    /**
     * Get file content list
     * @param fileIds
     * @returns
     */
    getFileContentList(fileIds: string[], options?: {
        fileList?: File[];
    }): Promise<Record<string, Content[]>>;
    /**
     * Get content details through fileId,
     * only support the situation that there is only one content under the fileId
     * Return content details with fileId as the key name
     * @param  {string[]} fileIds
     * @returns Promise
     */
    getContentObjectByFileIds(fileIds: string[]): Promise<Record<string, Content>>;
    /**
     * Get content live number information through contentIds
     * @param  {string[]} contentIds
     * @returns {ContentLiveVersion[]} Promise
     */
    getContentLiveInfoByIds(contentIds: string[]): Promise<ContentLiveVersion[]>;
    /**
     * Get all the superior information of the specified content, including files and folders
     * @param  {string[]} contentIds
     * @returns Promise
     */
    getContentAllParents(contentIds: string[]): Promise<Record<string, FolderFileContent[]>>;
    /**
     * Get content id, and get the content reference file id
     * then, set the content info's fileId to reference file id
     * @param contentList
     * @returns
     */
    setContentReferenceFileId(applicationId: string, contentList: Content[]): Promise<Content[]>;
}
