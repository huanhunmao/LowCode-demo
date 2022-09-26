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
exports.FolderListService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class FolderListService extends base_service_1.BaseService {
    constructor() {
        super(Model.folder);
    }
    /**
     * Single instance
     * @returns ContentInfoService
     */
    static getInstance() {
        this._instance || (this._instance = new FolderListService());
        return this._instance;
    }
    /**
     * Get the folder list under the specified folder under the application,
     * and only return the format of Folder
     * @param  {string} applicationId
     * @param  {string} parentFolderId
     * @returns {Folder[]} Promise
     */
    async getAppFolderList(applicationId, parentFolderId) {
        return Model.folder.find({ applicationId: applicationId, parentFolderId, deleted: false });
    }
    /**
     * Get all the parents of the specified folder and return the parents as an array field
     * {folderId: [{folderId1}, {folderId1's children}, ..., {folderId}]}
     * @param  {string[]} folderIds
     * @returns Promise
     */
    async getAllParentsRecursive(folderIds) {
        if (folderIds.length === 0) {
            return {};
        }
        const folderList = await this.model.getDetailByIds(folderIds);
        let parentFolderObject = {};
        if (folderList.length > 0) {
            const parentFolderIds = lodash_1.default.pull(lodash_1.default.map(folderList, 'parentFolderId'), '');
            parentFolderObject = await this.getAllParentsRecursive(parentFolderIds);
        }
        let folderWithParentObject = {};
        folderList.forEach((folder) => {
            let folderWithParent = [];
            if (folder.parentFolderId && parentFolderObject[folder.parentFolderId]) {
                folderWithParent = lodash_1.default.concat(parentFolderObject[folder.parentFolderId], folder);
            }
            else {
                folderWithParent = [folder];
            }
            folderWithParentObject[folder.id] = folderWithParent;
        });
        return folderWithParentObject;
    }
    /**
     * Get a list of sub-files (folders) under the specified folder
     * @param  {string} folderId
     * @returns FileInfo
     */
    async getPageChildrenList(params, fileTypes = []) {
        var _a, _b;
        const folderId = params.id;
        const { page = 1, size = 10 } = params;
        const from = (page - 1) * size;
        const to = from + size;
        // Get application information, get first-level sub-file data
        const [applicationInfo, childFolderFiles] = await Promise.all([
            Service.application.getDetailById(params.applicationId),
            this.getAllChildrenRecursive({ folderIds: [folderId], depth: 1, fileTypes, deleted: params.deleted }),
        ]);
        let folderList = ((_a = childFolderFiles[folderId]) === null || _a === void 0 ? void 0 : _a.folders) || [];
        let fileList = ((_b = childFolderFiles[folderId]) === null || _b === void 0 ? void 0 : _b.files) || [];
        const total = folderList.length + fileList.length;
        // Calculate how many pieces of data are intercepted from fileList
        let fileFrom = 0;
        let fileTo = 0;
        if (folderList.length < to && folderList.length > from) {
            fileTo = to - folderList.length;
        }
        else if (folderList.length < from || folderList.length === 0) {
            fileFrom = from - folderList.length;
            fileTo = to - folderList.length;
        }
        folderList = folderList.slice(from, to);
        fileList = fileList.slice(fileFrom, fileTo);
        // Get user name data
        let userIds = lodash_1.default.map(folderList, 'creator');
        userIds = userIds.concat(lodash_1.default.map(fileList, 'creator'));
        const userObject = await Service.user.getUserBaseObjectByIds(userIds);
        // Combine the returned result containing user information,
        let folderFiles = { folders: [], files: [] };
        folderList.forEach((folder) => {
            folderFiles.folders.push(Object.assign({}, lodash_1.default.omit(folder, ['creator', 'children', 'applicationId']), {
                creator: userObject[folder.creator],
                application: lodash_1.default.pick(applicationInfo, ['id', 'name']),
            }));
        });
        fileList.forEach((file) => {
            folderFiles.files.push(Object.assign({}, lodash_1.default.omit(file, ['creator', 'applicationId']), {
                creator: userObject[file.creator],
                application: lodash_1.default.pick(applicationInfo, ['id', 'name']),
            }));
        });
        return { count: total, data: folderFiles };
    }
    /**
     * Get all the subsets under the specified folder,
     * including sub-folders and sub-files,
     * by default to get 1 level of sub-level data
     * @param  {string[]} folderIds
     * @param  {boolean=false} hasContent Whether to return content information under file
     * @param  {number=10} depth?
     * @param  {string[]} fileTypes? Get files of the specified type
     * @returns Promise
     */
    async getAllChildrenRecursive(params) {
        let { folderIds = [], depth = 1, hasContent = false, fileTypes = [], deleted = false } = params;
        const getFileParams = { folderId: { $in: folderIds }, deleted };
        if (fileTypes.length > 0) {
            getFileParams.type = { $in: fileTypes };
        }
        // Get folder sub-folders, sub-files
        const [childrenFolders, childrenFiles] = await Promise.all([
            this.find({ parentFolderId: { $in: folderIds }, deleted }),
            Service.file.info.find(getFileParams),
        ]);
        // Get folder sub-files/folders
        let childrenFolderFile = {};
        if (--depth && childrenFolders.length > 0) {
            childrenFolderFile = await this.getAllChildrenRecursive({
                folderIds: lodash_1.default.map(childrenFolders, 'id'),
                depth,
                hasContent,
                fileTypes,
                deleted,
            });
        }
        // Get a list of contents under the file
        if (hasContent && childrenFiles.length > 0) {
            const contentList = await Service.content.file.getContentByFileIds(lodash_1.default.map(childrenFiles, 'id'));
            childrenFiles.forEach((file) => {
                file.contents = contentList.filter((content) => content.fileId === file.id);
            });
        }
        let allChildren = {};
        folderIds.forEach((folderId) => {
            allChildren[folderId] = { folders: [], files: [] };
            childrenFolders.forEach((childFolder) => {
                if (childFolder.parentFolderId === folderId) {
                    allChildren[folderId].folders.push(Object.assign({}, childFolder, { children: childrenFolderFile[childFolder.id] || [] }));
                }
            });
            allChildren[folderId].files = childrenFiles.filter((childFile) => childFile.folderId === folderId);
        });
        return allChildren;
    }
    /**
     * Get the folder list under the specified folder, and return the user and application information
     * @param  {FolderChildrenSearch} params
     * @returns {FolderInfo} Promise
     */
    async getFolderChildrenList(params) {
        let folderPageInfo = { list: [], count: 0 };
        if (!params.parentFolderIds || params.parentFolderIds.length === 0) {
            return folderPageInfo;
        }
        const searchParams = {
            parentFolderIds: params.parentFolderIds || [],
            userIds: params.userIds || [],
            page: params.page || 1,
            size: params.size || 10,
            search: params.search || '',
            sort: { createTime: -1 },
        };
        let folderList = [];
        [folderList, folderPageInfo.count] = await Promise.all([
            Model.folder.getFolderListByParentIds(searchParams),
            Model.folder.getFolderCountByParentIds(searchParams),
        ]);
        const [userObject, appList] = await Promise.all([
            Service.user.getUserBaseObjectByIds(lodash_1.default.map(folderList, 'creator')),
            Service.application.getDetailByIds(lodash_1.default.map(folderList, 'applicationId')),
        ]);
        const appObject = lodash_1.default.keyBy(appList, 'id');
        folderList.forEach((folder) => {
            folderPageInfo.list.push(Object.assign(lodash_1.default.omit(folder, ['creator', 'applicationId']), { creator: userObject[folder.creator] }, { application: lodash_1.default.pick(appObject[folder.applicationId], ['id', 'name']) }));
        });
        return folderPageInfo;
    }
    /**
     * Get paged folder data, including folder creator information
     * @param  {FolderPageSearch} params
     * @param  {AppFolderTypes} type
     * @returns Promise
     */
    async getFolderPageList(params, type) {
        if (!params.parentFolderId) {
            const appTypeFolderIds = await Service.folder.info.getAppDefaultFolderIds({
                applicationIds: [params.applicationId],
                type,
            });
            if (appTypeFolderIds.size === 0) {
                return { list: [], count: 0 };
            }
            params.parentFolderId = [...appTypeFolderIds][0] || '';
        }
        const [folderList, folderCount] = await Promise.all([
            Model.folder.getPageList(params),
            Model.folder.getCount(params),
        ]);
        const folderWithUserInfo = await Service.user.replaceDataUserId(folderList);
        return { list: folderWithUserInfo, count: folderCount };
    }
    /**
     * Get the folder id and file id under the specified file,
     * and get all the content id and version id under the file
     * @param  {FileFolderChildren} folderChildren
     * @returns Promise
     */
    async getIdsFromFolderChildren(folderChildren) {
        let contents = [];
        let versions = [];
        const children = this.getIdsFromFolderRecursive(folderChildren);
        // Get all content ids under the file
        if ((children === null || children === void 0 ? void 0 : children.files.length) > 0) {
            contents = await Service.content.file.getContentByFileIds(lodash_1.default.map(children.files, 'id'));
        }
        // Get all version ids under content
        if (contents.length > 0) {
            versions = await Service.version.list.getVersionByContentIds(lodash_1.default.map(contents, 'id'));
        }
        return { folders: children.folders, files: children.files, contents, versions };
    }
    /**
     * Get file and folder information under the folder
     * @param  {FileFolderChildren} folderChildren
     * @returns string
     */
    getIdsFromFolderRecursive(folderChildren) {
        let files = [];
        let folders = [];
        if ((folderChildren === null || folderChildren === void 0 ? void 0 : folderChildren.files.length) > 0) {
            files = files.concat(folderChildren.files);
        }
        if (folderChildren.folders && folderChildren.folders.length > 0) {
            folderChildren.folders.forEach((folderItem) => {
                var _a;
                folders.push(lodash_1.default.omit(folderItem, ['children']));
                if (((_a = folderItem === null || folderItem === void 0 ? void 0 : folderItem.children) === null || _a === void 0 ? void 0 : _a.folders) && folderItem.children.folders.length > 0) {
                    const children = this.getIdsFromFolderRecursive(folderItem.children || []);
                    files = files.concat(children.files);
                    folders = folders.concat(children.folders);
                }
            });
        }
        return { files, folders };
    }
    /**
     * Get the special user and special type folder list
     * response creator name and application name
     * @param  {WorkspaceFolderSearch} params
     * @returns Promise
     */
    async getWorkspaceFolderList(params) {
        const appList = await Service.application.find({
            organizationId: params.organizationId,
            deleted: false
        });
        params.applicationIds = lodash_1.default.map(appList, 'id');
        const [folderList, folderCount] = await Promise.all([
            Model.folder.getWorkspaceFolderList(params),
            Model.folder.getWorkspaceFolderCount(params),
        ]);
        let folderInfoList = [];
        if (folderList.length > 0) {
            const [userObject, appList] = await Promise.all([
                Service.user.getUserBaseObjectByIds(lodash_1.default.map(folderList, 'creator')),
                Service.application.getDetailByIds(lodash_1.default.map(folderList, 'applicationId')),
            ]);
            const appObject = lodash_1.default.keyBy(appList, 'id');
            folderList.forEach((folder) => {
                folderInfoList.push(Object.assign(lodash_1.default.omit(folder, ['creator', 'applicationId']), { creator: userObject[folder.creator] }, { application: lodash_1.default.pick(appObject[folder.applicationId], ['id', 'name']) }));
            });
        }
        return { list: folderInfoList, count: folderCount };
    }
    /**
     * Get aggregate folder data
     * @param  {any[]} aggregate
     * @returns Promise
     */
    async folderAggregate(aggregate) {
        return this.model.aggregate(aggregate);
    }
    /**
     * Get user involve project
     * @param params
     * @returns
     */
    async getInvolveProject(params) {
        const { userId = '', appIds = [] } = params;
        const pageSize = this.setPageSize(params);
        const aggregateObject = [
            {
                $lookup: {
                    from: 'fp_application_folder',
                    localField: 'relation.projectId',
                    foreignField: 'id',
                    as: 'project'
                }
            }, {
                $match: {
                    'targetId': userId,
                    'allow': true,
                    'relation.projectId': { $exists: true },
                    'relation.applicationId': { $in: appIds },
                    'project.deleted': false,
                }
            }, {
                $project: { 'relation.projectId': 1 }
            }
        ];
        if (params.search) {
            aggregateObject[1]['$match']['project.name'] = { $regex: new RegExp(params.search, 'i') };
        }
        const involveProjects = await Model.auth.aggregate(aggregateObject);
        const pageProject = (lodash_1.default.chunk(involveProjects, pageSize.size))[pageSize.page - 1] || [];
        const involveProjectList = [];
        if (pageProject.length > 0) {
            // Get project detail
            const projectList = await Service.folder.list.getDetailByIds(lodash_1.default.map(pageProject, 'relation.projectId'));
            const [userObject, appList] = await Promise.all([
                Service.user.getUserBaseObjectByIds(lodash_1.default.map(projectList, 'creator')),
                Service.application.getDetailByIds(lodash_1.default.map(projectList, 'applicationId')),
            ]);
            const appObject = lodash_1.default.keyBy(appList, 'id');
            projectList.forEach((project) => {
                involveProjectList.push(Object.assign(lodash_1.default.omit(project, ['creator', 'applicationId']), { creator: userObject[project.creator] }, { application: lodash_1.default.pick(appObject[project.applicationId], ['id', 'name']) }));
            });
        }
        return { list: involveProjectList, count: involveProjects.length || 0 };
    }
}
exports.FolderListService = FolderListService;
