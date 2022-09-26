import { FolderDetailRes } from './file-validate-types';
export declare class AddResourceFolderDetailReq {
    applicationId: string;
    name: string;
    folderId: string;
    intro: string;
}
export declare class UpdateResourceDetailReq {
    applicationId: string;
    id: string;
    name: string;
    folderId: string;
}
export declare class ResourceFolderDetailRes extends FolderDetailRes {
}
export declare class ResourceListReq {
    applicationId: string;
    search: string;
    page: number;
    size: number;
}
export declare class AddResourceContentReq {
    applicationId: string;
    fileId: string;
    content: object;
}
export declare class UpdateResourceContentReq {
    applicationId: string;
    id: string;
    content: object;
}
