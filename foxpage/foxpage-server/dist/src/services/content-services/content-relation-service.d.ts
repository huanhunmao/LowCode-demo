import { Content, DslRelation } from '@foxpage/foxpage-server-types';
import { RelationsRecursive } from '../../types/content-types';
import { BaseService } from '../base-service';
export declare class ContentRelationService extends BaseService<Content> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns ContentRelationService
     */
    static getInstance(): ContentRelationService;
    /**
     * Recursively get the relations details,
     * Check if the dependency exists,
     * Check if there is a circular dependency
     *
     * The version of the template data in the relation should be the live version,
     * and the other content has a version, which is the specified version,
     * and if not, the latest version is used
     * @param  {DslRelation} relations
     *  @param {isBuild: boolean} = false, return the details of the build, including the relation
     * @returns Promise
     */
    getRelationDetailRecursive(relations: Record<string, DslRelation>, relayChain?: Record<string, string[]>, isBuild?: boolean): Promise<RelationsRecursive>;
    /**
     * Get template content id, other types of content id,
     * and content id containing version from relation
     * @param  {any[]} itemList
     * @param  {string='id'} idKey
     * @returns any
     */
    getTypeContentIdVersionFromRelation(itemList: any[], idKey?: string): any;
}
