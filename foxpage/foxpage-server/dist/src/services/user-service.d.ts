import { User } from '@foxpage/foxpage-server-types';
import { Creator, FoxCtx, Search } from '../types/index-types';
import { LoginParams, RegisterParams, UserAccountInfo, UserBase } from '../types/user-types';
import { BaseService } from './base-service';
export declare class UserService extends BaseService<User> {
    private static _instance;
    protected userBase: Creator;
    constructor();
    /**
     * Single instance
     * @returns UserService
     */
    static getInstance(): UserService;
    /**
     * Manually add a user, wait for the transaction to execute, and return the user id
     * @param  {Partial<User>} params
     * @returns string
     */
    addNewUser(params: Partial<User>, options: {
        ctx: FoxCtx;
    }): string;
    /**
     * User registration service
     * @param  {RegisterParams} params
     * @returns {User} Promise
     */
    register(params: RegisterParams, options: {
        ctx: FoxCtx;
    }): Promise<Partial<User>>;
    /**
     * Check user login information
     * @param  {LoginParams} params
     * @returns {Boolean} Promise
     */
    checkLogin(params: LoginParams, options: {
        ctx: FoxCtx;
    }): Promise<Boolean>;
    /**
     * When logging in through a third-party, check whether the specified user exists,
     * does not exist or is disabled, then enable or add
     * @param  {UserAccountInfo} userInfo
     * @returns Promise
     */
    checkAndSaveUserInfo(userInfo: UserAccountInfo, options: {
        ctx: FoxCtx;
    }): Promise<string>;
    /**
     * Get user details through account
     * @param  {string} account
     * @returns Promise
     */
    getUserDetailByAccount(account: string): Promise<Partial<User>>;
    /**
     * Return user data object keyed by user id
     * @param  {string[]} userIds
     * @returns userList
     */
    getUserBaseObjectByIds(userIds: string[]): Promise<Record<string, UserBase>>;
    /**
     * Replace creatorId in the specified data with user basic information {id, account}
     * @param  {T[]} dataList
     * @param  {string} userKey
     * @returns Promise
     */
    replaceDataUserId<T extends {
        creator: string;
    }, K extends Exclude<T, 'creator'> & {
        creator: Creator;
    }>(dataList: T[], userKey?: string): Promise<K[]>;
    /**
     * Get user page list
     * @param params
     * @returns
     */
    getPageList(params: Search): Promise<{
        count: number;
        list: Partial<User>[];
    }>;
}
