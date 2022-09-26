import { FoxCtx } from 'src/types/index-types';
import { Component, ComponentDSL, ContentVersion, File, IdVersion, IdVersionNumbers } from '@foxpage/foxpage-server-types';
import { AppItemSearch } from '../types/app-types';
import { ComponentContentInfo } from '../types/component-types';
import { UpdateContentVersion } from '../types/content-types';
export declare class ComponentService {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ComponentService
     */
    static getInstance(): ComponentService;
    /**
     * Update component version details, including version number
     * @param  {UpdateContentVersion} params
     * @returns Promise
     */
    updateVersionDetail(params: UpdateContentVersion, options: {
        ctx: FoxCtx;
    }): Promise<Record<string, number | string | string[]>>;
    /**
     * Get component details through id and version
     * If the component specifies the version, such as: 1.1.2, then get the version of 1.1.2
     * If the component does not specify the version or other circumstances, the live version is taken
     *
     * Recursively obtain component information that the component depends on
     *
     * Taking into account the problem of obtaining different versions of the same component,
     * and the ids are all using contentId, it is impossible to distinguish the attribution of
     * different versions of the same component in the returned results
     * So, for the time being, if there are multiple versions of the same component,
     * the details will be obtained separately
     * @param  {any[]} componentInfos The information of all acquired components is used to exclude
     * the acquired version information of the components
     * @returns Promise Returns the component details information object with contentId_version as the key
     */
    getComponentDetailByIdVersion(idVersions: IdVersion[], componentInfos?: Record<string, ContentVersion>): Promise<Record<string, ContentVersion>>;
    /**
     * Get the versionNumber corresponding to version by id, version
     * If version is empty or undefined, take the live version corresponding to id
     * Return:
     * [
     *  {id:xxx, versionNumbers: [1]},
     *  {id:xxx, version:0.0.2, versionNumbers: [2]},
     * ]
     * @param  {IdVersion[]} idVersions
     * @returns Promise
     */
    getComponentVersionNumberFromVersion(idVersions: IdVersion[]): Promise<IdVersionNumbers[]>;
    /**
     * Obtain the id and version information of editor and dependencies from the component version
     * @param  {ContentVersion[]} versionList
     * @returns IdVersion
     */
    getComponentEditorAndDependends(versionList: Component[], types?: string[]): IdVersion[];
    /**
     * Obtain the id and version information of editor and dependencies from the component version
     * @param  {ContentVersion[]} versionList
     * @returns IdVersion
     */
    getEditorAndDependenceFromComponent(componentList: Component[]): IdVersion[];
    /**
     * Add the name field to the editor-entry and dependencies data in the component
     * Support reference modification
     * @param  {Component[]} componentList
     * @param  {Record<string} componentFileObject
     * @param  {} File>
     * @returns Component
     */
    addNameToEditorAndDepends(componentList: ComponentContentInfo[], componentFileObject: Record<string, File>): ComponentContentInfo[];
    /**
     * Get component resource host and path by content ids
     *
     * entry: { node:'cont_gyEx3GoTu5cCMGY' }
     * =>
     * entry: {
     *  node: {
          "host": "http://app.ares.fx.xxx.com/",
          "downloadHost": "http://app.ares.fx.xxx.com/",
          "path": "ares-test/flight-searchbox-container/0.3.1/umd/production.min.js",
          "contentId": "cont_gyEx3GoTu5cCMGY",
          "origin": "ARES"
        }
     * }
     * @param  {ComponentDSL} versionContent
     * @returns Promise
     */
    getComponentResourcePath(versionContent: ComponentDSL): Promise<ComponentDSL>;
    /**
    * Get component file info by app id and component name
    * @param applicationId
    * @param componentName
    * @returns
    */
    getComponentInfoByNames(applicationId: string, componentNames: string[]): Promise<File[]>;
    /**
     * Set the reference component new live status log
     * @param fileId
     * @param options
     */
    updateReferLiveVersion(contentId: string, fileId: string, options: {
        ctx: FoxCtx;
    }): Promise<void>;
    /**
     * Get category components list
     * @param params
     * @returns
     */
    getPageCategoryComponents(params: AppItemSearch): Promise<{
        list: File[];
        count: number;
    }>;
}
