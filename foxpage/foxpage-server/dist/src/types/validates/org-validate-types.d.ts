import { CreatorInfo, ResponseBase, ResponsePageBase } from './index-validate-types';
export declare class MemberBase {
    userId: string;
    status: boolean;
    account: string;
}
export declare class Member extends MemberBase {
    joinTime: Date;
}
export declare class AddOrgDetailReq {
    name: string;
}
export declare class OrgUpdateDetailReq {
    organizationId: string;
    name: string;
}
export declare class OrgDetail {
    id: string;
    name: string;
    members: Member;
    creator: CreatorInfo;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class OrgBaseDetail {
    id: string;
    name: string;
    members: string;
    creator: string;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class OrgDetailRes extends ResponseBase {
    data: OrgDetail;
}
export declare class OrgBaseDetailRes extends ResponseBase {
    data: OrgBaseDetail;
}
export declare class OrgListReq {
    search?: string;
    page?: number;
    size?: number;
}
export declare class OrgListRes extends ResponsePageBase {
    data: OrgDetail;
}
export declare class OrgMemberDetailReq {
    organizationId: string;
    members: MemberBase[];
}
export declare class AddOrgMembersReq {
    organizationId: string;
    account: string;
    userId: string;
}
export declare class DeleteOrgMembersReq {
    organizationId: string;
    userIds: string[];
}
export declare class GetOrgMembersReq {
    organizationId: string;
    page: number;
    size: number;
}
export declare class OrgStatusReq {
    organizationId: string;
    status: boolean;
}
export declare class OrgDetailReq {
    id: string;
}
