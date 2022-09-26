import * as Service from '../services';
import { PageInfo, PageSize } from '../types/index-types';
export declare class BaseController {
    protected service: typeof Service;
    constructor();
    /**
     * format paging
     * @param counts
     * @param pageSize
     * @returns
     */
    paging(counts: number, pageSize: PageSize): PageInfo;
    /**
     * Get the route path value
     * @param url
     * @param position
     * @returns
     */
    getRoutePath(url: string, typeMap: Record<string, string>, position: number): string;
}
