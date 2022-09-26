import { CreatorInfo, ResponseBase } from './index-validate-types';
export declare class AuthorizeDetail {
    id?: string;
    type: string;
    typeId: string;
    targetId: string;
    mask: number;
    creator: string;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class AddAuthReq {
    type: string;
    typeId: string;
    targetIds: string[];
    mask: number;
    allow: boolean;
}
export declare class UpdateAuthReq {
    ids: string[];
    mask: number;
    allow: boolean;
}
export declare class SetAuthStatusReq {
    applicationId: string;
    ids: string[];
}
export declare class GetAuthReq {
    applicationId: string;
    type: string;
    typeId: string;
}
export declare class AuthDetailRes extends ResponseBase {
    data: AuthorizeDetail;
}
export declare class AuthorizeBaseInfo {
    id: string;
    type: string;
    typeId: string;
    target: CreatorInfo;
    mask: number;
    creator: string;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class AuthInfoRes extends ResponseBase {
    data: AuthorizeBaseInfo;
}
