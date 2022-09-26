import 'reflect-metadata';
import { Team } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { TeamMemberDetailReq } from '../../types/validates/team-validate-types';
import { BaseController } from '../base-controller';
export declare class SetTeamMemberList extends BaseController {
    constructor();
    /**
     * Team member operations, including joining and exiting
     * @param  {TeamMemberDetailReq} params
     * @returns {Team}
     */
    index(ctx: FoxCtx, params: TeamMemberDetailReq): Promise<ResData<Team>>;
}
