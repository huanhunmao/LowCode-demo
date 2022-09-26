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
exports.FileListService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class FileListService extends base_service_1.BaseService {
    constructor() {
        super(Model.file);
    }
    /**
     * Single instance
     * @returns FileListService
     */
    static getInstance() {
        this._instance || (this._instance = new FileListService());
        return this._instance;
    }
    /**
     * Get file list by folder ID
     * @param  {string} folderId
     * @param  {Partial<File>} options
     * @returns Promise
     */
    async getFileListByFolderId(folderId, options) {
        return this.model.find(Object.assign({ folderId, deleted: false }, options));
    }
    /**
     * Get all file detail of the specified type under the specified application
     * @param  {AppTypeContent} params
     * @returns {string[]} Promise
     */
    async getAppTypeFileList(params) {
        return Model.file.getAppFileList(params);
    }
    /**
     * Get the details of the specified file list under the specified application
     * @param  {AppTypeContent} params
     * @returns {string[]} Promise
     */
    async getAppFileList(params) {
        return this.find({ applicationId: params.applicationId, id: { $in: params.ids }, deleted: false });
    }
    /**
     * Get file page data
     * @param  {FilePageSearch} params
     * @returns {FileUserInfo} Promise
     */
    async getPageData(params) {
        const [fileList, fileCount] = await Promise.all([
            Model.file.getPageList(params),
            Model.file.getCount(params),
        ]);
        // Get the user information corresponding to the file
        const fileUserList = await Service.user.replaceDataUserId(fileList);
        return { list: fileUserList, count: fileCount };
    }
    /**
     * Get file details by content id
     * @param  {string[]} contentIds
     * @returns Promise
     */
    async getContentFileByIds(contentIds, applicationId) {
        if (!contentIds || contentIds.length === 0) {
            return {};
        }
        let contentList = await Service.content.list.getDetailByIds(contentIds);
        // get and set content file id to reference id
        if (applicationId) {
            contentList = await Service.content.list.setContentReferenceFileId(applicationId, contentList);
        }
        const fileList = await this.getDetailByIds(lodash_1.default.uniq(lodash_1.default.map(contentList, 'fileId')));
        const fileObject = lodash_1.default.keyBy(fileList, 'id');
        let contentFileObject = {};
        contentList.forEach((content) => {
            contentFileObject[content.id] = fileObject[content.fileId] || {};
        });
        return contentFileObject;
    }
    /**
     * Get the paging list of files of the specified type under the application
     * @param  {AppTypeFileParams} params
     * @param  {Partial<PageSize>={}} page
     * @returns File
     */
    async getAppTypeFilePageList(params, pageInfo) {
        const filter = {
            applicationId: params.applicationId,
            type: params.type,
            deleted: false,
            $and: [{ name: { $regex: '^(?!__).*' } }], // Exclude system files with names beginning with __
        };
        if (params.search) {
            filter['$and'].push({ name: { $regex: new RegExp(params.search, 'i') } });
        }
        // filter application or the special folder items
        if (params.scopeId) {
            filter.folderId =
                !params.scope || params.scope === constant_1.TYPE.APPLICATION ? params.scopeId : { $ne: params.scopeId };
        }
        const [fileCount, fileList] = await Promise.all([
            this.getCount(filter),
            this.find(filter, '', {
                sort: { _id: -1 },
                skip: (pageInfo.page - 1) * pageInfo.size,
                limit: pageInfo.size,
            }),
        ]);
        return { count: fileCount, list: fileList };
    }
    /**
     * Get the file plus name of the specified file, the creator information,
     * and the largest version information under the file
     * @param  {File[]} fileList
     * @param  {{type:string}} options Optional parameters of the file, type: file type
     * @returns Promise
     */
    async getFileAssocInfo(fileList, options) {
        const fileType = (options === null || options === void 0 ? void 0 : options.type) || '';
        if (fileList.length === 0) {
            return [];
        }
        let [fileIds, folderIds, creatorIds] = [[], [], []];
        fileList.forEach((item) => {
            fileIds.push(item.id);
            folderIds.push(item.folderId);
            creatorIds.push(item.creator);
        });
        fileIds = lodash_1.default.uniq(fileIds);
        let promises = [
            Service.folder.list.getDetailByIds(lodash_1.default.uniq(folderIds)),
            Service.user.getUserBaseObjectByIds(lodash_1.default.uniq(creatorIds)),
            Service.store.goods.find({ 'details.id': { $in: fileIds }, status: 1, deleted: false }),
        ];
        // Only variable and condition return content version value
        if ([constant_1.TYPE.VARIABLE, constant_1.TYPE.CONDITION, constant_1.TYPE.FUNCTION].indexOf(fileType) !== -1) {
            promises.push(Service.version.list.getMaxVersionByFileIds(fileIds));
        }
        else {
            promises.push(Service.content.list.getContentObjectByFileIds(fileIds));
        }
        const [folderList, creatorObject, onlineList, contentObject] = await Promise.all(promises);
        let fileAssoc = [];
        const folderObject = lodash_1.default.keyBy(folderList, 'id');
        const fileOnlineObject = lodash_1.default.keyBy(lodash_1.default.map(onlineList, 'details'), 'id');
        fileList.forEach((file) => {
            var _a, _b, _c, _d, _e, _f, _g;
            const folderName = ((_a = folderObject === null || folderObject === void 0 ? void 0 : folderObject[file.folderId]) === null || _a === void 0 ? void 0 : _a.name) || '';
            fileAssoc.push(Object.assign(lodash_1.default.omit(file, ['creator']), {
                contentId: ((_b = contentObject[file.id]) === null || _b === void 0 ? void 0 : _b.contentId) || ((_c = contentObject[file.id]) === null || _c === void 0 ? void 0 : _c.id) || '',
                folderName: lodash_1.default.startsWith(folderName, '__') ? '' : folderName,
                content: ((_d = contentObject[file.id]) === null || _d === void 0 ? void 0 : _d.content) || {},
                creator: creatorObject[file.creator] || {},
                online: !!fileOnlineObject[file.id],
                version: {
                    base: ((_e = contentObject[file.id]) === null || _e === void 0 ? void 0 : _e.contentId) && contentObject[file.id].status === constant_1.VERSION.STATUS_BASE
                        ? contentObject[file.id].version
                        : '',
                    live: ((_f = contentObject[file.id]) === null || _f === void 0 ? void 0 : _f.contentId)
                        ? ''
                        : Service.version.number.getVersionFromNumber(((_g = contentObject[file.id]) === null || _g === void 0 ? void 0 : _g.liveVersionNumber) || 0),
                },
            }));
        });
        return fileAssoc;
    }
    /**
     * Check the special files has been referenced in the application
     * @param  {string} applicationId
     * @param  {string[]} fileIds
     * @returns Promise
     */
    async getReferencedByIds(applicationId, fileIds, type) {
        const fileList = await this.find({
            applicationId,
            deleted: false,
            'tags.type': type || constant_1.TAG.DELIVERY_REFERENCE,
            'tags.reference.id': { $in: fileIds },
        });
        const referenceFileObject = {};
        fileList.forEach((file) => {
            if (file.tags && file.tags[0].reference.id) {
                referenceFileObject[file.tags[0].reference.id] = file;
            }
        });
        return referenceFileObject;
    }
    /**
     * Get app item (variable, condition, function) list or project item list
     * if params.type is 'live' then get has live version's item
     *
     * response file, content and version detail, include relations detail
     * @param params {applicationId, folderId?, search?, type?, page?, size?}
     * @param type
     * @returns
     */
    async getItemFileContentDetail(params, type) {
        var _a, _b, _c, _d;
        let filter = { type };
        if (params.search) {
            filter.name = { $regex: new RegExp(params.search, 'i') };
        }
        let fileList = await this.getFileListByFolderId(params.folderId, filter);
        // get live variable
        let fileIds = lodash_1.default.map(fileList, 'id');
        let fileContentList = [];
        const contentList = await Service.content.file.getContentByFileIds(fileIds);
        if (params.type === 'live') {
            contentList.forEach((content) => {
                if (content.liveVersionNumber === 0) {
                    lodash_1.default.pull(fileIds, content.fileId);
                }
                else {
                    fileContentList.push(content);
                }
            });
        }
        else {
            fileContentList = contentList;
        }
        // filter valid file list
        fileList = lodash_1.default.filter(fileList, (file) => fileIds.indexOf(file.id) !== -1);
        let fileVersion = [];
        const pageFileList = lodash_1.default.chunk(fileList, params.size)[params.page - 1] || [];
        if (fileIds.length > 0) {
            // Get the live details of the content of the file
            let versionObject = await Service.version.list.getContentMaxVersionDetail(lodash_1.default.map(fileContentList, 'id'));
            const [versionItemRelation, contentGoodsList] = await Promise.all([
                Service.version.list.getVersionListRelations(lodash_1.default.toArray(versionObject), params.type === 'live'),
                Service.store.goods.getAppFileStatus(params.applicationId, lodash_1.default.map(pageFileList, 'id')),
            ]);
            const goodsStatusObject = lodash_1.default.keyBy(contentGoodsList, 'id');
            // Splicing combination returns data
            const fileContentObject = lodash_1.default.keyBy(fileContentList, 'fileId');
            for (const file of pageFileList) {
                const content = fileContentObject[file.id] || {};
                const itemRelations = await Service.relation.formatRelationDetailResponse(versionItemRelation[content.id]);
                fileVersion.push({
                    id: file.id,
                    name: file.name,
                    type: file.type,
                    version: ((_a = versionObject === null || versionObject === void 0 ? void 0 : versionObject[content.id]) === null || _a === void 0 ? void 0 : _a.version) || '',
                    versionNumber: content.liveVersionNumber || ((_b = versionObject === null || versionObject === void 0 ? void 0 : versionObject[content.id]) === null || _b === void 0 ? void 0 : _b.versionNumber),
                    contentId: content.id,
                    content: ((_c = versionObject === null || versionObject === void 0 ? void 0 : versionObject[content.id]) === null || _c === void 0 ? void 0 : _c.content) || {},
                    relations: itemRelations,
                    online: ((_d = goodsStatusObject[content.fileId]) === null || _d === void 0 ? void 0 : _d.status) ? true : false,
                });
            }
        }
        return { list: fileVersion, counts: fileList.length };
    }
    /**
     * get user involve file list
     * @param params
     * @returns
     */
    async getUserInvolveFiles(params) {
        const { applicationId = '', userId = '' } = params;
        const userInvoloveItems = await Service.auth.find({
            targetId: userId,
            allow: true,
            'relation.applicationId': applicationId,
            'relation.projectId': { $exists: true },
        }, 'relation');
        let projectIds = [];
        let fileIds = [];
        userInvoloveItems.forEach((item) => {
            var _a, _b;
            if ((_a = item.relation) === null || _a === void 0 ? void 0 : _a.fileId) {
                fileIds.push(item.relation.fileId);
            }
            else if ((_b = item.relation) === null || _b === void 0 ? void 0 : _b.projectId) {
                projectIds.push(item.relation.projectId);
            }
        });
        const fileParams = {
            $or: [],
            creator: { $ne: userId },
            type: params.type,
            deleted: false,
        };
        if (fileIds.length > 0) {
            fileParams['$or'].push({ fileId: { $in: lodash_1.default.uniq(fileIds) } });
        }
        if (projectIds.length > 0) {
            fileParams['$or'].push({ folderId: { $in: lodash_1.default.uniq(projectIds) } });
        }
        let counts = 0;
        let fileList = [];
        if (fileParams['$or'].length > 0) {
            [counts, fileList] = await Promise.all([
                this.getCount(fileParams),
                this.find(fileParams, '', { skip: params.skip || 0, limit: params.limit || 10 }),
            ]);
        }
        return { counts, list: fileList };
    }
}
exports.FileListService = FileListService;
