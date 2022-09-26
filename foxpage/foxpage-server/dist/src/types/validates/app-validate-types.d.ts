import { FolderDetail } from './file-validate-types';
import { PagingReq, ResponseBase, ResponsePageBase } from './index-validate-types';
import { UserBase } from './user-validate-types';
export declare class AppIDReq {
    applicationId: string;
}
export declare class AppDetail {
    id?: string;
    name: string;
    intro?: string;
    creator: string;
    locales: Array<string>;
    resources: Array<AppResource>;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class AppResource {
    name: string;
    type: number;
    detail: any;
    id: string;
}
export declare class AppHostInfo {
    url: string;
    locales: Array<string>;
}
export declare class AppBaseDetail {
    name: string;
    intro: string;
    host: AppHostInfo[];
    slug: string;
    locales: Array<string>;
    resources: Array<AppResource>;
}
export declare class AppListReq extends PagingReq {
    organizationId: string;
    type: string;
    search?: string;
}
export declare class AllAppListReq extends PagingReq {
    search?: string;
}
export declare class AppListByIdsReq {
    applicationIds: Array<string>;
}
export declare class AddAppDetailReq extends AppBaseDetail {
    organizationId: string;
}
export declare class UpdateAppReq extends AppBaseDetail {
    applicationId: string;
}
export declare class AppListRes extends ResponsePageBase {
    data: AppDetail;
}
export declare class AppDetailRes extends ResponseBase {
    data: AppDetail;
}
export declare class AppResourceDetailRes extends ResponseBase {
    data: AppResource;
}
export declare class AppInfo {
    id: string;
    name: string;
}
export declare class AppDetailReq {
    applicationId: string;
    type: string;
}
export declare class AppDetailWithFolder extends AppDetail {
    folders: FolderDetail;
}
export declare class AppDetailWithFolderRes extends ResponseBase {
    data: AppDetailWithFolder;
}
export declare class AppPackageListReq extends AppIDReq {
}
export declare class AppPackageListDetail {
    id: string;
    title: string;
    version: string;
    content: any;
}
export declare class AppPackageListRes extends ResponseBase {
    data: AppPackageListDetail;
}
export declare class AppLocalesReq {
    applicationId: string;
}
export declare class AppLocalesRes extends ResponseBase {
    data: Array<string>;
}
export declare class AppProjectGoodsListReq extends PagingReq {
    applicationId: string;
    type: string;
    search: string;
}
export declare class AppPackageGoodsListReq extends PagingReq {
    applicationId: string;
    search: string;
}
export declare class AppSettingListReq extends PagingReq {
    applicationId: string;
    type: string;
    search?: string;
}
export declare class AppSettingInfo {
    id: string;
    name: string;
    status: boolean;
    category: Record<string, any>;
}
export declare class AppSettingDetailReq {
    applicationId: string;
    type: string;
    setting: AppSettingInfo[];
}
export declare class AppSettingItemDetail extends AppSettingInfo {
    creator: UserBase;
    createTime: Date;
    updateTime: Date;
}
export declare class AppSettingItemRes extends ResponsePageBase {
    data: Array<AppSettingItemDetail>;
}
