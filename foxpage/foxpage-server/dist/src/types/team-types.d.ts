import { Team } from '@foxpage/foxpage-server-types';
import { Search } from './index-types';
import { UserBase } from './user-types';
export declare type NewTeamParams = Pick<Team, 'id' | 'name' | 'organizationId' | 'creator'>;
export declare type UpdateTeamParams = Pick<Team, 'id' | 'name'>;
export declare type SearchTeamExist = Pick<Team, 'name' | 'organizationId'>;
export declare type TeamInfo = Exclude<Team, 'creator' | 'members'> & {
    creator: UserBase;
} & {
    memberCount: number;
};
export interface TeamSearch extends Search {
    organizationId: string;
}
