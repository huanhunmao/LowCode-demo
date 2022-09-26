import 'reflect-metadata';
import { Team } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddTeamDetailReq } from '../../types/validates/team-validate-types';
import { BaseController } from '../base-controller';
export declare class AddTeamDetail extends BaseController {
    constructor();
    /**
     * Create team details
     * @param  {AddTeamDetailReq} params
     * @param  {Header} headers
     * @returns {Team}
     */
    index(ctx: FoxCtx, params: AddTeamDetailReq): Promise<ResData<Team>>;
}
