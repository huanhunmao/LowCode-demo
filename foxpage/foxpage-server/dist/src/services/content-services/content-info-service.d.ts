import { Content, DSL, FileTypes } from '@foxpage/foxpage-server-types';
import { FolderFileContent, UpdateTypeContent } from '../../types/content-types';
import { FoxCtx, TypeStatus } from '../../types/index-types';
import { AppResource } from '../../types/validates/app-validate-types';
import { BaseService } from '../base-service';
export declare class ContentInfoService extends BaseService<Content> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentInfoService
     */
    static getInstance(): ContentInfoService;
    /**
     * New content details, only query statements required by the transaction are generated,
     * and details of the created content are returned
     * @param  {Partial<Content>} params
     * @returns Content
     */
    create(params: Partial<Content>, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Content;
    /**
     * Create content details, if it is not component content, create version information by default
     * @param  {Partial<Content>} params
     * @param  {FileTypes} type
     * @param  {any} content?
     * @returns Content
     */
    addContentDetail(params: Partial<Content>, options: {
        ctx: FoxCtx;
        type: FileTypes;
        content?: any;
        actionType?: string;
    }): Content;
    /**
     * Update content details
     * @param  {UpdateTypeContent} params
     * @returns Promise
     */
    updateContentDetail(params: UpdateTypeContent, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Promise<Record<string, number>>;
    /**
     * Update the specified data directly
     * @param  {string} id
     * @param  {Partial<Content>} params
     * @returns void
     */
    updateContentItem(id: string, params: Partial<Content>, options: {
        ctx: FoxCtx;
        fileId?: string;
        actionType?: string;
    }): void;
    /**
     * Set the specified content to be deleted
     * @param  {string} contentId
     * @returns Promise
     */
    setContentDeleteStatus(params: TypeStatus, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Promise<Record<string, number>>;
    /**
     * Set the delete status of the specified content in batches,
     * @param  {Content[]} contentList
     * @returns void
     */
    batchSetContentDeleteStatus(contentList: Content[], options: {
        ctx: FoxCtx;
        status?: boolean;
        actionType?: string;
    }): void;
    /**
     * Get the resource type from all the parents of content, and get the corresponding application resource details
     * @param  {AppResource[]} appResource
     * @param  {Record<string} contentParentObject
     * @param  {} FolderFileContent[]>
     * @returns Record
     */
    getContentResourceTypeInfo(appResource: AppResource[], contentParentObject: Record<string, FolderFileContent[]>): Record<string, AppResource>;
    /**
     * Copy content from specified content information
     * At the same time copy the version information from the specified content version information
     * @param  {Content} sourceContentInfo
     * @param  {DSL} sourceContentVersion
     * @param  {{relations:Record<string} options
     * @param  {Record<string} string>;tempRelations
     * @param  {} string>}
     * @returns Record
     */
    copyContent(sourceContentInfo: Content, sourceContentVersion: DSL, options: {
        ctx: FoxCtx;
        relations: Record<string, Record<string, string>>;
        tempRelations: Record<string, Record<string, string>>;
        setLive?: boolean;
        idMaps?: Record<string, string>;
    }): Record<string, any>;
    /**
     * get content extension from detail,eg extendId, mockId
     * @param contentDetail
     * @returns
     */
    getContentExtension(contentDetail: Content, extensionName?: string[]): Record<string, any>;
}
