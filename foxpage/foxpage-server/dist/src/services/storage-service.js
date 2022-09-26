"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const app_config_1 = require("../../app.config");
const plugin_services_1 = require("./plugin-services");
class StorageService {
    constructor() {
        const pluginInstance = plugin_services_1.PluginService.getInstance();
        this.plugins = pluginInstance.plugins;
        if (this.plugins.storageInit) {
            this.plugins.storageInit(app_config_1.config.storageConfig);
        }
    }
    /**
     * Single instance
     * @returns StorageService
     */
    static getInstance() {
        this._instance || (this._instance = new StorageService());
        return this._instance;
    }
    /**
     * Get object list of the special prefix
     * @param  {string} prefix
     * @param  {{maxKeys:number}} options?
     * @returns Promise
     */
    async getList(prefix, options) {
        return this.plugins.storageObjectList(prefix, {
            bucketName: (options === null || options === void 0 ? void 0 : options.bucket) || '',
            maxKeys: (options === null || options === void 0 ? void 0 : options.maxKeys) || 0,
        });
    }
    /**
     * Download object
     * @param  {string} prefix
     * @returns Promise
     */
    async downloads(prefix) {
        var _a;
        const downloadPath = await this.plugins.storageDownloadFolders(prefix);
        if (downloadPath.code === 0) {
            const prefixPath = prefix.replace(/\/|\\/g, '_') + '.zip';
            const zipResult = await this.plugins.storageZipFolders(downloadPath.data, prefixPath);
            if (zipResult.code === 0) {
                const contentBuffer = this.plugins.storageZipFileContent(prefixPath);
                downloadPath.content = contentBuffer;
                downloadPath.fileName = prefixPath;
            }
            else {
                downloadPath.code = 2;
                downloadPath.data = 'zip folder failed:' + ((_a = zipResult === null || zipResult === void 0 ? void 0 : zipResult.data) === null || _a === void 0 ? void 0 : _a.message) || '';
            }
        }
        return downloadPath;
    }
    /**
     * Upload object to another bucket after organize
     * 1, download objects
     * 2, zip objects
     * 3, upload to another bucket
     * @param  {any} params
     * {
     *    bucket: origin object bucket, default is same as origin object bucket
     *    targetBucket: target upload bucket, default is same as origin object bucket
     * }
     * @returns string
     */
    async organizeUpload(params) {
        const { prefix = '' } = params;
        // Get origin object
        const objectList = await this.plugins.storageObjectList(prefix, { bucketName: params.bucket || '' });
        if (objectList.length === 0) {
            // Object not exist or is empty
            return { code: 1, data: '' };
        }
        // TODO Check whether the resource object already exists in the target bucket
        // Download objects to locale
        let folderPrefix = '';
        if (prefix.indexOf('.') !== -1) {
            folderPrefix = lodash_1.default.last(prefix.split('.')[0].split('/')) || '';
        }
        else {
            folderPrefix = lodash_1.default.last(lodash_1.default.pull(prefix.split('/'), '')) || '';
        }
        const downloadResult = await this.plugins.storageDownloadFolders(prefix, folderPrefix, {
            bucketName: (params === null || params === void 0 ? void 0 : params.bucket) || '',
        });
        if (!downloadResult || downloadResult.code !== 0) {
            // Object download fail
            return { code: 2, data: downloadResult.data };
        }
        // Zip locale objects
        const zipResult = await this.plugins.storageZipFolders(downloadResult.data, downloadResult.data + '.zip');
        if (!zipResult || zipResult.code !== 0) {
            // Zip download objects fail
            return { code: 3, data: '' };
        }
        // Upload to target bucket
        const targetPrefix = lodash_1.default.pull(((params === null || params === void 0 ? void 0 : params.targetPrefix) || '').split('/'), '');
        const uploadResult = await this.plugins.storageObjectUploadByPath((targetPrefix.length > 0 ? targetPrefix.join('/') + '/' : '') + zipResult.data, zipResult.data, { bucket: params.targetBucket || '' });
        if (!uploadResult || uploadResult.code !== 0) {
            // Upload object fail
            return { code: 4, data: uploadResult.data };
        }
        return { code: 0, data: 'success' };
    }
}
exports.StorageService = StorageService;
