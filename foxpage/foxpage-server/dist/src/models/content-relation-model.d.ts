import { ContentRelation } from '@foxpage/foxpage-server-types';
import { BaseModel } from './base-model';
/**
 *relation repository
 *
 * @export
 * @class FileModel
 * @extends {BaseModel<File>}
 */
export declare class RelationModel extends BaseModel<ContentRelation> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns RelationModel
     */
    static getInstance(): RelationModel;
}
