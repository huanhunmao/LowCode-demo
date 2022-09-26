/// <reference types="node" />
import { ResData, ResMsg } from '../types/index-types';
/**
 * @param  {any} data
 * @returns ResData
 */
export declare function success(data: any, status?: number): ResData<{}> | ResMsg;
/** Return to the content of the downloaded file
 * @param  {Buffer} content
 * @returns Buffer
 */
export declare function download(content: Buffer): Buffer;
/**
 * Back to warning prompt
 * @param  {string} msg
 * @returns ResMsg
 */
export declare function warning(msg: string, status?: number): ResMsg;
/**
 * Return error message
 * @param  {Error} error
 * @param  {string} msg
 * @returns ResMsg
 */
export declare function error(error: Error | unknown, msg: string, status?: number): ResMsg;
/**
 * Return no permission
 * @param  {string} msg?
 * @returns ResMsg
 */
export declare function accessDeny(msg?: string, status?: number): ResMsg;
