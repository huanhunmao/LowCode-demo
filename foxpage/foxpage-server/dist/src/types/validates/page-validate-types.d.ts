import { ComponentDetail } from './component-validate-types';
import { ContentBaseDetail, ContentVersionBaseDetail } from './content-validate-types';
import { FileBaseDetail } from './file-validate-types';
import { PagingReq, ResponsePageBase } from './index-validate-types';
export declare class AppPageListCommonReq {
    applicationId: string;
    fileId: string;
    page: number;
    size: number;
    search: string;
}
export declare class AppTypePageListCommonReq {
    applicationId: string;
    folderId: string;
    type: string;
    page: number;
    size: number;
    search: string;
}
export declare class AppPageCatalogCommonReq {
    applicationId: string;
    id: string;
}
export declare class AppPageBuilderItemReq extends PagingReq {
    applicationId: string;
    scope: string;
    type: string;
    search: string;
}
export declare class AppContentVersionReq {
    applicationId: string;
    ids: Array<string>;
}
export declare class AppTypeFilesReq extends PagingReq {
    applicationId: string;
    scope: string;
    folderId: string;
    search: string;
}
export declare class PageBuildVersionReq {
    applicationId: string;
    id: string;
}
export declare class AppContentDetail {
    id: string;
    contentId: string;
    version: string;
    versionNumber: number;
    content: any;
}
export declare class AppContentListRes extends ResponsePageBase {
    list: AppContentDetail;
}
export declare class PageContentData {
    id: string;
    schemas: any[];
    relation: object;
}
export declare class PageContentDataRes extends ResponsePageBase {
    data: PageContentData;
}
export declare class PageBuildVersion extends ContentVersionBaseDetail {
    components: Array<ComponentDetail>;
}
export declare class PageBuildVersionRes {
    data: PageBuildVersion;
}
export declare class AppPageItemListContentReq {
    applicationId: string;
    projectId: string;
    page: number;
    size: number;
    search: string;
}
export declare class AppProjectItemContentDetail extends FileBaseDetail {
    contents: ContentBaseDetail[];
}
export declare class AppProjectItemContentDetailRes extends ResponsePageBase {
    data: AppProjectItemContentDetail[];
}
