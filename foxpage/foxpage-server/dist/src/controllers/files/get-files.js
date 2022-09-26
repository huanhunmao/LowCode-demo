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
exports.GetFileList = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const file_validate_types_1 = require("../../types/validates/file-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetFileList = class GetFileList extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the details of the specified file under the specified application
     * @param  {FileListReq} params
     * @returns {FileUserInfo}
     */
    async index(ctx, params) {
        try {
            ctx.logAttr = Object.assign(ctx.logAttr, { method: constant_1.METHOD.GET });
            // Get file details and status of whether it is on the store
            const [fileList, goodsStatusList] = await Promise.all([
                this.service.file.list.getAppFileList(params),
                this.service.store.goods.getAppFileStatus(params.applicationId, params.ids),
            ]);
            const userIds = lodash_1.default.map(fileList, 'creator');
            const goodsStatusObject = lodash_1.default.keyBy(goodsStatusList, 'id');
            const userBaseObject = await this.service.user.getUserBaseObjectByIds(userIds);
            let fileWithOnlineList = [];
            fileList.forEach((file) => {
                var _a;
                fileWithOnlineList.push(Object.assign({
                    online: ((_a = goodsStatusObject === null || goodsStatusObject === void 0 ? void 0 : goodsStatusObject[file.id]) === null || _a === void 0 ? void 0 : _a.status) ? true : false,
                    creator: userBaseObject[file.creator] || {},
                }, lodash_1.default.omit(file, 'creator')));
            });
            return Response.success(fileWithOnlineList || [], 1170301);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.file.listError, 3170301);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getAppFileList,
        description: '',
        tags: ['File'],
        operationId: 'get-app-file-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(file_validate_types_1.FileDetailRes),
    __param(0, (0, routing_controllers_1.Ctx)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, file_validate_types_1.AppFileListReq]),
    __metadata("design:returntype", Promise)
], GetFileList.prototype, "index", null);
GetFileList = __decorate([
    (0, routing_controllers_1.JsonController)('files'),
    __metadata("design:paramtypes", [])
], GetFileList);
exports.GetFileList = GetFileList;
