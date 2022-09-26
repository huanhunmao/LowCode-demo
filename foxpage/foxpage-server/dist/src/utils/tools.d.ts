/// <reference types="node" />
/**
 * Decrypt the password of the buffer into a string
 * @param  {Buffer} password
 * @returns string
 */
export declare function decryptPwd(password: Buffer): string;
/**
 *Generate ID,
 * @param pre ID prefix
 * appl: application
 * fold: folder
 * file: file
 * cont: content
 * cver: content version
 * orga: organization
 * team: team
 * regi: registry
 * temp: template
 * user: user
 * stru: structure
 * stor: store
 * rsos: resource
 * @param  {string} pre
 * @returns string
 */
export declare function generationId(pre: string): string;
/**
 * Generate random string
 * @param  {} number=2
 */
export declare function randStr(number?: number): string;
/**
 * Process _id in the object as id
 * @param  {any[]} sourceData
 * @returns any
 */
export declare function prettifyId(sourceData: any[]): any[];
/**
 * To check the validity of the data name, you can only enter numbers,
 * letters, spaces, underscores, underscores, @, /, valid returns true, invalid returns false
 * @param  {string} name
 * @returns boolean
 */
export declare function checkName(name: string): boolean;
/**
 * Check resource folder name, include '.'
 * @param  {string} name
 * @returns boolean
 */
export declare function checkResourceName(name: string): boolean;
/**
 * Check the validity of the mailbox, return true if it is valid, return false if it is invalid
 * @param  {string} email
 * @returns boolean
 */
export declare function checkEmail(email: string): boolean;
/**
 * Format the name of the file/folder into a path format, such as: Test Name => test-name
 * ignore transform dot '.'
 * @param  {string} name
 * @returns string
 */
export declare function formatToPath(name: string): string;
/**
 * merge page url from host, slug and path
 * @param host
 * @param path
 * @param slug
 * @returns
 */
export declare function mergeUrl(host: string, path: string, slug?: string): string;
