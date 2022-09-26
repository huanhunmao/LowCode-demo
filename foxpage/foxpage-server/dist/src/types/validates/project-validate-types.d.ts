import { FolderDetail, FolderDetailRes } from './file-validate-types';
import { ResponseBase, ResponsePageBase } from './index-validate-types';
export declare class AddProjectDetailReq {
    applicationId: string;
    name: string;
    intro: string;
    path: string;
}
export declare class ProjectPageContent {
    locale: string;
    detail: string;
}
export declare class ProjectPage {
    name: string;
    path: string;
    content: ProjectPageContent;
}
export declare class AddProjectPagesReq {
    applicationId: string;
    projectId: string;
    files: Array<ProjectPage>;
}
export declare class UpdateProjectDetailReq {
    applicationId: string;
    projectId: string;
    name: string;
    intro: string;
    path: string;
}
export declare class ProjectDetailRes extends FolderDetailRes {
}
export declare class ProjectListReq {
    organizationId: string;
    type: string;
    typeId: string;
    applicationId: string;
    search: string;
    page: number;
    size: number;
}
export declare class ProjectPageFilter {
    pathList: Array<String>;
}
export declare class ProjectPagesReq {
    applicationId: string;
    projectId: string;
    filter: ProjectPageFilter;
}
export declare class ProjectListRes extends ResponsePageBase {
    data: Array<FolderDetail>;
}
export declare class ProjectPageDetail {
    fileId: string;
    path: string;
    version: string;
    content: object;
}
export declare class ProjectScopeTypeReq {
    applicationId: string;
    id: string;
    search: string;
    names: Array<string>;
    page: number;
    size: number;
}
export declare class ProjectPageListRes extends ResponseBase {
    data: ProjectPageDetail;
}
export declare class PublishProjectPageReq {
    applicationId: string;
    projectId: string;
    ids: Array<string>;
}
export declare class PublishProjectPageRes extends ResponseBase {
    data: ProjectPageDetail;
}
export declare class ProjectDeleteReq {
    projectId: string;
    applicationId: string;
}
export declare class WorkspaceProjectListReq {
    organizationId: string;
    search: string;
    page: number;
    size: number;
}
