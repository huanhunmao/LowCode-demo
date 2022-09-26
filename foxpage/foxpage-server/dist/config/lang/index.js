"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const enJson = fs_1.default.readFileSync('./en.json');
const cnJson = fs_1.default.readFileSync('./cn.json');
const lang = {
    en: JSON.parse(enJson.toString()),
    cn: JSON.parse(cnJson.toString()),
};
exports.default = lang;
