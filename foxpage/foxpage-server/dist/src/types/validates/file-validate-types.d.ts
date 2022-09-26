import { AppFolderTypes, FileTypes } from '@foxpage/foxpage-server-types';
import { AppInfo } from './app-validate-types';
import { CreatorInfo, ResponseBase, ResponsePageBase } from './index-validate-types';
export declare class FolderDetail {
    id: string;
    name: string;
    intro: string;
    application: AppInfo;
    folder: string;
    creator: CreatorInfo;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class FileDetail {
    id?: string;
    name: string;
    intro: string;
    application: AppInfo;
    type: string;
    suffix: string;
    folderId: string;
    creator: CreatorInfo;
    createTime?: Date;
    updateTime?: Date;
    deleted?: Boolean;
}
export declare class FileBaseDetail {
    id?: string;
    name: string;
    intro: string;
    application: string;
    type: string;
    suffix: string;
    folderId: string;
    creator: string;
    createTime?: Date;
    updateTime?: Date;
    deleted?: Boolean;
}
export declare class FolderAndFileDetail {
    folders: FolderDetail;
    files: FileDetail;
}
export declare class FileListReq {
    applicationId: string;
    id: string;
    deleted: boolean;
    type: string;
    search: string;
    page: number;
    size: number;
}
export declare class AppFileListReq {
    applicationId: string;
    ids: Array<string>;
}
export declare class FileListRes extends ResponsePageBase {
    data: FileDetail;
}
export declare class FolderListRes extends ResponsePageBase {
    data: FolderDetail;
}
export declare class FileFolderListRes extends ResponsePageBase {
    data: FolderAndFileDetail;
}
export declare class BreadcrumbDetail {
    id: string;
    name: string;
    type: string;
}
export declare class FileBreadcrumbReq {
    applicationId: string;
    folderId: string;
    path: string;
}
export declare class FileBreadcrumbRes extends ResponseBase {
    data: BreadcrumbDetail;
}
export declare class FolderDetailReq {
    name: string;
    intro: string;
    applicationId: string;
    type: AppFolderTypes;
    parentFolderId: string;
}
export declare class FolderDetailRes extends ResponseBase {
    data: FolderDetail;
}
export declare class FileDetailReq {
    name: string;
    intro: string;
    applicationId: string;
    folderId: string;
    type: FileTypes;
    tags: Array<any>;
    suffix: string;
}
export declare class FileVersionDetailReq {
    applicationId: string;
    name: string;
    intro: string;
    folderId: string;
    type: FileTypes;
    suffix: string;
    content: any;
}
export declare class FileDetailRes extends ResponseBase {
    data: FileDetail;
}
export declare class FolderDeleteReq {
    id: string;
    applicationId: string;
    status: boolean;
}
export declare class UpdateFileDetailReq {
    applicationId: string;
    id: string;
    name: string;
    intro?: string;
    tags: Array<any>;
}
export declare class UpdateTypeFileDetailReq {
    applicationId: string;
    id: string;
    name: string;
    content: any;
    intro: string;
    type: string;
}
export declare class UpdateFolderDetailReq {
    id: string;
    name: string;
    applicationId: string;
}
export declare class DeleteFileReq {
    id: string;
    applicationId: string;
    status: boolean;
}
export declare class DeleteFolderReq {
    id: string;
    applicationId: string;
    status: boolean;
}
export declare class AddTypeFolderDetailReq {
    applicationId: string;
    name: string;
    intro: string;
    path: string;
    parentFolderId: string;
    tags: Array<object>;
    config: object;
}
export declare class AddResourceGroupDetailReq {
    applicationId: string;
    name: string;
    parentFolderId: string;
    intro: string;
    path: string;
    tags: Array<object>;
}
export declare class GetFileParentReq {
    applicationId: string;
    id: string;
}
export declare class AddMockReq extends FileVersionDetailReq {
    contentId?: string;
}
