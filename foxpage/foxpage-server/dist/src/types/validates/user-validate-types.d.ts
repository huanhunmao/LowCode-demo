import { ResponseBase, ResponsePageBase } from './index-validate-types';
export declare class UserBase {
    id: string;
    account: string;
    email: string;
}
export declare class RegisterReq {
    account: string;
    email: string;
    password: string;
}
export declare class RegisterResData {
    account: string;
    email: string;
}
export declare class RegisterRes extends ResponseBase {
    data?: RegisterResData;
}
export declare class LoginReq {
    account: string;
    password: string;
}
export declare class LoginResData {
    userInfo: UserBase;
    token: string;
}
export declare class LoginRes extends ResponseBase {
    data?: LoginResData;
}
export declare class LoginKeyDetail {
    key: string;
}
export declare class LoginKeyRes extends ResponseBase {
    data: LoginKeyDetail;
}
export declare class AddUserReq {
    account: string;
    email: string;
    organizationId: string;
}
export declare class AddUserResponseDetail {
    account: string;
    email: string;
    password: string;
}
export declare class AddUserRes extends ResponseBase {
    data: AddUserResponseDetail;
}
export declare class UpdateUserPassword {
    id: string;
    oldPassword: string;
    newPassword: string;
}
export declare class GetPageUserListReq {
    search: string;
    page: number;
    size: number;
}
export declare class UserInfo {
    id: string;
    account: string;
    type: number;
}
export declare class UserInfoRes extends ResponsePageBase {
    data: Array<UserInfo>;
}
