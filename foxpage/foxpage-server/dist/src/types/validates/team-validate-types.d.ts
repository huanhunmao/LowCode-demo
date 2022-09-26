import { CreatorInfo, ResponseBase, ResponsePageBase } from './index-validate-types';
export declare class MemberBase {
    userId: string;
    status: boolean;
}
export declare class Member extends MemberBase {
    joinTime: Date;
}
export declare class TeamListReq {
    organizationId: string;
    search: string;
    page: number;
    size: number;
}
export declare class AddTeamDetailReq {
    name: string;
    organizationId: string;
}
export declare class TeamBaseDetail {
    id: string;
    name: string;
    members: string;
    creator: string;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class TeamDetail {
    id: string;
    name: string;
    members: Member;
    creator: CreatorInfo;
    createTime: Date;
    updateTime: Date;
    deleted: Boolean;
}
export declare class TeamBaseDetailRes extends ResponseBase {
    data: TeamBaseDetail;
}
export declare class UpdateTeamDetailReq {
    teamId: string;
    name: string;
}
export declare class TeamStatusReq {
    teamId: string;
    status: boolean;
}
export declare class TeamListRes extends ResponsePageBase {
    data: TeamDetail;
}
export declare class TeamMemberDetailReq {
    teamId: string;
    members: MemberBase[];
}
export declare class AddDeleteTeamMembers {
    teamId: string;
    userIds: string[];
}
export declare class GetTeamMemberListReq {
    teamId: string;
    search: string;
    page: number;
    size: number;
}
