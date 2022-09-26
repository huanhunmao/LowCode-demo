"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeUrl = exports.formatToPath = exports.checkEmail = exports.checkResourceName = exports.checkName = exports.prettifyId = exports.randStr = exports.generationId = exports.decryptPwd = void 0;
const crypto_1 = require("crypto");
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const idStrings = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const keyString = fs_1.default.readFileSync('config/crypto-key.json', 'utf8').toString();
const cryptokey = JSON.parse(keyString);
/**
 * Decrypt the password of the buffer into a string
 * @param  {Buffer} password
 * @returns string
 */
function decryptPwd(password) {
    const decryptPwd = (0, crypto_1.privateDecrypt)({ key: cryptokey.privateKey, passphrase: '' }, Buffer.from(password)).toString('base64');
    return decryptPwd;
}
exports.decryptPwd = decryptPwd;
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
function generationId(pre) {
    return [pre, randStr(15)].join('_');
}
exports.generationId = generationId;
/**
 * Generate random string
 * @param  {} number=2
 */
function randStr(number = 2) {
    let str = '';
    for (let i = 0; i < number; i++) {
        const pos = Math.round(Math.random() * (idStrings.length - 1));
        str += idStrings[pos];
    }
    return str;
}
exports.randStr = randStr;
/**
 * Process _id in the object as id
 * @param  {any[]} sourceData
 * @returns any
 */
function prettifyId(sourceData) {
    if (sourceData.length > 0) {
        sourceData.map((cell) => {
            for (const item in cell) {
                if (item === '_id') {
                    cell['id'] = cell['_id'];
                    cell['_id'] = undefined;
                }
                else if (typeof cell[item] === 'object') {
                    cell[item] = prettifyId([cell[item]])[0];
                }
            }
        });
    }
    return sourceData;
}
exports.prettifyId = prettifyId;
/**
 * To check the validity of the data name, you can only enter numbers,
 * letters, spaces, underscores, underscores, @, /, valid returns true, invalid returns false
 * @param  {string} name
 * @returns boolean
 */
function checkName(name) {
    const illegalStr = name.search(/[^0-9a-zA-Z\-\_\/\@ ]/);
    return illegalStr === -1;
}
exports.checkName = checkName;
/**
 * Check resource folder name, include '.'
 * @param  {string} name
 * @returns boolean
 */
function checkResourceName(name) {
    const illegalStr = name.search(/[^0-9a-zA-Z\-\_\/\@\. ]/);
    return illegalStr === -1;
}
exports.checkResourceName = checkResourceName;
/**
 * Check the validity of the mailbox, return true if it is valid, return false if it is invalid
 * @param  {string} email
 * @returns boolean
 */
function checkEmail(email) {
    const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return reg.test(email);
}
exports.checkEmail = checkEmail;
/**
 * Format the name of the file/folder into a path format, such as: Test Name => test-name
 * ignore transform dot '.'
 * @param  {string} name
 * @returns string
 */
function formatToPath(name) {
    return lodash_1.default.trim(lodash_1.default.toLower(name).replace(/[^0-9a-z]/g, ' ')).replace(/\s+/g, '-');
}
exports.formatToPath = formatToPath;
/**
 * merge page url from host, slug and path
 * @param host
 * @param path
 * @param slug
 * @returns
 */
function mergeUrl(host, path, slug) {
    return lodash_1.default.trimEnd(host, '/') + '/' + lodash_1.default.trim(slug, '/') + '/' + lodash_1.default.trimStart(path, '/');
}
exports.mergeUrl = mergeUrl;
