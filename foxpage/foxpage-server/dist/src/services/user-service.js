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
exports.UserService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const lodash_1 = __importDefault(require("lodash"));
const appConfig = __importStar(require("../../app.config"));
const constant_1 = require("../../config/constant");
const Model = __importStar(require("../models"));
const login_1 = __importDefault(require("../third-parties/login"));
const tools_1 = require("../utils/tools");
const base_service_1 = require("./base-service");
class UserService extends base_service_1.BaseService {
    constructor() {
        super(Model.user);
    }
    /**
     * Single instance
     * @returns UserService
     */
    static getInstance() {
        this._instance || (this._instance = new UserService());
        return this._instance;
    }
    /**
     * Manually add a user, wait for the transaction to execute, and return the user id
     * @param  {Partial<User>} params
     * @returns string
     */
    addNewUser(params, options) {
        const newUserParams = {
            id: params.id || (0, tools_1.generationId)(constant_1.PRE.USER),
            account: params.account || '',
            email: params.email || '',
            nickName: params.nickName || '',
            registerType: params.registerType,
            deleted: false,
            password: params.password
                ? crypto_1.default
                    .createHash('md5')
                    .update(params.password)
                    .digest('hex')
                : '',
        };
        options.ctx.transactions.push(Model.user.addDetailQuery(newUserParams));
        return newUserParams.id || '';
    }
    /**
     * User registration service
     * @param  {RegisterParams} params
     * @returns {User} Promise
     */
    async register(params, options) {
        // Check if the user already exists
        const userDetail = await Model.user.getUserByAccount(params.account);
        if (userDetail && userDetail.account) {
            return {};
        }
        // Create User
        const newUserParams = {
            id: (0, tools_1.generationId)(constant_1.PRE.USER),
            account: params.account,
            email: params.email,
            nickName: params.nickName || '',
            registerType: params.registerType,
            password: params.password
                ? crypto_1.default
                    .createHash('md5')
                    .update(params.password)
                    .digest('hex')
                : '',
        };
        const userData = await Model.user.addUser(newUserParams);
        options.ctx.operations.push({
            action: constant_1.LOG.CREATE,
            category: constant_1.LOG.CATEGORY_APPLICATION,
            content: { id: newUserParams.id, after: newUserParams },
        });
        return lodash_1.default.pick(userData, ['id', 'account', 'email']);
    }
    /**
     * Check user login information
     * @param  {LoginParams} params
     * @returns {Boolean} Promise
     */
    async checkLogin(params, options) {
        // 第三方登录
        if (appConfig.config.login) {
            // TODO Need to check whether the current user has organization information
            const userInfo = await login_1.default.signIn(params);
            // Save current user information
            await this.checkAndSaveUserInfo(userInfo, { ctx: options.ctx });
            return userInfo.account !== '';
        }
        else {
            const userPwd = await Model.user.getUserPwdByAccount(params.account);
            const pwdMd5 = crypto_1.default
                .createHash('md5')
                .update(params.password)
                .digest('hex');
            // verify password
            return userPwd === pwdMd5;
        }
    }
    /**
     * When logging in through a third-party, check whether the specified user exists,
     * does not exist or is disabled, then enable or add
     * @param  {UserAccountInfo} userInfo
     * @returns Promise
     */
    async checkAndSaveUserInfo(userInfo, options) {
        let userId = '';
        const userDetail = await this.getUserDetailByAccount(userInfo.account);
        if (!userDetail.account) {
            const userRegister = {
                account: userInfo.account,
                email: userInfo.email || '',
                nickName: userInfo.nickName || '',
                password: '',
                registerType: 2,
            };
            const newUserInfo = await this.register(userRegister, { ctx: options.ctx });
            userId = newUserInfo.id || '';
        }
        else {
            userId = userDetail.id || '';
            if (userDetail.deleted) {
                await this.updateDetail(userId, { deleted: false });
            }
        }
        return userId;
    }
    /**
     * Get user details through account
     * @param  {string} account
     * @returns Promise
     */
    async getUserDetailByAccount(account) {
        const userDetail = await Model.user.getUserByAccount(account);
        return userDetail || {};
    }
    /**
     * Return user data object keyed by user id
     * @param  {string[]} userIds
     * @returns userList
     */
    async getUserBaseObjectByIds(userIds) {
        const userList = await this.getDetailByIds(userIds);
        return lodash_1.default.keyBy(lodash_1.default.map(userList, (user) => lodash_1.default.pick(user, ['id', 'account', 'email', 'nickName'])), 'id');
    }
    /**
     * Replace creatorId in the specified data with user basic information {id, account}
     * @param  {T[]} dataList
     * @param  {string} userKey
     * @returns Promise
     */
    async replaceDataUserId(dataList, userKey = 'creator') {
        const userIds = lodash_1.default.map(dataList, userKey);
        if (userIds.length === 0) {
            return [];
        }
        let newDataList = [];
        const userObject = await this.getUserBaseObjectByIds(userIds);
        dataList.map((item) => {
            const dataItem = Object.assign(lodash_1.default.omit(item, [userKey]), { creator: userObject[item.creator] });
            newDataList.push(dataItem);
        });
        return newDataList;
    }
    /**
     * Get user page list
     * @param params
     * @returns
     */
    async getPageList(params) {
        const filter = { deleted: params.deleted || false };
        if (params.search) {
            filter['account'] = { $regex: new RegExp(params.search, 'i') };
        }
        const [count, list] = await Promise.all([
            Model.user.getCountDocuments(filter),
            Model.user.getList(Object.assign({ page: params.page, size: params.size }, filter)),
        ]);
        const userList = lodash_1.default.map(list, (user) => lodash_1.default.omit(user, 'password'));
        return { count, list: userList };
    }
}
exports.UserService = UserService;
