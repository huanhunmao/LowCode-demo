"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = exports.info = void 0;
const folder_info_service_1 = require("./folder-info-service");
const folder_list_service_1 = require("./folder-list-service");
const info = folder_info_service_1.FolderInfoService.getInstance();
exports.info = info;
const list = folder_list_service_1.FolderListService.getInstance();
exports.list = list;
