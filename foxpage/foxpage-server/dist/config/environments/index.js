"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("./debug"));
const development_1 = __importDefault(require("./development"));
const production_1 = __importDefault(require("./production"));
const test_1 = __importDefault(require("./test"));
const config = {
    test: test_1.default,
    debug: debug_1.default,
    development: development_1.default,
    production: production_1.default,
};
exports.default = config;
