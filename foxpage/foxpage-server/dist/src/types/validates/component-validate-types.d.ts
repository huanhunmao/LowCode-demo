import { ContentIdVersion, PagingReq, ResponseBase, ResponsePageBase } from './index-validate-types';
export declare class AppComponentsReq {
    applicationId: string;
    type: Array<string>;
    componentIds: Array<string>;
}
export declare class ResourceEntry {
    node: string;
    browser: string;
    css: string;
    debug: string;
}
export declare class ComponentResource {
    entry: ResourceEntry;
    'editor-entry': ResourceEntry;
}
export declare class ComponentDetail {
    id: string;
    name: string;
    version: string;
    type: string;
    resource: ComponentResource;
    schema: string;
}
export declare class AppComponentsRes extends ResponseBase {
    data: Array<ComponentDetail>;
}
export declare class AppComponentListReq {
    applicationId: string;
    type: string;
    search: string;
    page: number;
    size: number;
}
export declare class AppComponentVersionListReq {
    applicationId: string;
    id: string;
    search: string;
    page: number;
    size: number;
}
export declare class AddComponentReq {
    applicationId: string;
    name: string;
    type: string;
}
export declare class ComponentFileContentReq {
    applicationId: string;
    id: string;
}
export declare class ComponentFileVersionReq {
    applicationId: string;
    id: string;
    versionNumber: number;
}
export declare class ComponentVersionEditReq {
    applicationId: string;
    id: string;
}
export declare class ComponentVersionUpdateReq {
    applicationId: string;
    id: string;
    content: any;
    version: string;
}
export declare class UpdateComponentReq {
    applicationId: string;
    id: string;
    intro: string;
}
export declare class UpdateComponentContentReq {
    applicationId: string;
    id: string;
    tags: Array<object>;
}
export declare class AppPackageNameVersion {
    name: string;
    version: string;
}
export declare class AppNameVersionPackagesReq {
    applicationId: string;
    nameVersions: Array<AppPackageNameVersion>;
    type: Array<string>;
}
export declare class RemotePackageReq {
    applicationId: string;
    id: string;
    groupId: string;
    name: string;
}
export declare class NewComponentDetail {
    name: string;
    version: string;
    resourceName: string;
    isNew: boolean;
    files: any;
    id: string;
    groupId: string;
}
export declare class RemoteResource {
    groupId: string;
    groupName: string;
    name: string;
    version: string;
    resourceName: string;
    files: object;
    meta: object;
    schema: object;
    isNew: boolean;
    id: string;
}
export declare class RemoteComponentContent {
    resource: any;
    schema: any;
}
export declare class RemoteComponent {
    id: string;
    version: string;
    content: RemoteComponentContent;
}
export declare class BatchComponentResource {
    resource: RemoteResource;
    component: RemoteComponent;
}
export declare class SaveRemotePackageReq {
    applicationId: string;
    components: Array<BatchComponentResource>;
}
export declare class BatchEditorResource {
    name: string;
    groupId: string;
    component: RemoteComponent;
}
export declare class SaveEditorPackageReq {
    applicationId: string;
    components: Array<BatchEditorResource>;
}
export declare class RemotePackageRes extends ResponseBase {
    data: BatchComponentResource;
}
export declare class RemotePagePackageReq extends PagingReq {
    applicationId: string;
    groupId: string;
    groupName: string;
    name: string;
}
export declare class ComponentCategory {
    name: string;
    categoryName: string;
    groupName: string;
    sort?: number;
    rank?: number;
    props?: Record<string, any>;
    description?: string;
    screenshot?: string;
}
export declare class DeleteComponentCategoryReq {
    applicationId: string;
    id: string;
}
export declare class SetComponentCategoryReq extends DeleteComponentCategoryReq {
    category: ComponentCategory;
}
export declare class RemotePagePackageRes extends ResponsePageBase {
    data: Array<BatchComponentResource>;
}
export declare class BatchLiveReq {
    applicationId: string;
    idVersions: ContentIdVersion[];
}
export declare class GetCategoryComponentReq extends PagingReq {
    applicationId: string;
    search: string;
}
export declare class ComponentCategoryTypes {
    categoryName: string;
    groupNames: Array<string>;
}
export declare class ComponentCategoryTypesRes extends ResponseBase {
    data: Array<ComponentCategoryTypes>;
}
