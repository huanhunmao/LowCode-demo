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
exports.ApplicationService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const moment_1 = __importDefault(require("moment"));
const constant_1 = require("../../config/constant");
const Model = __importStar(require("../models"));
const tools_1 = require("../utils/tools");
const base_service_1 = require("./base-service");
const Service = __importStar(require("./index"));
class ApplicationService extends base_service_1.BaseService {
    constructor() {
        super(Model.application);
    }
    /**
     * Single instance
     * @returns ApplicationService
     */
    static getInstance() {
        this._instance || (this._instance = new ApplicationService());
        return this._instance;
    }
    /**
     * New content details, only query statements required by the transaction are generated,
     * and details of the created content are returned
     * @param  {Partial<Content>} params
     * @returns Content
     */
    create(params, options) {
        const appDetail = {
            id: params.id || (0, tools_1.generationId)(constant_1.PRE.APP),
            intro: params.intro || '',
            slug: lodash_1.default.trim(params.slug) || '',
            locales: params.locales || [],
            deleted: false,
            organizationId: params.organizationId || '',
            name: lodash_1.default.trim(params.name) || '',
            creator: params.creator || options.ctx.userInfo.id,
            resources: params.resources || [],
            setting: {},
        };
        options.ctx.transactions.push(Model.application.addDetailQuery(appDetail));
        options.ctx.operations.push({
            action: constant_1.LOG.CREATE,
            actionType: [constant_1.LOG.CREATE, constant_1.TYPE.APPLICATION].join('_'),
            category: {
                type: constant_1.LOG.CATEGORY_APPLICATION,
                applicationId: appDetail.id,
                organizationId: params.organizationId,
            },
            content: { after: appDetail },
        });
        return appDetail;
    }
    /**
     * Get application details including default folders
     * @param  {string} applicationId
     * @returns {AppWithFolder}
     */
    async getAppDetailWithFolder(applicationId) {
        // Get application details and folders under the root node
        const [appDetail, folderList] = await Promise.all([
            this.getDetailById(applicationId),
            Service.folder.list.getAppFolderList(applicationId, ''),
        ]);
        return lodash_1.default.merge(appDetail, { folders: folderList || [] });
    }
    /**
     * Get the basic paging list information of the specified application,
     * including the basic organization information corresponding to the application
     * @param  {AppSearch} params
     * @returns Promise
     */
    async getPageListWithOrgInfo(params) {
        let appOrgList = [];
        const [appList, total] = await Promise.all([
            Model.application.getAppList(params),
            Model.application.getTotal(params),
        ]);
        // Get organization Ids
        let orgObject = {};
        const organizationIds = lodash_1.default.uniq(lodash_1.default.map(appList, 'organizationId'));
        if (organizationIds.length > 0) {
            const orgList = await Service.org.find({ id: { $in: organizationIds } }, '-_id id name');
            orgObject = lodash_1.default.keyBy(orgList, 'id');
        }
        appList.forEach((app) => {
            appOrgList.push(Object.assign(lodash_1.default.pick(app, ['id', 'name']), { organization: orgObject[app.organizationId] || {} }));
        });
        return {
            pageInfo: { page: params.page, size: params.size, total: total },
            data: appOrgList,
        };
    }
    /**
     * Get a list of apps containing paging information
     * @param  {AppSearch} params
     * @returns {AppInfo} Promise
     */
    async getPageList(params) {
        const [appList, total] = await Promise.all([
            Model.application.getAppList(params),
            Model.application.getTotal(params),
        ]);
        // Obtain user name data based on app lists data
        let appUserList = [];
        if (appList.length > 0) {
            const userBase = await Service.user.getDetailByIds(lodash_1.default.map(appList, 'creator'));
            const userBaseObject = lodash_1.default.keyBy(lodash_1.default.map(userBase, (user) => lodash_1.default.pick(user, ['id', 'account'])), 'id');
            appList.map((app) => {
                const appBase = Object.assign(lodash_1.default.omit(app, 'creator'), {
                    creator: userBaseObject[app.creator],
                });
                appUserList.push(appBase);
            });
        }
        return {
            pageInfo: { page: params.page, size: params.size, total: total },
            data: appUserList,
        };
    }
    /**
     * Get the details of the resource type specified by the application
     * @param  {any} params: {applicationId, resourceId}
     * @returns Promise
     */
    async getAppResourceDetail(params) {
        var _a;
        const appDetail = await this.getDetailById(params.applicationId);
        return ((_a = appDetail === null || appDetail === void 0 ? void 0 : appDetail.resources) === null || _a === void 0 ? void 0 : _a.find((resource) => resource.id === params.id)) || {};
    }
    /**
     * Check the resource field of the app update
     * 1, resource cannot be deleted
     * 2, the resource name cannot be repeated
     * 3, the type of resource cannot be modified
     * @param  {AppResource[]} appResource
     * @param  {AppResource[]} resources
     * @returns string
     */
    checkAppResourceUpdate(appResource, resources) {
        const resourceIdName = {};
        const appResourceObject = {};
        const appResourceName = {};
        appResource.forEach((resource) => {
            resourceIdName[resource.id] = resource.name;
            appResourceObject[resource.id] = resource;
            appResourceName[resource.name] = resource.id;
        });
        let duplicateName = [];
        let invalidType = [];
        let invalidResource = [];
        resources.forEach((resource) => {
            if (resource.id) {
                lodash_1.default.unset(resourceIdName, resource.id);
                if (!appResourceObject[resource.id]) {
                    invalidResource.push(resource.name);
                }
                else if (resource.type !== appResourceObject[resource.id].type) {
                    // change type is disabled
                    invalidType.push(resource.name);
                }
            }
            else if (appResourceName[resource.name]) {
                duplicateName.push(resource.name);
            }
        });
        if (invalidResource.length > 0) {
            return { code: 4, data: invalidResource };
        }
        if (!lodash_1.default.isEmpty(resourceIdName)) {
            return { code: 1, data: lodash_1.default.toArray(resourceIdName) };
        }
        if (duplicateName.length > 0) {
            return { code: 2, data: duplicateName };
        }
        if (invalidType.length > 0) {
            return { code: 3, data: invalidType };
        }
        return { code: 0, data: [] };
    }
    /**
     * Get application resource list from special content all parent array
     * @param  {Record<string} contentAllParents
     * @param  {} FolderFileContent[]>
     * @returns Promise
     */
    async getAppResourceFromContent(contentAllParents) {
        var _a;
        let contentAppIds = [];
        for (const contentId in contentAllParents) {
            contentAppIds.push(((_a = contentAllParents[contentId][0]) === null || _a === void 0 ? void 0 : _a.applicationId) || '');
        }
        const appList = await this.getDetailByIds(lodash_1.default.uniq(contentAppIds));
        return lodash_1.default.flatten(lodash_1.default.map(appList, 'resources')) || [];
    }
    /**
     * concat app page preview locales url
     * if the host is not {url:'', locales: []} format
     * default to host fields is url
     * @param hostList
     * @param pathname
     * @param slug
     */
    getAppHostLocaleUrl(hostList, pathname, slug) {
        let hostUrls = {};
        hostList.forEach((host) => {
            if (lodash_1.default.isString(host) && !hostUrls['base']) {
                hostUrls['base'] = (0, tools_1.mergeUrl)(host, pathname, slug || '');
            }
            else {
                if (host.locales.length > 0) {
                    host.locales.forEach((locale) => {
                        if (!hostUrls[locale]) {
                            hostUrls[locale] = (0, tools_1.mergeUrl)(host.url, pathname, slug || '');
                        }
                    });
                }
                else if (!hostUrls['base']) {
                    hostUrls['base'] = (0, tools_1.mergeUrl)(host.url, pathname, slug || '');
                }
            }
        });
        return hostUrls;
    }
    /**
     * filter the special item in app settings
     * @param setting
     * @param type
     * @param typeId
     * @returns
     */
    getAppSettingItem(setting, type, typeIds) {
        let typeInfo = {};
        if (setting[type] && setting[type].length > 0) {
            typeInfo = lodash_1.default.keyBy(lodash_1.default.filter(setting[type], (item) => typeIds.indexOf(item.id) !== -1), 'id');
        }
        return typeInfo || {};
    }
    /**
     * Add app setting item values
     * @param params
     * @returns
     */
    addAppSetting(params, options) {
        // Add copy file to app setting
        const currentTime = (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss');
        const pushData = {
            ['setting.' + params.type]: {
                id: params.typeId || '',
                name: params.typeName || '',
                status: params.typeStatus || false,
                category: params.category || {},
                createTime: currentTime,
                updateTime: currentTime,
            },
        };
        options.ctx.transactions.push(Model.application.updateDetailQuery(params.applicationId, { $push: pushData }));
        options.ctx.operations.push({
            action: constant_1.LOG.UPDATE,
            actionType: [constant_1.LOG.SET, params.type].join('_'),
            category: { type: constant_1.TYPE.APPLICATION, applicationId: params.applicationId },
            content: { after: pushData },
        });
    }
    /**
     * Update app setting item values
     * @param params
     * @param options
     */
    updateAppSetting(params, itemDetail, options) {
        options.ctx.transactions.push(Model.application.batchUpdateDetailQuery({
            id: params.applicationId,
            ['setting.' + params.type + '.id']: params.typeId,
        }, {
            $set: {
                ['setting.' + params.type + '.$.name']: params.setting.name,
                ['setting.' + params.type + '.$.status']: params.setting.status || false,
                ['setting.' + params.type + '.$.category']: params.setting.category || {},
                ['setting.' + params.type + '.$.updateTime']: (0, moment_1.default)().format('YYYY-MM-DD HH:mm:ss'),
            },
        }));
        options.ctx.operations.push({
            action: constant_1.LOG.UPDATE,
            actionType: [constant_1.LOG.SET, params.type].join('_'),
            category: { type: constant_1.TYPE.APPLICATION, applicationId: params.applicationId },
            content: { before: itemDetail, after: params.setting },
        });
    }
}
exports.ApplicationService = ApplicationService;
