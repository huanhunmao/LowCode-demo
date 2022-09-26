import 'reflect-metadata';
import { AuthInfo } from '../../types/authorize-type';
import { ResData } from '../../types/index-types';
import { GetAuthReq } from '../../types/validates/authorize-validate-types';
import { BaseController } from '../base-controller';
export declare class GetAuthorizeDetail extends BaseController {
    constructor();
    /**
     * Get the target id auth list
     * @param  {AuthInfoRes} params
     */
    index(params: GetAuthReq): Promise<ResData<AuthInfo[]>>;
}
