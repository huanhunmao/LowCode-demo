import 'reflect-metadata';
import { Team } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { UpdateTeamDetailReq } from '../../types/validates/team-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateTeamDetail extends BaseController {
    constructor();
    /**
     * Update team details, only the team name can be updated temporarily
     * @param  {UpdateTeamDetailReq} params
     * @returns {Team}
     */
    index(ctx: FoxCtx, params: UpdateTeamDetailReq): Promise<ResData<Team>>;
}
