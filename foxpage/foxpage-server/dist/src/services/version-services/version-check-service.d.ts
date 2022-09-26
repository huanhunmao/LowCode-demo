import { ContentVersion, DSL, DslRelation, DslSchemas } from '@foxpage/foxpage-server-types';
import { ContentVersionNumber, ContentVersionString, VersionCheckResult } from '../../types/content-types';
import { BaseService } from '../base-service';
export declare class VersionCheckService extends BaseService<ContentVersion> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns VersionCheckService
     */
    static getInstance(): VersionCheckService;
    /**
     * Check the required fields in version content
     * The required fields for page, template, variable, condition, function are: ['schemas','relation']
     * The required fields for package are ['resource','meta','schema']
     * @param  {string} fileId
     * @param  {any} content
     * @returns {string[]} Promise
     */
    contentFields(fileId: string, content: any): Promise<string[]>;
    /**
     * Filter out non-existent content version number information
     * @param  {ContentVersionNumber[]} idNumbers
     * @param  {ContentVersion[]} contentVersion
     * @returns ContentVersionNumber
     */
    notExistVersionNumber(idNumbers: ContentVersionNumber[], contentVersion: ContentVersion[]): ContentVersionNumber[];
    /**
     * Filter out content version information that does not exist
     * @param  {ContentVersionString[]} idVersions
     * @param  {ContentVersion[]} contentVersion
     * @returns ContentVersionString
     */
    notExistVersion(idVersions: ContentVersionString[], contentVersion: ContentVersion[]): ContentVersionString[];
    /**
     * Check whether the specified version number is a new version
     * (that is, the version does not exist in the database)
     * @param  {string} contentId
     * @param  {number} versionNumber
     * @returns {boolean} Promise
     */
    isNewVersion(contentId: string, versionNumber: number): Promise<boolean>;
    /**
     * Verify that the specified version number exists
     * @param  {string} contentId
     * @param  {ContentCheck} params
     * @returns Promise
     */
    versionExist(contentId: string, version: string, versionId?: string): Promise<boolean>;
    /**
     * Check the structure of the page:
     * 1, the structure in schemas must has `props` field, if it does not exist, the default is empty object
     * 2, the structure in schemas must has `id`, `name` fields
     * 3, parentId in structure can be removed
     * 4, contentId must be type of content `cont_xxxxx`
     * 5, structure of relation value must be {id: '', type: ''}, default is empty object
     * @param  {VersionCheckResult} versionDSL
     * @returns versionDSL
     */
    structure(versionDSL: DSL): VersionCheckResult;
    /**
     * Check content relation
     * key do not has `.`
     * id is start with `cont_`
     * type must exist
     * @param  {Record<string} relation
     * @param  {} DslRelation>
     * @returns string
     */
    relation(relation: Record<string, DslRelation>): string[];
    /**
     * Check schema structure
     * 1, the structure in schemas must has `props` field, if it does not exist, the default is empty object
     * 2, the structure in schemas must has `id`, `name` fields
     * 3, parentId in structure can be removed
     * @param  {DslSchemas[]} schemas
     * @param  {{invalidNames:string[]}={invalidNames:[]}} options
     * @returns string
     */
    schemaCheckRecursive(schemas: DslSchemas[], options?: {
        invalidNames: string[];
    }): {
        schemas: DslSchemas[];
        options: {
            invalidNames: string[];
        };
    };
}
