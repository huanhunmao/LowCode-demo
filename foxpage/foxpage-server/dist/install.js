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
const constant_1 = require("./config/constant");
const Service = __importStar(require("./src/services"));
const mongoose_1 = __importDefault(require("./src/utils/mongoose"));
const tools_1 = require("./src/utils/tools");
try {
    (0, mongoose_1.default)();
    const install = async () => {
        // check server has init
        const [orgList, userList] = await Promise.all([Service.org.getList({}), Service.user.getList({})]);
        if (orgList.length > 0 || userList.length > 0) {
            console.error('System has installed, please check to empty database and retry');
        }
        else {
            const result = await setupSql();
            console.log(`Init server success, default user account is ${result.accountPwd}, password is ${result.accountPwd}`);
        }
        process.exit(0);
    };
    const setupSql = async () => {
        const ctx = {
            operations: [],
            transactions: [],
        };
        // create user
        const userId = (0, tools_1.generationId)(constant_1.PRE.USER);
        const accountPwd = 'admin';
        Service.user.addNewUser({
            id: userId,
            account: accountPwd,
            email: '',
            nickName: '',
            registerType: 1,
            deleted: false,
            changePwdStatus: true,
            password: accountPwd, // default account password
        }, { ctx });
        // create default organization
        const orgId = (0, tools_1.generationId)(constant_1.PRE.ORGANIZATION);
        const newOrganization = {
            id: orgId,
            name: 'demo organization',
            creator: userId,
        };
        ctx.transactions.push(Service.org.addDetailQuery(newOrganization));
        // add user to organization
        Service.org.addNewMembers(orgId, [userId], { ctx });
        await Service.org.runTransaction(ctx.transactions);
        return { accountPwd };
    };
    install();
}
catch (err) {
    console.log('Install server cause error: ' + err.message);
}
