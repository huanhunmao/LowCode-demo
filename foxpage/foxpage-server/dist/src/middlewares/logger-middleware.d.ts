import { KoaMiddlewareInterface } from 'routing-controllers';
import { FoxCtx } from '../types/index-types';
export declare class LoggerMiddleware implements KoaMiddlewareInterface {
    use(ctx: FoxCtx, next: (err?: any) => Promise<any>): Promise<any>;
}
