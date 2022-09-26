import 'reflect-metadata';
import { MemberInfo, ResData } from '../../types/index-types';
import { GetTeamMemberListReq } from '../../types/validates/team-validate-types';
import { BaseController } from '../base-controller';
export declare class GetTeamMemberList extends BaseController {
    constructor();
    /**
     * Get a paginated list of team members
     * @param  {TeamListReq} params
     * @returns {TeamInfo}
     */
    index(params: GetTeamMemberListReq): Promise<ResData<MemberInfo[]>>;
}
