import { Team } from '@foxpage/foxpage-server-types';
import { TeamSearch } from '../types/team-types';
import { BaseModel } from './base-model';
/**
 * Team related data model
 *
 * @export
 * @class TeamModel
 * @extends {BaseModel<Team>}
 */
export declare class TeamModel extends BaseModel<Team> {
    private static _instance;
    constructor();
    /**
     * Single instance
     * @returns TeamModel
     */
    static getInstance(): TeamModel;
    /**
     * Get team paging data
     * @param  {TeamSearch} params
     * @returns {Team[]} Promise
     */
    getPageList(params: TeamSearch): Promise<Team[]>;
    /**
     * Get the counts of teams
     * @param  {TeamSearch} params
     * @returns {number} Promise
     */
    getCount(params: TeamSearch): Promise<number>;
}
