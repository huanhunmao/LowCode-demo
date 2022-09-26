import { Authorize } from '@foxpage/foxpage-server-types';
import { BaseModel } from './base-model';
/**
 * Authorize repository related classes
 */
export declare class AuthorizeModel extends BaseModel<Authorize> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns AuthorizeModel
     */
    static getInstance(): AuthorizeModel;
}
