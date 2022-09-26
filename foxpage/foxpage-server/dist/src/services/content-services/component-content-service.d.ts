import { AppResource, Component, Content, DslSchemas, EditorEntry } from '@foxpage/foxpage-server-types';
import { ComponentInfo, ComponentNameVersion } from '../../types/component-types';
import { AppNameVersion, AppTypeContent, ComponentRecursive, NameVersion, NameVersionPackage } from '../../types/content-types';
import { FoxCtx, TRecord } from '../../types/index-types';
import { BaseService } from '../base-service';
export declare class ComponentContentService extends BaseService<Content> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentService
     */
    static getInstance(): ComponentContentService;
    /**
     * Get all data information from DSL
     * @param  {applicationId} string
     * @param  {DslSchemas[]} schemas
     * @returns Promise
     */
    getComponentsFromDSL(applicationId: string, schemas: DslSchemas[]): Promise<Component[]>;
    /**
     * Recursively obtain component information of all levels in the DSL
     * @param  {DslSchemas[]} components
     * @returns NameVersion
     */
    getComponentInfoRecursive(schemas: DslSchemas[]): NameVersion[];
    /**
     * Get the component details under the specified application through the component name and version
     * @param  {string} applicationId
     * @param  {NameVersion[]} componentInfos
     * @returns Promise
     */
    getComponentDetails(applicationId: string, componentInfos: NameVersion[], showLiveVersion?: boolean): Promise<Component[]>;
    /**
     * Get the resource ids set by the component from the component list
     * @param  {ContentVersion[]} componentList
     * @returns Promise
     */
    getComponentResourceIds(componentList: Component[], types?: string[]): string[];
    /**
     * Replace the resource id in the component with the resource details
     * @param  {ContentVersion[]} componentList
     * @param  {Record<string} resourceObject
     * @param  {} object>
     * @returns ContentVersion
     */
    replaceComponentResourceIdWithContent(componentList: Component[], resourceObject: TRecord<TRecord<string>>, contentResource?: Record<string, AppResource>): Component[];
    /**
     * Get the id of the component editor from the component details, version
     * @param  {Component[]} componentList
     * @returns string
     */
    getComponentEditors(componentList: Component[]): EditorEntry[];
    /**
     * Get the editor information from the component, and return the component details of the editor
     * @param  {string} applicationId
     * @param  {Component[]} componentList
     * @returns Promise
     */
    getEditorDetailFromComponent(applicationId: string, componentList: Component[]): Promise<Component[]>;
    /**
     * Recursively get the details of the component,
     * Check the validity of the components
     * Check whether the component has a circular dependency
     * @param  {string} applicationId
     * @param  {NameVersion[]} componentInfos
     * @param  {Record<string} componentDependents
     * @param  {} string[]>={}
     * @returns Promise
     */
    getComponentDetailRecursive(applicationId: string, componentInfos: NameVersion[], componentDependents?: Record<string, string[]>): Promise<ComponentRecursive>;
    /**
     * Get the component details by name, version,
     * and return the object with the passed name_version as the key name
     * @param  {ComponentNameVersion} params
     * @returns Promise
     */
    getComponentDetailByNameVersion(params: ComponentNameVersion): Promise<Record<string, ComponentInfo>>;
    /**
     * Get the content version details of the component through the content name and version,
     *  the same name has different versions of data
     * Prerequisite: The content name is the same as the file name (for example: component type content),
     *  and there is only 1 content information under the file
     *
     * Get the versionNumber of the content with the version,
     *  and get the versionNumber of the live if there is no version,
     * Get content details through contentId, versionNumber
     * @param  {AppNameVersion} params
     * @returns {NameVersionPackage[]} Promise
     */
    getAppComponentByNameVersion(params: AppNameVersion): Promise<NameVersionPackage[]>;
    /**
     * Get the live version details of the component content under the specified application,
     * and return the content version details
     * @param  {AppTypeContent} params
     * @returns {NameVersionPackage[]} Promise
     */
    getComponentVersionLiveDetails(params: AppTypeContent): Promise<NameVersionPackage[]>;
    /**
     * Clone package content
     * @param targetFileId
     * @param sourceFileId
     * @param options
     */
    cloneContent(targetFileId: string, sourceFileId: string, options: {
        ctx: FoxCtx;
    }): Promise<void>;
}
