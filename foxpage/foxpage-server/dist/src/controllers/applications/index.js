"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDetail = exports.resource = exports.pageList = exports.list = exports.addDetail = void 0;
const add_applications_1 = require("./add-applications");
Object.defineProperty(exports, "addDetail", { enumerable: true, get: function () { return add_applications_1.AddApplicationDetail; } });
const get_application_resources_1 = require("./get-application-resources");
Object.defineProperty(exports, "resource", { enumerable: true, get: function () { return get_application_resources_1.GetApplicationResources; } });
const get_applications_1 = require("./get-applications");
Object.defineProperty(exports, "list", { enumerable: true, get: function () { return get_applications_1.GetApplicationList; } });
const get_page_applications_1 = require("./get-page-applications");
Object.defineProperty(exports, "pageList", { enumerable: true, get: function () { return get_page_applications_1.GetApplicationPageList; } });
const update_applications_1 = require("./update-applications");
Object.defineProperty(exports, "updateDetail", { enumerable: true, get: function () { return update_applications_1.UpdateApplicationDetail; } });
