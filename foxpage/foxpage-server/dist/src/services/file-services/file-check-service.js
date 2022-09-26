"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileCheckService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class FileCheckService extends base_service_1.BaseService {
    constructor() {
        super(Model.file);
    }
    /**
     * Single instance
     * @returns ContentInfoService
     */
    static getInstance() {
        this._instance || (this._instance = new FileCheckService());
        return this._instance;
    }
    /**
     * Verify the existence of the file under the specified conditions.
     * If the id of the result is consistent with the fileId, it does not exist, otherwise it exists
     * @param  {string} fileId
     * @param  {FileCheck} params
     * @returns Promise
     */
    async checkFileNameExist(fileId, params) {
        const newFileParams = lodash_1.default.pick(params, ['applicationId', 'folderId', 'name', 'type', 'suffix']);
        newFileParams.deleted = false;
        return this.checkExist(newFileParams, fileId);
    }
    /**
     * Verify that the specified pathname already exists
     * @param  {AppFileTag} params
     * @returns Promise
     */
    async pathNameExist(params) {
        const pathName = this.getValidPathname(params.tags);
        if (pathName) {
            const fileList = await Service.file.list.find({
                applicationId: params.applicationId,
                tags: { $elemMatch: { pathname: pathName } },
                deleted: false,
            });
            const existFile = fileList.find((file) => {
                return this.getValidPathname((file === null || file === void 0 ? void 0 : file.tags) || []) && file.id !== params.fileId;
            });
            return !!existFile;
        }
        return false;
    }
    /**
     * Get a valid pathname
     * @param  {Tag[]} tags
     * @returns string
     */
    getValidPathname(tags) {
        let pathname = '';
        if (tags && tags.length > 0) {
            tags.forEach((tag) => {
                if (tag.pathname && (lodash_1.default.isNil(tag.status) || tag.status)) {
                    pathname = tag.pathname;
                }
            });
        }
        return pathname;
    }
}
exports.FileCheckService = FileCheckService;
