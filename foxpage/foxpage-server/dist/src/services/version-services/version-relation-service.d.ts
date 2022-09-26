import { ContentVersion, DSL } from '@foxpage/foxpage-server-types';
import { NameVersion, RelationAssocContent, RelationsRecursive } from '../../types/content-types';
import { BaseService } from '../base-service';
export declare class VersionRelationService extends BaseService<ContentVersion> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns VersionRelationService
     */
    static getInstance(): VersionRelationService;
    /**
     * Get the relation information in the version
     * @param  {ContentVersion[]} contentVersionList
     * @returns Record
     */
    getRelationsFromVersion(contentVersionList: ContentVersion[]): Record<string, string[]>;
    /**
     * Get all components recursively
     * Get all dependencies
     * Find if the component has a version available
     * Find out if there is an available version of the dependency
     * @param  {string} applicationId
     * @param  {any} versionContent
     * @returns Promise
     */
    getVersionRelationAndComponents(applicationId: string, versionContent: any): Promise<Record<string, number | string | NameVersion[]>>;
    /**
     * Return content corresponding to content, file information,
     * version information through contentIds in relations
     * @param  {string[]} relationIds
     * @returns RelationAssocContent
     */
    getRelationDetail(relationObject: Record<string, any>, buildVersion?: boolean): Promise<Record<string, RelationAssocContent>>;
    /**
     * Group relations by file type
     * Return {templates:[],variables:[],conditions:[],functions:[],...}
     * @param  {RelationsRecursive} relationRecursive
     * @returns Promise
     */
    getTypesRelationVersions(relationRecursive: RelationsRecursive): Promise<Record<string, DSL[]>>;
    /**
     * Through the version object information, recursively obtain the relation details in the version,
     * append it to the relation, and return the version object information
     * @param  {Record<string} versionObject
     * @param  {} ContentVersion>
     * @param  {boolean=true} liveVersion Whether to get the version information of live
     * @returns Promise
     */
    getVersionRelations(versionObject: Record<string, ContentVersion>, liveVersion?: boolean): Promise<Record<string, ContentVersion>>;
    /**
     * Add mock relation data to page content relations
     * @param versionRelations
     * @param mockRelations
     * @returns
     */
    moveMockRelations(versionRelations: any, mockRelations: any): any;
}
