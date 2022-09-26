import { Content, ContentVersion, DSL, DslRelation, DslSchemas } from '@foxpage/foxpage-server-types';
import { ContentVersionNumber, NameVersion, NameVersionContent, SearchLatestVersion, UpdateContentVersion } from '../../types/content-types';
import { FoxCtx, TypeStatus } from '../../types/index-types';
import { BaseService } from '../base-service';
export declare class VersionInfoService extends BaseService<ContentVersion> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns VersionInfoService
     */
    static getInstance(): VersionInfoService;
    /**
     * New version details are added, only query statements required by the transaction are generated,
     * and the details of the created version are returned
     * @param  {Partial<ContentVersion>} params
     * @returns ContentVersion
     */
    create(params: Partial<ContentVersion>, options: {
        ctx: FoxCtx;
        fileId?: string;
        actionType?: string;
    }): ContentVersion;
    /**
     * Update version details, including version number
     * Get the maximum effective version data of the specified content (possibly base or other status)
     * 1, If it is base, update directly,
     * 2, If it is other status or no data, create a base and then update
     * @param  {UpdateContentVersion} params
     * @returns Promise
     */
    updateVersionDetail(params: UpdateContentVersion, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Promise<Record<string, number | string | string[]>>;
    /**
     * Update the specified data directly
     * @param  {string} id
     * @param  {Partial<Content>} params
     * @returns void
     */
    updateVersionItem(id: string, params: Partial<ContentVersion>, options: {
        ctx: FoxCtx;
        fileId?: string;
        actionType?: string;
    }): void;
    /**
     * Get the maximum version information of the specified page
     * If the largest version is invalid, whether to create a new version
     * @param  {string} contentId
     * @param  {boolean=false} createNew
     * @returns Promise
     */
    getMaxContentVersionDetail(contentId: string, options: {
        ctx: FoxCtx;
        createNew?: boolean;
    }): Promise<ContentVersion>;
    /**
     * Get the latest base version details of the specified content
     * @param  {string} contentId
     * @returns Promise
     */
    getMaxBaseContentVersionDetail(contentId: string): Promise<ContentVersion>;
    /**
     * Through contentId, create a new version details
     * The new version number is determined by the latest valid version under the content
     * @param {string} contentId
     * @returns {Promise<ContentVersion>}
     * @memberof VersionService
     */
    createNewContentVersion(contentId: string, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Promise<ContentVersion>;
    /**
     * Set the delete status of the version.
     * If the version is live version, you need to check whether the content is referenced
     * @param  {TypeStatus} params
     * @returns Promise
     */
    setVersionDeleteStatus(params: TypeStatus, options: {
        ctx: FoxCtx;
        actionType?: string;
    }): Promise<Record<string, number>>;
    /**
     * Set the delete status of the specified version in batches,
     * @param  {ContentVersion[]} versionList
     * @returns void
     */
    batchSetVersionDeleteStatus(versionList: ContentVersion[], options: {
        ctx: FoxCtx;
        status?: boolean;
        actionType?: string;
    }): void;
    /**
     * Get version details by file name and content version.
     * The data is the case where the file name and content name are the same,
     * and there is only one content under the file, such as components
     * @param  {string} applicationId
     * @param  {NameVersion[]} nameVersions
     * @returns Promise
     */
    getVersionDetailByFileNameVersion(applicationId: string, type: string, nameVersions: NameVersion[]): Promise<NameVersionContent[]>;
    /**
     * Get the latest version information of the page content
     * @param  {SearchLatestVersion} params
     * @returns {ContentVersion} Promise
     */
    getContentLatestVersion(params: SearchLatestVersion): Promise<ContentVersion>;
    /**
     * Get details of the specified page version or live version
     * @param  {ContentVersionNumber} params
     * @returns Promise
     */
    getContentVersionDetail(params: ContentVersionNumber): Promise<ContentVersion>;
    /**
     * Through contentList and contentVersionList information,
     * match contentId+version corresponding to the version details corresponding to different versions.
     * And contains the version details corresponding to the live version with contentId as the key.
     * Return information with content+version as the key
     * @param  {Content[]} contentList
     * @param  {ContentVersion[]} contentVersionList
     * @returns StringObject
     */
    mappingContentVersionInfo(contentList: Content[], contentVersionList: ContentVersion[]): Record<string, ContentVersion>;
    /**
     * Find the templateId through the version data of the page, and get the live version data of the template
     * @param  {string} applicationId
     * @param  {ContentVersion} pageVersion
     * @returns Promise
     */
    getTemplateDetailFromPage(applicationId: string, pageVersion: ContentVersion, options?: {
        isLive: boolean;
    }): Promise<Partial<ContentVersion>>;
    /**
     * Copy version information from the specified content version
     * 1, update the structureId in the source version
     * 2, replace the relationId in the source version
     * @param  {DSL} sourceContentVersion
     * @param  {string} contentId: New content ID
     * @param  {
     *  relations:Record<string>
     *  tempRelations: Record<string, Record<string, string>>,
     *  create?: boolean
     *  versionId?: string
     * } options
     * create: true if for copy and create version, false is for copy and update version
     * versionId: when create is false, then update this version id's detail
     * @returns
     */
    copyContentVersion(sourceContentVersion: DSL, contentId: string, options: {
        ctx: FoxCtx;
        relations: Record<string, Record<string, string>>;
        tempRelations: Record<string, Record<string, string>>;
        create?: boolean;
        versionId?: string;
        setLive?: boolean;
        idMaps?: Record<string, string>;
    }): Record<string, any>;
    /**
     * Update the structureId value in the dsl schema
     * @param  {DslSchemas[]} schemas
     * @returns DslSchemas
     */
    changeDSLStructureIdRecursive(schemas: DslSchemas[], idMaps?: Record<string, string>, parentId?: string): {
        schemas: DslSchemas[];
        idMaps: Record<string, string>;
    };
    /**
     * replace the special schemas relation name and ids
     * @param  {DslSchemas[]} schemas
     * @param  {Record<string, DslRelation>} relation
     * @param  {Record<string,Record<string,string>>} relations
     * @returns
     */
    replaceVersionSchemaRelationNames(schemas?: DslSchemas[], relation?: Record<string, DslRelation>, relations?: Record<string, Record<string, string>>): {
        schemas: DslSchemas[];
        relation: Record<string, DslRelation>;
    };
    /**
     * Get the version's relation and component details
     * @param versionDetail
     * @param options
     * @returns
     */
    getPageVersionInfo(versionDetail: ContentVersion, options: {
        applicationId: string;
        isLive?: boolean;
    }): Promise<Record<string, any>>;
}
