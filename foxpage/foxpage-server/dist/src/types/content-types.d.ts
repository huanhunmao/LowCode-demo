import { Component, ComponentDSL, Content, ContentStatus, ContentVersion, DSL, DslRelation, DslSchemas, File, FileTypes, Folder, Tag } from '@foxpage/foxpage-server-types';
import { Creator, Search } from './index-types';
export declare type SearchContentExist = Pick<Content, 'title' | 'fileId'>;
export declare type ContentInfo = Exclude<Content, 'creator'> & {
    version?: string;
    creator: Creator | string;
    isBase?: boolean;
    extendId?: string;
};
export declare type ContentVersionInfo = Exclude<ContentVersion, 'creator'> & {
    creator: Creator;
};
export declare type ContentVersionNumber = Pick<ContentVersion, 'contentId' | 'versionNumber'>;
export declare type ContentVersionString = Pick<ContentVersion, 'contentId' | 'version'>;
export declare type ContentLiveVersion = Pick<Content, 'id' | 'liveVersionNumber'>;
export declare type ContentTagLiveVersion = Pick<Content, 'id' | 'tags' | 'liveVersionNumber'>;
export declare type AppPackageDetail = Pick<ContentVersion, 'content' | 'version'> & {
    id: string;
    title: string;
};
export declare type UpdateContent = Partial<Pick<Content, 'title' | 'tags'>>;
export declare type TemplateDetail = Pick<Content, 'id' | 'title'> & {
    version?: ContentVersion;
};
export declare type PageBuildVersion = ContentVersion & {
    components: Component[];
};
export declare type ContentSearch = Search & {
    fileId: string;
};
export declare type RelationContentInfo = Record<string, File[] | DSL[]>;
export declare type NewContentInfo = Pick<Content, 'title' | 'fileId' | 'tags' | 'creator'>;
export declare type ContentVersionWithLive = ContentVersion & {
    isLiveVersion?: boolean;
};
export declare type ContentCheck = Pick<Content, 'title' | 'fileId'>;
export declare type ContentInfoUrl = ContentInfo & {
    urls: string[];
};
export declare type NameVersionContent = NameVersion & {
    content: DSL;
};
export declare type NameVersionPackage = NameVersion & {
    package?: ComponentDSL;
};
export declare type FolderFileContent = Folder | File | Content;
export interface VersionNumber {
    version: string;
    versionNumber: number;
}
export interface SearchLatestVersion {
    contentId: string;
    deleted?: boolean;
}
export interface VersionSearch {
    contentId: string;
    status?: string;
    deleted?: boolean;
    versionNumber?: number;
}
export interface NameVersion {
    name: string;
    version?: string;
}
export interface AppNameVersion {
    applicationId: string;
    contentNameVersion: NameVersion[];
    type?: string;
}
export interface AppTypeContent {
    applicationId: string;
    type: FileTypes | FileTypes[];
    contentIds?: string[];
}
export interface TagContentData {
    id: string;
    version: string;
    tags: Tag[];
    content: DSL;
    dslVersion?: string;
}
export interface PageContentData {
    id: string;
    schemas: DslSchemas[];
    relation: Record<string, DslRelation>;
}
export interface AppTag {
    applicationId: string;
    tags: Tag[];
    pathname?: string;
    fileId?: string;
}
export interface FileTagContent {
    fileIds: string[];
    tags: Tag[];
}
export interface PageContentSearch extends Search {
    applicationId: string;
    fileId: string;
    type: FileTypes;
}
export interface UpdateTypeContent {
    applicationId: string;
    id: string;
    type: FileTypes;
    title?: string;
    tags?: Tag[];
}
export interface UpdateContentVersion {
    applicationId: string;
    id: string;
    content: DSL | ComponentDSL;
    version: string;
}
export interface RelationAssocContent {
    files: File[];
    contents: Content[];
    versions: ContentVersion[];
}
export interface TagVersionRelation {
    content: Content;
    contentInfo: RelationContentInfo;
}
export interface LiveContentVersion {
    applicationId: string;
    id: string;
    versionNumber: number;
}
export interface VersionPublish {
    applicationId: string;
    id: string;
    status: ContentStatus;
}
export interface PageContentRelations {
    content: DSL;
    relations: Record<string, DSL[]>;
    dslVersion?: string;
    mock?: Record<string, any>;
}
export interface PageContentRelationsAndExternal {
    content: VersionWithExternal;
    relations: Record<string, DSL[]>;
    mock?: Record<string, any>;
}
export interface PageContentRelationInfos extends PageContentRelations {
    id: string;
    version?: string;
    dependMissing?: string[];
    recursiveItem?: string;
}
export interface RelationsRecursive {
    relationList: ContentVersion[];
    dependence: Record<string, string[]>;
    recursiveItem: string;
    missingRelations: string[];
}
export interface ComponentRecursive {
    componentList: NameVersionContent[];
    dependence: Record<string, string[]>;
    recursiveItem: string;
    missingComponents: NameVersion[];
}
export interface CircleDepend {
    recursiveItem: string;
    dependencies: Record<string, string[]>;
}
export interface ContentScopeInfo {
    id: string;
    name: string;
    versionNumber: number;
    content: DSL;
    isLiveVersion?: boolean;
    relations?: Record<string, any[]>;
}
export interface FileContentAndVersion {
    id: string;
    name: string;
    type: string;
    version: string;
    versionNumber: number;
    contentId: string;
    content: DSL;
    relations?: Record<string, ContentVersion[]>;
    online?: boolean;
}
export interface VersionCheckResult {
    code: number;
    data: DSL;
    msg?: string;
}
export interface VersionWithExternal extends DSL {
    name?: string;
    version?: string;
    fileId?: string;
    mocks?: Record<string, DSL>;
    extension?: Record<string, string>;
}
