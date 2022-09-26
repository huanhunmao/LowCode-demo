import { User, UserRegisterType } from '@foxpage/foxpage-server-types';
import { NewUser } from '../types/user-types';
import { BaseModel } from './base-model';
/**
 * User related data model
 *
 * @export
 * @class UserModel
 * @extends {BaseModel<User>}
 */
export declare class UserModel extends BaseModel<User> {
    private static _instance;
    private userModel;
    constructor();
    /**
     * Single instance
     * @returns UserModel
     */
    static getInstance(): UserModel;
    /**
     * Get users through account
     * @param  {string} account
     * @returns {User} Promise
     */
    getUserByAccount(account: string, registerType?: UserRegisterType): Promise<User>;
    /**
     * Return only the password field value
     * @param  {string} account
     * @returns {string} Promise
     */
    getUserPwdByAccount(account: string): Promise<string>;
    /**
     * Create User
     * @param  {Partial<NewUser>} params
     * @returns {User} Promise
     */
    addUser(params: Partial<NewUser>): Promise<User>;
}
