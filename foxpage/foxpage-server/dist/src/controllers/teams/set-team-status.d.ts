import 'reflect-metadata';
import { Team } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { TeamStatusReq } from '../../types/validates/team-validate-types';
import { BaseController } from '../base-controller';
export declare class UpdateTeamDetail extends BaseController {
    constructor();
    /**
     * Set team deletion status
     * @param  {TeamStatusReq} params
     * @returns {Team}
     */
    index(ctx: FoxCtx, params: TeamStatusReq): Promise<ResData<Team>>;
}
