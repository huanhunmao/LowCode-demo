"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.info = exports.check = void 0;
const file_check_service_1 = require("./file-check-service");
const file_info_service_1 = require("./file-info-service");
const file_list_service_1 = require("./file-list-service");
const info = file_info_service_1.FileInfoService.getInstance();
exports.info = info;
const check = file_check_service_1.FileCheckService.getInstance();
exports.check = check;
const list = file_list_service_1.FileListService.getInstance();
exports.list = list;
