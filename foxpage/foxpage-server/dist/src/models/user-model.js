"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const user_1 = __importDefault(require("./schema/user"));
const base_model_1 = require("./base-model");
/**
 * User related data model
 *
 * @export
 * @class UserModel
 * @extends {BaseModel<User>}
 */
class UserModel extends base_model_1.BaseModel {
    constructor() {
        super(user_1.default);
        this.userModel = user_1.default;
    }
    /**
     * Single instance
     * @returns UserModel
     */
    static getInstance() {
        this._instance || (this._instance = new UserModel());
        return this._instance;
    }
    /**
     * Get users through account
     * @param  {string} account
     * @returns {User} Promise
     */
    async getUserByAccount(account, registerType = 1) {
        return (await this.userModel.findOne({ account, registerType }));
    }
    /**
     * Return only the password field value
     * @param  {string} account
     * @returns {string} Promise
     */
    async getUserPwdByAccount(account) {
        const userDetail = (await this.userModel.findOne({ account }, 'password'));
        return (userDetail === null || userDetail === void 0 ? void 0 : userDetail.password) || '';
    }
    /**
     * Create User
     * @param  {Partial<NewUser>} params
     * @returns {User} Promise
     */
    async addUser(params) {
        var _a;
        return (_a = (await this.userModel.create(params))) === null || _a === void 0 ? void 0 : _a.toObject();
    }
}
exports.UserModel = UserModel;
