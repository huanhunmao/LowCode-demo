import { Member, Organization } from '@foxpage/foxpage-server-types';
import { IdName, MemberInfo, Search } from './index-types';
import { UserBase } from './user-types';
export declare type MemberBase = Pick<Member, 'userId' | 'status'>;
export declare type NewOrgParams = Pick<Organization, 'id' | 'name' | 'creator'>;
export declare type OrgBaseInfo = Pick<Organization, 'id' | 'name'>;
export declare type OrgInfo = Exclude<Organization, 'creator' | 'members'> & {
    creator: UserBase;
} & {
    members: MemberInfo[];
};
export interface OrgAppFolderSearch extends Search {
    organizationId: string;
    type: string;
    applicationIds?: string[];
}
export interface UserOrg extends IdName {
    default?: boolean;
}
