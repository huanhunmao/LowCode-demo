import { User } from '@foxpage/foxpage-server-types';
import { ServiceRes } from './index-types';
export declare type UserBase = Pick<User, 'id' | 'account' | 'nickName' | 'email'>;
export declare type NewUser = User & {
    password: string;
};
export declare type AddUserResData = Pick<User, 'account' | 'email' | 'password'>;
export declare type RegisterParams = LoginParams & {
    email: string;
    registerType: number;
    nickName?: string;
    changePwdStatus?: boolean;
};
export declare type RegisterServiceRes = ServiceRes & {
    data?: Partial<User>;
};
export interface LoginParams {
    account: string;
    password: string;
    type?: string;
}
export interface ThirdLoginParams extends LoginParams {
    options?: any;
}
export interface UserAccountInfo {
    account: string;
    email?: string;
    department?: string;
    nickName?: string;
    organization?: string;
}
