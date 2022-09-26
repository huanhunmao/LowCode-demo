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
exports.AuthService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../config/constant");
const Model = __importStar(require("../models"));
const Service = __importStar(require("../services"));
const base_service_1 = require("./base-service");
class AuthService extends base_service_1.BaseService {
    constructor() {
        super(Model.auth);
    }
    /**
     * Single instance
     * @returns AuthService
     */
    static getInstance() {
        this._instance || (this._instance = new AuthService());
        return this._instance;
    }
    /**
     * Check whether the specified user has system auth
     * @param  {string} user
     * @returns Promise
     */
    async system(options) {
        return this.getTargetTypeAuth({ type: constant_1.TYPE.SYSTEM, typeId: '', targetId: options.ctx.userInfo.id }, options.mask);
    }
    /**
     * Check whether the specified user is the owner of the app
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    async application(applicationId, options) {
        var _a;
        const [appDetail, systemAuth, hasAuth] = await Promise.all([
            Service.application.getDetailById(applicationId),
            this.system(options),
            this.getTargetTypeAuth({ type: constant_1.TYPE.APPLICATION, typeId: applicationId, targetId: options.ctx.userInfo.id }, options.mask),
        ]);
        if ((appDetail === null || appDetail === void 0 ? void 0 : appDetail.creator) === ((_a = options.ctx.userInfo) === null || _a === void 0 ? void 0 : _a.id) || systemAuth || hasAuth) {
            return true;
        }
        return false;
    }
    /**
     * Check whether the specified user is the owner of the organization
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    async organization(organizationId, options) {
        var _a;
        const [orgDetail, systemAuth, hasAuth] = await Promise.all([
            Service.org.getDetailById(organizationId),
            this.system(options),
            this.getTargetTypeAuth({ type: constant_1.TYPE.ORGANIZATION, typeId: organizationId, targetId: options.ctx.userInfo.id }, options.mask),
        ]);
        return (orgDetail === null || orgDetail === void 0 ? void 0 : orgDetail.creator) === ((_a = options.ctx.userInfo) === null || _a === void 0 ? void 0 : _a.id) || systemAuth || hasAuth;
    }
    /**
     * Check if the specified user is the owner of the team
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    async team(teamId, options) {
        var _a;
        const [teamDetail, hasAuth] = await Promise.all([
            Service.team.getDetailById(teamId),
            this.getTargetTypeAuth({ type: constant_1.TYPE.TEAM, typeId: teamId, targetId: options.ctx.userInfo.id }, options.mask),
        ]);
        return (teamDetail === null || teamDetail === void 0 ? void 0 : teamDetail.creator) === ((_a = options.ctx.userInfo) === null || _a === void 0 ? void 0 : _a.id) || hasAuth;
    }
    /**
     * Check whether the specified user has permission to operate the specified folder.
     *
     * current only consider the folder is a project
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    async folder(folderId, options) {
        const user = options.ctx.userInfo.id;
        const [folderDetail, hasAppAuth, hasAuth] = await Promise.all([
            Service.folder.info.getDetailById(folderId),
            this.application(options.ctx.logAttr.applicationId || '', options),
            this.getTargetTypeAuth({ type: constant_1.TYPE.FOLDER, typeId: folderId, targetId: options.ctx.userInfo.id }, options.mask),
        ]);
        return (folderDetail === null || folderDetail === void 0 ? void 0 : folderDetail.creator) === user || hasAppAuth || hasAuth;
    }
    /**
     * Check whether the specified user has permission to operate the specified file.
     * Get the owner of the folder (project or system folder) where the file is located,
     * and compare it with the current user
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    async file(fileId, options) {
        const user = options.ctx.userInfo.id;
        !(options === null || options === void 0 ? void 0 : options.mask) && options.mask === 2;
        const [fileDetail, hasAppAuth, hasAuth] = await Promise.all([
            Service.file.info.getDetailById(fileId),
            this.application(options.ctx.logAttr.applicationId || '', options),
            this.getTargetTypeAuth({ type: constant_1.TYPE.FILE, typeId: fileId, targetId: options.ctx.userInfo.id }, options.mask),
        ]);
        if ((fileDetail === null || fileDetail === void 0 ? void 0 : fileDetail.creator) === user || hasAppAuth || hasAuth) {
            return true;
        }
        return (fileDetail === null || fileDetail === void 0 ? void 0 : fileDetail.folderId) ? this.folder(fileDetail.folderId, options) : false;
    }
    /**
     * Check whether the specified user has permission to operate the specified content.
     * Get the owner of the folder (project or system folder) where the content is located,
     * and compare it with the current user
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    async content(contentId, options) {
        const user = options.ctx.userInfo.id;
        const [contentDetail, hasAppAuth, hasAuth] = await Promise.all([
            Service.content.info.getDetailById(contentId),
            this.application(options.ctx.logAttr.applicationId || '', options),
            this.getTargetTypeAuth({ type: constant_1.TYPE.CONTENT, typeId: contentId, targetId: options.ctx.userInfo.id }, options.mask),
        ]);
        if ((contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.creator) === user || hasAppAuth || hasAuth) {
            return true;
        }
        return (contentDetail === null || contentDetail === void 0 ? void 0 : contentDetail.fileId) ? this.file(contentDetail.fileId, options) : false;
    }
    /**
     * Check whether the specified user has permission to operate the specified content version.
     * Get the owner of the folder (project or system folder) where the version content is located,
     * and compare it with the current user
     * @param  {string} applicationId
     * @param  {string} user
     * @returns Promise
     */
    async version(versionId, options) {
        const user = options.ctx.userInfo.id;
        const [versionDetail, hasAppAuth, hasAuth] = await Promise.all([
            Service.version.info.getDetailById(versionId),
            this.application(options.ctx.logAttr.applicationId || '', options),
            this.getTargetTypeAuth({ type: constant_1.TYPE.VERSION, typeId: versionId, targetId: options.ctx.userInfo.id }, options.mask),
        ]);
        if ((versionDetail === null || versionDetail === void 0 ? void 0 : versionDetail.creator) === user || hasAppAuth || hasAuth) {
            return true;
        }
        return (versionDetail === null || versionDetail === void 0 ? void 0 : versionDetail.contentId) ? this.content(versionDetail.contentId, options) : false;
    }
    /**
     * check the target type id's auth,
     * current only check the allow auth setting
     * @param params
     * @param mask
     * @returns
     */
    async getTargetTypeAuth(params, mask = 2) {
        const authDetail = await this.getDetail(params);
        return ((authDetail === null || authDetail === void 0 ? void 0 : authDetail.deleted) === false && (((authDetail === null || authDetail === void 0 ? void 0 : authDetail.mask) & 1) === 1 || ((authDetail === null || authDetail === void 0 ? void 0 : authDetail.mask) & mask) === mask));
    }
    /**
     * Check whether the specified user has authorization rights to the specified data
     *
     * @param {{ type: string; typeId: string }} params
     * @param {{ ctx: FoxCtx; mask?: number }} options
     * @returns {Promise<boolean>}
     * @memberof AuthService
     */
    async checkTypeIdAuthorize(params, options) {
        if (params.type === constant_1.TYPE.SYSTEM) {
            return this.system(options);
        }
        else if (params.type === constant_1.TYPE.APPLICATION) {
            return this.application(params.typeId, options);
        }
        else if (params.type === constant_1.TYPE.FOLDER) {
            return this.folder(params.typeId, options);
        }
        else if (params.type === constant_1.TYPE.FILE) {
            return this.file(params.typeId, options);
        }
        else if (params.type === constant_1.TYPE.CONTENT) {
            return this.content(params.typeId, options);
        }
        else if (params.type === constant_1.TYPE.VERSION) {
            return this.version(params.typeId, options);
        }
        return false;
    }
    /**
     * Get auth target relation ids
     * @param type
     * @param targetIds
     * @returns
     */
    async getTargetRelation(type, targetIds) {
        let targetRelation = {};
        if (type === constant_1.TYPE.CONTENT) {
            const contentList = await Service.content.list.getDetailByIds(targetIds);
            const fileTargetRelation = await this.getTargetRelation(constant_1.TYPE.FILE, lodash_1.default.map(contentList, 'fileId'));
            contentList.map(content => {
                targetRelation[content.id] = Object.assign({ contentId: content.id }, fileTargetRelation[content.fileId] || {});
            });
        }
        else if (type === constant_1.TYPE.FILE) {
            const fileList = await Service.file.list.getDetailByIds(targetIds);
            const folderTargetRelation = await this.getTargetRelation(constant_1.TYPE.FOLDER, lodash_1.default.map(fileList, 'folderId'));
            fileList.map(file => {
                targetRelation[file.id] = Object.assign({ fileId: file.id }, folderTargetRelation[file.folderId] || {});
            });
        }
        else if (type === constant_1.TYPE.FOLDER) {
            const folderList = await Service.folder.list.getDetailByIds(targetIds);
            folderList.map(folder => {
                targetRelation[folder.id] = {};
                (folder.tags || []).forEach(tag => {
                    if (tag.type === constant_1.TYPE.PROJECT_FOLDER) {
                        targetRelation[folder.id].projectId = folder.id;
                        targetRelation[folder.id].applicationId = folder.applicationId;
                    }
                });
            });
        }
        return targetRelation;
    }
}
exports.AuthService = AuthService;
