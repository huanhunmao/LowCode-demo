import { ContentStatus } from '@foxpage/foxpage-server-types';
import { App, CreatorInfo, ResponseBase } from './index-validate-types';
export declare class AddContentReq {
    applicationId: string;
    fileId: string;
    title: string;
    isBase: boolean;
    extendId: string;
    tags: any[];
}
export declare class UpdateContentReq {
    applicationId: string;
    id: string;
    title: string;
    isBase: boolean;
    extendId: string;
    tags: Array<any>;
}
export declare class ContentBaseDetail {
    id: string;
    title: string;
    fileId: string;
    tags: Record<string, string>;
    liveVersionCode: number;
    creator: string;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class ContentDetail {
    id: string;
    title: string;
    fileId: string;
    tags: any;
    liveVersionNumber: number;
    liveVersion: string;
    creator: CreatorInfo;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class ContentDetailRes extends ResponseBase {
    data: ContentDetail;
}
export declare class ContentBaseDetailRes extends ResponseBase {
    data: ContentBaseDetail;
}
export declare class TagVersionRelation {
    content: ContentDetail;
    contentInfo: any;
}
export declare class TagVersionRelationRes extends ResponseBase {
    data: TagVersionRelation;
}
export declare class DeleteContentReq {
    id: string;
    status: boolean;
}
export declare class ContentStatusReq {
    id: string;
    status: string;
}
export declare class ContentListReq {
    applicationId: string;
    fileId: string;
    deleted: boolean;
    search: string;
}
export declare class ContentDetailsReq {
    applicationId: string;
    contentIds: Array<string>;
}
export declare class ContentVersionReq {
    applicationId: string;
    contentId: string;
    version: string;
    content: any;
}
export declare class DSLContentStructureReq {
    id: string;
    type: string;
    parentId: string;
    position: number;
    content: any;
    relation: Record<string, any>;
}
export declare class ContentSchemaRelation {
    id: string;
    schemas: any;
    relation: Record<string, any>;
    extension: Record<string, any>;
}
export declare class ContentVersionUpdateReq {
    applicationId: string;
    id: string;
    content: ContentSchemaRelation;
    version: string;
}
export declare class ContentVersionBaseUpdateReq {
    applicationId: string;
    id: string;
    content: ContentSchemaRelation;
}
export declare class ContentVersionCommonDetail {
    contentId: string;
    version: string;
    versionNumber: number;
    status: string;
    content: any;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class ContentVersionDetail extends ContentVersionCommonDetail {
    creator: CreatorInfo;
}
export declare class ContentVersionBaseDetail extends ContentVersionCommonDetail {
    creator: string;
}
export declare class ContentLiveReq {
    contentId: string;
    versionNumber: number;
}
export declare class ContentVersionListReq {
    applicationId: string;
    id: string;
    fileId: string;
}
export declare class ContentVersionDetailRes extends ResponseBase {
    data: ContentVersionDetail;
}
export declare class ContentVersionBaseDetailRes extends ResponseBase {
    data: ContentVersionBaseDetail;
}
export declare class ContentVersionBuildDetailReq extends App {
    fileId: string;
}
export declare class ContentDSLReq {
    id: string;
    versionNumber: number;
}
export declare class ContentDetailReq {
    id: string;
}
export declare class PageContentVersionDetailReq {
    applicationId: string;
    contentId: string;
    versionNumber: number;
}
export declare class ContentVersionDetailReq {
    applicationId: string;
    contentId: string;
    versionNumber: number;
    id: string;
}
export declare class TemplateListReq {
    applicationId: string;
    page: number;
    size: number;
}
export declare class TagContentVersionReq {
    applicationId: string;
    pathname: string;
    fileId: string;
    tags: Record<string, any>[];
}
export declare class AppFileContentStatusReq {
    applicationId: string;
    ids: string[];
    status: boolean;
}
export declare class AppContentStatusReq {
    applicationId: string;
    id: string;
    status: boolean;
}
export declare class AppContentLiveReq {
    applicationId: string;
    id: string;
    versionNumber: number;
}
export declare class ContentChangeReq {
    applicationId: string;
    timestamp: number;
}
export declare class VersionPublishStatusReq {
    applicationId: string;
    id: string;
    status: ContentStatus;
}
export declare class VersionPublishStatus2Req extends VersionPublishStatusReq {
    contentId: string;
}
export declare class CloneContentReq {
    applicationId: string;
    targetContentId: string;
    sourceContentId: string;
}
