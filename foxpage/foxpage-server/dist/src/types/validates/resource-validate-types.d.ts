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
export declare class ResourceGroupListReq {
    applicationId: string;
    search: string;
    page: number;
    size: number;
}
export declare class ResourceListReq {
    applicationId: string;
    parentFolderId: string;
    search: string;
    page: number;
    size: number;
}
export declare class ResourceContent {
    realPath: string;
    downloadPath: string;
}
export declare class AddResourceContentReq {
    applicationId: string;
    folderId: string;
    content: ResourceContent;
}
export declare class UpdateResourceContentReq {
    applicationId: string;
    id: string;
    content: ResourceContent;
}
export declare class ResourceDetailReq {
    applicationId: string;
    id: string;
    name: string;
}
export declare class UpdateResourceFolderReq {
    applicationId: string;
    id: string;
    name: string;
    intro: string;
}
export declare class ResourcePathDetailReq {
    applicationId: string;
    path: string;
    depth: number;
}
export declare class ResourceContentDetailReq {
    applicationId: string;
    id: string;
    fileId: string;
}
export declare class ResourceContentListReq {
    applicationId: string;
    id: string;
}
export declare class ResourceInfoReq {
    applicationId: string;
    id: string;
    path: string;
}
export declare class ResourceGroupReq {
    applicationId: string;
    id: string;
    name: string;
}
export declare class NewResourceDetail {
    name: string;
    version: string;
    resourceName: string;
    isNew: boolean;
    files: object;
    meta: object;
    schema: object;
    id: string;
}
export declare class SaveResourceListReq {
    applicationId: string;
    id: string;
    resources: Array<NewResourceDetail>;
}
export declare class UpdateResourceConfigReq {
    applicationId: string;
    id: string;
    name: string;
    config: object;
    intro: string;
}
export declare class ResourceRemoteURLReq {
    applicationId: string;
    resourceType: string;
    resourceScope: string;
}
