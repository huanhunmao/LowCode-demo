import { Member, Team } from '@foxpage/foxpage-server-types';
import { FoxCtx, PageData } from '../types/index-types';
import { SearchTeamExist, TeamInfo, TeamSearch } from '../types/team-types';
import { BaseService } from './base-service';
export declare class TeamService extends BaseService<Team> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns TeamService
     */
    static getInstance(): TeamService;
    /**
     * Check if the team already exists
     * @param  {SearchTeamExist} params
     * @returns {boolean} Promise
     */
    checkTeamExist(params: SearchTeamExist): Promise<boolean>;
    /**
     * Get team paging data
     * @param  {TeamSearch} params
     * @returns {PageList<TeamInfo>} Promise
     */
    getPageList(params: TeamSearch): Promise<PageData<TeamInfo>>;
    /**
     * Get a list of members of the specified team
     * @param  {string} id
     * @returns {Member[]} Promise
     */
    getMembersById(id: string): Promise<Member[]>;
    /**
     * Update the status of team members
     * @param  {string} teamId
     * @param  {string[]} userIds
     * @param  {boolean} status
     */
    updateMembersStatus(teamId: string, userIds: string[], options: {
        ctx: FoxCtx;
        status: boolean;
    }): void;
}
