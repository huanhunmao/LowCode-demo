import { FoxCtx } from 'src/types/index-types';
import { Authorize } from '@foxpage/foxpage-server-types';
import { BaseService } from './base-service';
export declare class AuthService extends BaseService<Authorize> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns AuthService
     */
    static getInstance(): AuthService;
    /**
     * Check whether the specified user has system auth
     * @param  {string} user
     * @returns Promise
     */
    system(options: {
        ctx: FoxCtx;
        mask?: number;
    }): Promise<boolean>;
    /**
     * Check whether the specified user is the owner of the app
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    application(applicationId: string, options: {
        ctx: FoxCtx;
        mask?: number;
    }): Promise<boolean>;
    /**
     * Check whether the specified user is the owner of the organization
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    organization(organizationId: string, options: {
        ctx: FoxCtx;
        mask?: number;
    }): Promise<boolean>;
    /**
     * Check if the specified user is the owner of the team
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    team(teamId: string, options: {
        ctx: FoxCtx;
        mask?: number;
    }): Promise<boolean>;
    /**
     * Check whether the specified user has permission to operate the specified folder.
     *
     * current only consider the folder is a project
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    folder(folderId: string, options: {
        ctx: FoxCtx;
        mask?: number;
    }): Promise<boolean>;
    /**
     * Check whether the specified user has permission to operate the specified file.
     * Get the owner of the folder (project or system folder) where the file is located,
     * and compare it with the current user
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    file(fileId: string, options: {
        ctx: FoxCtx;
        mask?: number;
    }): Promise<boolean>;
    /**
     * Check whether the specified user has permission to operate the specified content.
     * Get the owner of the folder (project or system folder) where the content is located,
     * and compare it with the current user
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    content(contentId: string, options: {
        ctx: FoxCtx;
        mask?: number;
    }): Promise<boolean>;
    /**
     * Check whether the specified user has permission to operate the specified content version.
     * Get the owner of the folder (project or system folder) where the version content is located,
     * and compare it with the current user
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    version(versionId: string, options: {
        ctx: FoxCtx;
        mask?: number;
    }): Promise<boolean>;
    /**
     * check the target type id's auth,
     * current only check the allow auth setting
     * @param params
     * @param mask
     * @returns
     */
    getTargetTypeAuth(params: {
        type: string;
        typeId: string;
        targetId: string;
    }, mask?: number): Promise<boolean>;
    /**
     * Check whether the specified user has authorization rights to the specified data
     *
     * @param {{ type: string; typeId: string }} params
     * @param {{ ctx: FoxCtx; mask?: number }} options
     * @returns {Promise<boolean>}
     * @memberof AuthService
     */
    checkTypeIdAuthorize(params: {
        type: string;
        typeId: string;
    }, options: {
        ctx: FoxCtx;
        mask?: number;
    }): Promise<boolean>;
    /**
     * Get auth target relation ids
     * @param type
     * @param targetIds
     * @returns
     */
    getTargetRelation(type: string, targetIds: string[]): Promise<Record<string, any>>;
}
