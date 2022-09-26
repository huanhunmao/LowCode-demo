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
exports.VersionCheckService = void 0;
const lodash_1 = __importDefault(require("lodash"));
const constant_1 = require("../../../config/constant");
const Model = __importStar(require("../../models"));
const tools_1 = require("../../utils/tools");
const base_service_1 = require("../base-service");
const Service = __importStar(require("../index"));
class VersionCheckService extends base_service_1.BaseService {
    constructor() {
        super(Model.version);
    }
    /**
     * Single instance
     * @returns VersionCheckService
     */
    static getInstance() {
        this._instance || (this._instance = new VersionCheckService());
        return this._instance;
    }
    /**
     * Check the required fields in version content
     * The required fields for page, template, variable, condition, function are: ['schemas','relation']
     * The required fields for package are ['resource','meta','schema']
     * @param  {string} fileId
     * @param  {any} content
     * @returns {string[]} Promise
     */
    async contentFields(fileId, content) {
        let missingFields = [];
        // Get the type of page
        const fileDetail = await Service.file.info.getDetailById(fileId);
        if ([constant_1.TYPE.PAGE, constant_1.TYPE.TEMPLATE, constant_1.TYPE.VARIABLE, constant_1.TYPE.CONDITION, constant_1.TYPE.FUNCTION].indexOf(fileDetail.type) !== -1) {
            for (const field of ['schemas', 'relation']) {
                !(content === null || content === void 0 ? void 0 : content[field]) && missingFields.push(field);
            }
        }
        else if ([constant_1.TYPE.COMPONENT, constant_1.TYPE.LIBRARY].indexOf(fileDetail.type) !== -1) {
            for (const field of ['resource', 'meta', 'schema']) {
                !(content === null || content === void 0 ? void 0 : content[field]) && missingFields.push(field);
            }
        }
        return missingFields;
    }
    /**
     * Filter out non-existent content version number information
     * @param  {ContentVersionNumber[]} idNumbers
     * @param  {ContentVersion[]} contentVersion
     * @returns ContentVersionNumber
     */
    notExistVersionNumber(idNumbers, contentVersion) {
        let notExistContent = [];
        if (idNumbers.length > 0) {
            const contentObject = lodash_1.default.keyBy(contentVersion, (version) => [version.contentId, version.versionNumber].join('_'));
            notExistContent = idNumbers.filter((item) => !contentObject[[item.contentId, item.versionNumber].join('_')]);
        }
        return notExistContent;
    }
    /**
     * Filter out content version information that does not exist
     * @param  {ContentVersionString[]} idVersions
     * @param  {ContentVersion[]} contentVersion
     * @returns ContentVersionString
     */
    notExistVersion(idVersions, contentVersion) {
        let notExistVersion = [];
        if (idVersions.length > 0) {
            const contentObject = lodash_1.default.keyBy(contentVersion, (version) => [version.contentId, version.version].join('_'));
            notExistVersion = idVersions.filter((item) => !contentObject[[item.contentId, item.version].join('_')]);
        }
        return notExistVersion;
    }
    /**
     * Check whether the specified version number is a new version
     * (that is, the version does not exist in the database)
     * @param  {string} contentId
     * @param  {number} versionNumber
     * @returns {boolean} Promise
     */
    async isNewVersion(contentId, versionNumber) {
        const versionDetail = await Model.version.getDetailByVersionNumber(contentId, versionNumber);
        return !versionDetail;
    }
    /**
     * Verify that the specified version number exists
     * @param  {string} contentId
     * @param  {ContentCheck} params
     * @returns Promise
     */
    async versionExist(contentId, version, versionId = '') {
        return this.checkExist({ contentId, version, deleted: false }, versionId);
    }
    /**
     * Check the structure of the page:
     * 1, the structure in schemas must has `props` field, if it does not exist, the default is empty object
     * 2, the structure in schemas must has `id`, `name` fields
     * 3, parentId in structure can be removed
     * 4, contentId must be type of content `cont_xxxxx`
     * 5, structure of relation value must be {id: '', type: ''}, default is empty object
     * @param  {VersionCheckResult} versionDSL
     * @returns versionDSL
     */
    structure(versionDSL) {
        var _a;
        if (!versionDSL.id || !lodash_1.default.startsWith(versionDSL.id, constant_1.PRE.CONTENT)) {
            return { code: 1, data: versionDSL, msg: versionDSL.id || '' };
        }
        if (!versionDSL.relation) {
            versionDSL.relation = {};
        }
        else if (!lodash_1.default.isEmpty(versionDSL.relation)) {
            const invalidKeys = this.relation(versionDSL.relation);
            if (invalidKeys.length > 0) {
                return { code: 2, data: versionDSL, msg: invalidKeys.join(',') };
            }
        }
        const checkResult = this.schemaCheckRecursive((versionDSL === null || versionDSL === void 0 ? void 0 : versionDSL.schemas) || []);
        if ((((_a = checkResult.options) === null || _a === void 0 ? void 0 : _a.invalidNames) || []).length > 0) {
            return { code: 3, data: versionDSL, msg: checkResult.options.invalidNames.join(',') };
        }
        return { code: 0, data: versionDSL };
    }
    /**
     * Check content relation
     * key do not has `.`
     * id is start with `cont_`
     * type must exist
     * @param  {Record<string} relation
     * @param  {} DslRelation>
     * @returns string
     */
    relation(relation) {
        let invalidKeys = [];
        for (const key in relation) {
            // do not check system variable, conditions ..
            if (relation[key].type && lodash_1.default.startsWith(relation[key].type, 'sys_')) {
                continue;
            }
            if (key.indexOf('.') !== -1 ||
                !relation[key].type ||
                !relation[key].id ||
                !lodash_1.default.startsWith(relation[key].id, constant_1.PRE.CONTENT)) {
                invalidKeys.push(key);
            }
        }
        return invalidKeys;
    }
    /**
     * Check schema structure
     * 1, the structure in schemas must has `props` field, if it does not exist, the default is empty object
     * 2, the structure in schemas must has `id`, `name` fields
     * 3, parentId in structure can be removed
     * @param  {DslSchemas[]} schemas
     * @param  {{invalidNames:string[]}={invalidNames:[]}} options
     * @returns string
     */
    schemaCheckRecursive(schemas, options = { invalidNames: [] }) {
        for (const structure of schemas) {
            // TODO await portal processing
            // delete structure.parentId;
            !structure.id && (structure.id = (0, tools_1.generationId)(constant_1.PRE.STRUCTURE));
            !structure.props && (structure.props = {});
            // TODO schema root node is virtual structure, does not has label and name field
            structure.label && !structure.name && options.invalidNames.push(structure.label);
            if (structure.children && structure.children.length > 0) {
                this.schemaCheckRecursive(structure.children, options);
            }
        }
        return { schemas, options };
    }
}
exports.VersionCheckService = VersionCheckService;
