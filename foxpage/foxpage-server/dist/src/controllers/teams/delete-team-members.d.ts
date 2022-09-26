import 'reflect-metadata';
import { Team } from '@foxpage/foxpage-server-types';
import { FoxCtx, ResData } from '../../types/index-types';
import { AddDeleteTeamMembers } from '../../types/validates/team-validate-types';
import { BaseController } from '../base-controller';
export declare class DeleteTeamMemberList extends BaseController {
    constructor();
    /**
     * Remove team members
     * @param  {AddDeleteTeamMembers} params
     * @returns {Team}
     */
    index(ctx: FoxCtx, params: AddDeleteTeamMembers): Promise<ResData<Team>>;
}
