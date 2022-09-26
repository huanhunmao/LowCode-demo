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
exports.LogService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../config/constant");
const Model = __importStar(require("../models"));
const Service = __importStar(require("../services"));
const tools_1 = require("../utils/tools");
const base_service_1 = require("./base-service");
class LogService extends base_service_1.BaseService {
    constructor() {
        super(Model.log);
        this.transactionId = '';
        this.logData = [];
        this.logActionMethod = ''; // GET|POST|PUT|DELETE
        this.targetDataId = ''; // Current operation data id
        this.dataType = ''; // Current request data type folder|file|component|editor...
    }
    /**
     * Single instance
     * @returns LogService
     */
    static getInstance() {
        this._instance || (this._instance = new LogService());
        return this._instance;
    }
    /**
     * Save the change log of the current request
     * @returns Promise
     */
    async saveChangeLogs(ctx) {
        var _a, _b, _c, _d;
        if (ctx.operations.length > 0) {
            const allLogs = [];
            const operator = ctx.userInfo.id;
            let fileIds = [];
            let logDataIds = [];
            ctx.operations.forEach((log) => {
                log.content.fileId && fileIds.push(log.content.fileId);
                log.content.id && logDataIds.push(log.content.id);
            });
            const [...logDataList] = await Promise.all([...logDataIds.map((id) => this.getDataDetail(id))]);
            const logDataObject = lodash_1.default.keyBy(logDataList, 'id');
            // Get type all level ids
            const itemIdObject = await this.getCategoryIds(ctx.operations);
            for (const log of ctx.operations) {
                if (!log.content.after && logDataObject[log.content.id]) {
                    log.content.after = logDataObject[log.content.id];
                }
                log.category.versionId &&
                    (log.category.contentId = (_a = itemIdObject.version[log.category.versionId]) === null || _a === void 0 ? void 0 : _a.contentId);
                log.category.contentId &&
                    (log.category.fileId = (_b = itemIdObject.content[log.category.contentId]) === null || _b === void 0 ? void 0 : _b.fileId);
                log.category.fileId && (log.category.folderId = (_c = itemIdObject.file[log.category.fileId]) === null || _c === void 0 ? void 0 : _c.folderId);
                log.category.folderId &&
                    (log.category.applicationId = (_d = itemIdObject.folder[log.category.folderId]) === null || _d === void 0 ? void 0 : _d.applicationId);
                allLogs.push(Object.assign({}, log, {
                    transactionId: ctx.logAttr.transactionId,
                    id: (0, tools_1.generationId)(constant_1.PRE.LOG),
                    category: log.category,
                    operator: operator || 'anonymous',
                    deleted: false,
                }));
            }
            await Model.log.addDetail(allLogs);
        }
    }
    /**
     * Save current request log
     * @param  {any} params
     * @returns Promise
     */
    async saveRequest(options) {
        var _a, _b;
        let content = options.ctx.log || {};
        // Set current real request method
        content.realMethod = (options.ctx.logAttr.method || ((_a = content === null || content === void 0 ? void 0 : content.request) === null || _a === void 0 ? void 0 : _a.method) || constant_1.METHOD.GET).toLowerCase();
        // Do not save query request
        if (content.realMethod !== constant_1.METHOD.GET) {
            // Set current operation id
            content.id = options.ctx.logAttr.id || content.request.body.id || content.request.query.id || '';
            content.dataType = options.ctx.logAttr.type || undefined;
            if (!lodash_1.default.isEmpty(content.request.query)) {
                content.request.query = JSON.stringify(content.request.query);
            }
            if (!lodash_1.default.isEmpty(content.request.body)) {
                content.request.body = JSON.stringify(this.filterSensitiveData(content.request.body));
            }
            const logDetail = Object.assign({
                id: (0, tools_1.generationId)(constant_1.PRE.LOG),
                action: 'request',
                transactionId: options.ctx.logAttr.transactionId,
                category: {},
                operator: ((_b = options.ctx.userInfo) === null || _b === void 0 ? void 0 : _b.id) || '',
                deleted: false,
                content,
            });
            await Model.log.addDetail(logDetail);
        }
    }
    /**
     * After obtaining the specified time, the content information list on the right.
     * In the returned content, the content tag data is placed in the tag field,
     * and the file data is placed in the file. Others are placed in the corresponding types, such as
     * {
     *  tag:{updates:{},removes:{}},
     *  file:{updates:{},removes:{}},
     *  page:{updates:{},removes:{}},
     *  template:{updates:{},removes:{}},
     *  variable:{updates:{},removes:{}}
     *  ...
     * }
     * @param  {ContentChange} params
     * @returns Promise
     */
    async getChangesContentList(params) {
        var _a, _b, _c, _d, _e;
        // Get the log data of the specified action
        const changeList = await Model.log.find({
            createTime: { $gte: new Date(new Date(params.timestamp)) },
            action: {
                $in: [
                    constant_1.LOG.LIVE,
                    constant_1.LOG.FILE_REMOVE,
                    constant_1.LOG.FILE_TAG,
                    constant_1.LOG.CONTENT_TAG,
                    constant_1.LOG.CONTENT_REMOVE,
                    constant_1.LOG.META_UPDATE,
                ],
            },
            'category.id': params.applicationId,
            'category.type': constant_1.LOG.CATEGORY_APPLICATION,
            'content.id': { $exists: true },
        });
        // Filter all content information
        let fileIds = [];
        let contentIds = [];
        let contentIdTypes = {};
        let logContentId = '';
        changeList.forEach((log) => {
            logContentId = log.content.id;
            if (this.checkDataIdType(logContentId).type === constant_1.TYPE.VERSION) {
                logContentId = log.content.contentId;
            }
            contentIdTypes[[log.action, log.content.id].join('_')] = { id: logContentId, type: log.action };
            if ([constant_1.LOG.LIVE, constant_1.LOG.CONTENT_TAG, constant_1.LOG.CONTENT_REMOVE, constant_1.LOG.META_UPDATE].indexOf(log.action) !== -1) {
                contentIds.push(logContentId);
            }
            else if ([constant_1.LOG.FILE_TAG, constant_1.LOG.FILE_REMOVE].indexOf(log.action) !== -1) {
                fileIds.push(logContentId);
            }
        });
        // Get content containing fileId
        const contentList = await Service.content.info.getDetailByIds(contentIds);
        const contentObject = lodash_1.default.keyBy(contentList, 'id');
        // Get file information
        fileIds = fileIds.concat(lodash_1.default.map(contentList, 'fileId'));
        const fileTypeInfo = await Service.file.info.getDetailByIds(fileIds);
        const fileTypeObject = lodash_1.default.keyBy(fileTypeInfo, 'id');
        // Set the return structure
        let [logFileId, logItemType, logTypeName] = ['', '', ''];
        let logChangeObject = {};
        for (const logType in contentIdTypes) {
            const logItem = contentIdTypes[logType];
            if ([constant_1.LOG.FILE_TAG, constant_1.LOG.FILE_REMOVE].indexOf(logItem.type) !== -1) {
                logFileId = logItem.id;
            }
            else {
                logFileId = ((_a = contentObject[logItem.id]) === null || _a === void 0 ? void 0 : _a.fileId) || '';
            }
            [constant_1.LOG.FILE_TAG, constant_1.LOG.FILE_REMOVE].indexOf(logItem.type) !== -1 && (logTypeName = 'file');
            logItem.type === constant_1.LOG.CONTENT_TAG && (logTypeName = 'tag');
            logItem.type === constant_1.LOG.CONTENT_REMOVE && (logTypeName = (_b = fileTypeObject[logFileId]) === null || _b === void 0 ? void 0 : _b.type);
            logItem.type === constant_1.LOG.LIVE && (logTypeName = (_c = fileTypeObject[logFileId]) === null || _c === void 0 ? void 0 : _c.type);
            if (logItem.type === constant_1.LOG.FILE_REMOVE && ((_d = fileTypeObject[logFileId]) === null || _d === void 0 ? void 0 : _d.type) === constant_1.TYPE.COMPONENT) {
                logTypeName = (_e = fileTypeObject[logFileId]) === null || _e === void 0 ? void 0 : _e.type;
            }
            // Does not return invalid file types or editor components
            if (!logTypeName || logTypeName === constant_1.TYPE.EDITOR) {
                continue;
            }
            !logChangeObject[logTypeName] && (logChangeObject[logTypeName] = { updates: [], removes: [] });
            logItemType =
                [constant_1.LOG.FILE_REMOVE, constant_1.LOG.CONTENT_REMOVE].indexOf(logItem.type) !== -1 ? 'removes' : 'updates';
            logChangeObject[logTypeName][logItemType].push(logItem.id);
        }
        return logChangeObject;
    }
    /**
     * Get the content of the specified id
     * @param  {string} id
     * @returns Promise
     */
    async getDataDetail(id) {
        const idPre = id.split('_')[0] || '';
        let afterData = {};
        switch (idPre) {
            case constant_1.PRE.APP:
                afterData = await Service.application.getDetailById(id);
                break;
            case constant_1.PRE.FOLDER:
                afterData = await Service.folder.info.getDetailById(id);
                break;
            case constant_1.PRE.FILE:
                afterData = await Service.file.info.getDetailById(id);
                break;
            case constant_1.PRE.CONTENT:
                afterData = await Service.content.info.getDetailById(id);
                break;
            case constant_1.PRE.CONTENT_VERSION:
                afterData = await Service.version.info.getDetailById(id);
                break;
        }
        return afterData;
    }
    /**
     * Special log records, the classification is designated as application level,
     * and the content only contains the field data of id and before
     * @param  {string} action
     * @param  {any} data
     * @returns void
     */
    addLogItem(action, data, options) {
        !lodash_1.default.isArray(data) && (data = [data]);
        let logData = [];
        data.forEach((cell) => {
            logData.push({
                action: action,
                actionType: (options === null || options === void 0 ? void 0 : options.actionType) || '',
                category: (options === null || options === void 0 ? void 0 : options.category) || {},
                content: {
                    id: (cell === null || cell === void 0 ? void 0 : cell.id) || '',
                    before: action.split('_')[0] === constant_1.LOG.CREATE ? {} : cell,
                },
            });
        });
        return logData;
    }
    /**
     * Get the special user, special time, special action and special app's operation list and count
     * @param  {UserOperationParams} params
     * @returns {list:Log[], count:number}
     */
    async getUserOperationList(params) {
        let applicationIds = [];
        if (params.organizationId && !params.applicationId) {
            const appList = await Service.application.find({
                organizationId: params.organizationId,
                deleted: false,
            });
            applicationIds = lodash_1.default.map(appList, 'id');
        }
        const skip = ((params.page || 1) - 1) * (params.size || 10);
        const searchParams = {
            operator: params.operator,
            action: { $ne: 'request' },
            // 'content.response.code': RESPONSE_LEVEL.SUCCESS,
            createTime: {
                $gte: new Date(new Date(params.startTime)),
                $lt: new Date(new Date(params.endTime)),
            },
        };
        if (applicationIds.length > 0) {
            searchParams['category.applicationId'] = { $in: applicationIds };
        }
        if (params.applicationId) {
            searchParams['category.applicationId'] = params.applicationId;
        }
        const [operationList, operationCount] = await Promise.all([
            this.find(searchParams, '-_id -category._id', {
                sort: { createTime: -1 },
                skip,
                limit: params.size || 10,
            }),
            this.getCount(searchParams),
        ]);
        return { list: operationList, count: operationCount };
    }
    /**
     * Get request details by transaction Id
     * @param  {string} transactionId
     * @returns Promise
     */
    async getListByTransactionId(transactionId) {
        return Model.log.find({ transactionId }, '-_id -category._id');
    }
    /**
     * Get the special data history list and counts
     * @param  {DataLogPage} params
     * @returns Promise
     */
    async getDataHistory(params) {
        const [logList, logCount] = await Promise.all([
            Model.log.getDataPageList(params),
            Model.log.getDataPageCount(params),
        ]);
        return { list: logList, count: logCount };
    }
    /**
     * Get the special ids's base info
     * @param  {string[]} ids
     * @returns Promise
     */
    async getLogDataInfo(ids) {
        var _a;
        let typeIds = {};
        lodash_1.default.union(lodash_1.default.pullAll(ids, ['', undefined, null])).forEach((id) => {
            const dataType = this.checkDataIdType(id);
            if (dataType.type) {
                !typeIds[dataType.type] && (typeIds[dataType.type] = []);
                typeIds[dataType.type].push(id);
            }
        });
        const dataInfoList = await Promise.all([
            Service.org.getDetailByIds(typeIds[constant_1.TYPE.ORGANIZATION] || []),
            Service.team.getDetailByIds(typeIds[constant_1.TYPE.TEAM] || []),
            Service.application.getDetailByIds(typeIds[constant_1.TYPE.APPLICATION] || []),
            Service.folder.list.getDetailByIds(typeIds[constant_1.TYPE.FOLDER] || []),
            Service.file.list.getDetailByIds(typeIds[constant_1.TYPE.FILE] || []),
            Service.content.list.getDetailByIds(typeIds[constant_1.TYPE.CONTENT] || []),
            Service.version.list.getDetailByIds(typeIds[constant_1.TYPE.VERSION] || []),
        ]);
        let versionObject = {};
        if ((typeIds[constant_1.TYPE.VERSION] || []).length > 0) {
            const contentIds = lodash_1.default.map(lodash_1.default.last(dataInfoList), 'contentId');
            const contentList = await Service.content.list.getDetailByIds(contentIds);
            const contentObject = lodash_1.default.keyBy(contentList, 'id');
            (_a = lodash_1.default.last(dataInfoList)) === null || _a === void 0 ? void 0 : _a.forEach((version) => {
                versionObject[version.id] = contentObject[version.contentId];
            });
        }
        return lodash_1.default.merge(lodash_1.default.keyBy(lodash_1.default.flatten(dataInfoList), 'id'), versionObject);
    }
    /**
     * Check data id's type
     * @param  {string} id
     * @returns string
     */
    checkDataIdType(id) {
        const typeValue = {
            [constant_1.PRE.ORGANIZATION]: constant_1.TYPE.ORGANIZATION,
            [constant_1.PRE.TEAM]: constant_1.TYPE.TEAM,
            [constant_1.PRE.APP]: constant_1.TYPE.APPLICATION,
            [constant_1.PRE.FOLDER]: constant_1.TYPE.FOLDER,
            [constant_1.PRE.FILE]: constant_1.TYPE.FILE,
            [constant_1.PRE.CONTENT]: constant_1.TYPE.CONTENT,
            [constant_1.PRE.CONTENT_VERSION]: constant_1.TYPE.VERSION,
        };
        return { id, type: typeValue[id.slice(0, 4)] };
    }
    /**
     * filter request sensitive data, pwd...
     * @param data
     */
    filterSensitiveData(data) {
        if (data.password) {
            data.password = '********';
        }
        return data;
    }
    /**
     * Get version, content file and folder parent ids
     * @param categoryList
     * @returns
     */
    async getCategoryIds(operationLogs) {
        let versionIds = [];
        let contentIds = [];
        let fileIds = [];
        let folderIds = [];
        let versionObject = {};
        let contentObject = {};
        let fileObject = {};
        let folderObject = {};
        operationLogs.forEach((log) => {
            log.category.versionId && versionIds.push(log.category.versionId);
            log.category.contentId && contentIds.push(log.category.contentId);
            log.category.fileId && fileIds.push(log.category.fileId);
            log.category.folderId && folderIds.push(log.category.folderId);
        });
        if (versionIds.length > 0) {
            const versionList = await Service.version.list.getDetailObjectByIds(versionIds, 'id contentId');
            contentIds = contentIds.concat(lodash_1.default.map(versionList, 'contentId'));
            versionObject = lodash_1.default.keyBy(versionList, 'id');
        }
        if (contentIds.length > 0) {
            const contentList = await Service.content.list.getDetailObjectByIds(contentIds, 'id fileId');
            fileIds = fileIds.concat(lodash_1.default.map(contentList, 'fileId'));
            contentObject = lodash_1.default.keyBy(contentList, 'id');
        }
        if (fileIds.length > 0) {
            const fileList = await Service.file.list.getDetailObjectByIds(fileIds, 'id folderId');
            folderIds = folderIds.concat(lodash_1.default.map(fileList, 'folderId'));
            fileObject = lodash_1.default.keyBy(fileList, 'id');
        }
        if (folderIds.length > 0) {
            const folderList = await Service.folder.list.getDetailObjectByIds(folderIds, 'id applicationId ');
            folderObject = lodash_1.default.keyBy(folderList, 'id');
        }
        return { version: versionObject, content: contentObject, file: fileObject, folder: folderObject };
    }
}
exports.LogService = LogService;
