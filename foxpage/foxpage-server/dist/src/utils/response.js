"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessDeny = exports.error = exports.warning = exports.download = exports.success = void 0;
const lodash_1 = __importDefault(require("lodash"));
const app_config_1 = require("../../app.config");
const constant_1 = require("../../config/constant");
/**
 * @param  {any} data
 * @returns ResData
 */
function success(data, status) {
    let body = { code: constant_1.RESPONSE_LEVEL.SUCCESS };
    if (lodash_1.default.isString(data)) {
        body.msg = data;
    }
    else if (data.pageInfo) {
        body.data = data.data || {};
        body.pageInfo = data.pageInfo;
    }
    else {
        body.data = data;
    }
    body.status = status || 0;
    return body;
}
exports.success = success;
/** Return to the content of the downloaded file
 * @param  {Buffer} content
 * @returns Buffer
 */
function download(content) {
    return content;
}
exports.download = download;
/**
 * Back to warning prompt
 * @param  {string} msg
 * @returns ResMsg
 */
function warning(msg, status) {
    // ctx.response.status = 400;
    const body = {
        code: constant_1.RESPONSE_LEVEL.WARNING,
        status: status || 1,
        msg: msg,
    };
    return body;
}
exports.warning = warning;
/**
 * Return error message
 * @param  {Error} error
 * @param  {string} msg
 * @returns ResMsg
 */
function error(error, msg, status) {
    const err = error;
    const body = {
        code: constant_1.RESPONSE_LEVEL.ERROR,
        status: status || 1,
        msg: msg || err.message,
        err: [err.message],
    };
    if (app_config_1.config.env !== 'test' && err.message.toLowerCase() !== 'mock error') {
        console.log(err);
    }
    return body;
}
exports.error = error;
/**
 * Return no permission
 * @param  {string} msg?
 * @returns ResMsg
 */
function accessDeny(msg, status) {
    const body = {
        code: constant_1.RESPONSE_LEVEL.ACCESS_DENY,
        status: status || 1,
        msg: msg || 'Access Deny, please contact the App owner to authorization',
    };
    return body;
}
exports.accessDeny = accessDeny;
