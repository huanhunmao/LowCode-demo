"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18n = exports.config = void 0;
const fs_1 = __importDefault(require("fs"));
const environments_1 = __importDefault(require("./config/environments"));
const envList = {
    test: 'test',
    debug: 'debug',
    development: 'development',
    production: 'production',
};
let env = envList.dev;
if (process.env.NODE_ENV) {
    env = process.env.NODE_ENV;
}
const config = environments_1.default[(envList[env] || envList.development)];
exports.config = config;
let port = config.port || 50000;
if (process.env.PORT) {
    port = Number(process.env.PORT);
}
config.env = env;
config.port = port;
// Load multilingual files
const langBuffer = fs_1.default.readFileSync('./config/lang/' + config.locale + '.json');
const lang = JSON.parse(langBuffer.toString());
exports.i18n = lang;
