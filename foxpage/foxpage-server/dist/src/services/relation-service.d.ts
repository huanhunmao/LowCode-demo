import { FoxCtx } from 'src/types/index-types';
import { ContentRelation, ContentVersion } from '@foxpage/foxpage-server-types';
import { ContentVersionString } from '../types/content-types';
import { BaseService } from './base-service';
export declare class RelationService extends BaseService<ContentRelation> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns OrgService
     */
    static getInstance(): RelationService;
    /**
     * Check the validity of the data in the relation, that is, it does not exist or is deleted
     * @param  {Record<string} relations
     * @param  {string}>} {id
     * @returns Promise
     */
    checkRelationStatus(relations: Record<string, {
        id: string;
    }>): Promise<Record<string, string>>;
    /**
     * Get the associated data through useContentId, and check whether the referenced content is valid
     * If the referenced content is valid, and all the files in the content and the referenced content
     * are not the same file, then return to change the relation content
     * @param  {string[]} contentIds
     * @returns Promise
     */
    getContentRelationalByIds(fileId: string, contentIds: string[]): Promise<ContentRelation[]>;
    /**
     * Save relation information
     * @param  {string} contentId
     * @param  {number} versionNumber
     * @param  {any} relations
     * @returns Promise
     */
    saveRelations(contentId: string, versionNumber: number, relations: any, options: {
        ctx: FoxCtx;
    }): Promise<void>;
    /**
     * Set the structure of the returned relations to
     * the structure of {"templates": [], "variables":[],...}
     * @param  {Record<string} relationObject
     * @param  {} ContentVersion>
     * @returns Promise
     */
    formatRelationResponse(relationObject: Record<string, ContentVersion>): Promise<Record<string, any[]>>;
    /**
     * Set the structure of relations to the structure of {"templates": [], "variables":[],...}
     * @param  {any[]} versionItemRelations
     * @returns Promise
     */
    formatRelationDetailResponse(versionItemRelations: any[]): Promise<Record<string, ContentVersion[]>>;
    /**
     * Recursively get the relation details,
     * and check the validity of the relation information at the same time
     * @param  {string[]} ids
     * @param  {ContentVersionString[]} idVersions
     * @returns Promise
     */
    getAllRelationsByIds(ids: string[], idVersions: ContentVersionString[]): Promise<ContentVersion[]>;
    /**
     * Get the id and version information of the relation from the version details
     * @param  {ContentVersion[]} versionList
     * @param  {string[]=[]} ignoreType
     * @returns ContentVersionString
     */
    getRelationIdsFromVersion(versionList: ContentVersion[], ignoreType?: string[]): {
        ids: string[];
        idVersions: ContentVersionString[];
    };
    /**
     * Check whether the queried relation details exist, and return non-existent relation information
     * @param  {ContentVersionString[]} idVersions
     * @param  {ContentVersion[]} versionList
     * @returns ContentVersionString
     */
    getInvalidRelationIdVersion(idVersions: ContentVersionString[], versionList: ContentVersion[]): ContentVersionString[];
}
