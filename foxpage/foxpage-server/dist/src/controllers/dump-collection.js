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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAppDetail = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const Response = __importStar(require("../utils/response"));
const base_controller_1 = require("./base-controller");
let GetAppDetail = class GetAppDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get application details, including default folder information under the application
     * @param  {AppDetailReq} params
     * @returns {AppWithFolder} Promise
     */
    async index(params) {
        try {
            let collectionList = [];
            switch (params.col.toLowerCase()) {
                case 'application':
                    collectionList = await this.service.application.find({});
                    break;
                case 'folder':
                    collectionList = await this.service.folder.list.find({});
                    break;
                case 'file':
                    collectionList = await this.service.file.list.find({});
                    break;
                case 'content':
                    collectionList = await this.service.content.list.find({
                        fileId: { $ne: 'file_7vvqMgOWOiJs3GS' },
                    });
                    break;
                case 'version':
                    collectionList = await this.service.version.list.find({});
                    break;
                case 'relation':
                    collectionList = await this.service.relation.find({});
                    break;
                case 'organization':
                    collectionList = await this.service.org.find({});
                    break;
                case 'goods':
                    collectionList = await this.service.store.goods.find({});
                    break;
                case 'order':
                    collectionList = await this.service.store.order.find({});
                    break;
                case 'team':
                    collectionList = await this.service.team.find({});
                    break;
                case 'user':
                    collectionList = await this.service.user.find({});
                    break;
                case 'log':
                    collectionList = await this.service.log.find({});
                    break;
            }
            return Response.success(collectionList);
        }
        catch (err) {
            return Response.error(err, err.message);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)(''),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: 'export collection',
        description: '',
        tags: ['Application'],
        operationId: 'export-collection-list',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(''),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GetAppDetail.prototype, "index", null);
GetAppDetail = __decorate([
    (0, routing_controllers_1.JsonController)('exports'),
    __metadata("design:paramtypes", [])
], GetAppDetail);
exports.GetAppDetail = GetAppDetail;
