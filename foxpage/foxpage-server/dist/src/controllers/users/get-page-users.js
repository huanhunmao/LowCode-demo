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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPageUserDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const user_validate_types_1 = require("../../types/validates/user-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetPageUserDetail = class GetPageUserDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get page user detail list
     * @param  {UserListRes} params
     * @returns {}
     */
    async index(params) {
        try {
            const pageSize = this.service.user.setPageSize(params);
            const userCountList = await this.service.user.getPageList({
                deleted: false,
                search: params.search,
                page: pageSize.page,
                size: pageSize.size,
            });
            return Response.success({
                pageInfo: { page: params.page, size: params.size, total: userCountList.count },
                data: lodash_1.default.map(userCountList.list, (user) => lodash_1.default.pick(user, ['id', 'account', 'type'])),
            }, 1060701);
        }
        catch (err) {
            return Response.error(err, 'Get page user list failed', 3060701);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'Get page user list',
        description: '',
        tags: ['User'],
        operationId: 'get-page-user-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(user_validate_types_1.UserInfoRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_validate_types_1.GetPageUserListReq]),
    __metadata("design:returntype", Promise)
], GetPageUserDetail.prototype, "index", null);
GetPageUserDetail = __decorate([
    (0, routing_controllers_1.JsonController)('user-searchs'),
    __metadata("design:paramtypes", [])
], GetPageUserDetail);
exports.GetPageUserDetail = GetPageUserDetail;
