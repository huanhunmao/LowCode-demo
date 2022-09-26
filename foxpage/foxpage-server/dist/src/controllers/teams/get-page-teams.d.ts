import 'reflect-metadata';
import { ResData } from '../../types/index-types';
import { TeamInfo } from '../../types/team-types';
import { TeamListReq } from '../../types/validates/team-validate-types';
import { BaseController } from '../base-controller';
export declare class GetTeamList extends BaseController {
    constructor();
    /**
     * Get paging team list (under the organization)
     * @param  {TeamListReq} params
     * @returns {TeamInfo}
     */
    index(params: TeamListReq): Promise<ResData<TeamInfo[]>>;
}
