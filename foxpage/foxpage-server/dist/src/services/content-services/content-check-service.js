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
exports.ContentCheckService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Model = __importStar(require("../../models"));
const base_service_1 = require("../base-service");
class ContentCheckService extends base_service_1.BaseService {
    constructor() {
        super(Model.content);
    }
    /**
     * Single instance
     * @returns ContentCheckService
     */
    static getInstance() {
        this._instance || (this._instance = new ContentCheckService());
        return this._instance;
    }
    /**
     * Verify whether the content under the specified conditions exists.
     * If the id of the result is consistent with the contentId, it does not exist, otherwise it exists
     * @param  {string} contentId
     * @param  {ContentCheck} params
     * @returns Promise
     */
    async nameExist(contentId, params) {
        const newContentParams = lodash_1.default.pick(params, ['fileId', 'title']);
        return this.checkExist(Object.assign({ deleted: false }, newContentParams), contentId);
    }
    /**
     * Check for circular dependencies
     * @param  {Record<string} sourceObject
     * @param  {} string[]>
     * @param  {Record<string} dependenceObject
     * @param  {} string[]>
     * @returns CircleDepend
     */
    checkCircularDependence(sourceObject, dependenceObject) {
        let recursiveItem = '';
        for (const dependence of Object.keys(dependenceObject)) {
            if (sourceObject[dependence]) {
                sourceObject[dependence].push(...dependenceObject[dependence]);
                for (const dependenceItem of dependenceObject[dependence]) {
                    if (sourceObject[dependenceItem] && sourceObject[dependenceItem].indexOf(dependence) !== -1) {
                        // Cyclic dependency
                        recursiveItem = dependence;
                        sourceObject[dependenceItem].push(dependence);
                        break;
                    }
                }
            }
            else {
                sourceObject[dependence] = dependenceObject[dependence];
            }
            if (recursiveItem) {
                break;
            }
        }
        // Rely on de-duplication
        Object.keys(sourceObject).forEach((sourceKey) => (sourceObject[sourceKey] = lodash_1.default.uniq(sourceObject[sourceKey])));
        return { recursiveItem, dependencies: sourceObject };
    }
}
exports.ContentCheckService = ContentCheckService;
