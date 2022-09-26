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
exports.GetComponentVersionDetail = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const app_config_1 = require("../../../app.config");
const constant_1 = require("../../../config/constant");
const component_validate_types_1 = require("../../types/validates/component-validate-types");
const content_validate_types_1 = require("../../types/validates/content-validate-types");
const Response = __importStar(require("../../utils/response"));
const base_controller_1 = require("../base-controller");
let GetComponentVersionDetail = class GetComponentVersionDetail extends base_controller_1.BaseController {
    constructor() {
        super();
    }
    /**
     * Get the content details of the component
     * @param  {ContentVersionDetailReq} params
     * @returns {ContentVersion}
     */
    async index(params) {
        var _a, _b, _c, _d, _e;
        try {
            const fileDetail = await this.service.file.info.getDetailById(params.id);
            let fileId = params.id;
            if (fileDetail.tags && ((_b = (_a = fileDetail.tags) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) === constant_1.TAG.DELIVERY_REFERENCE) {
                fileId = ((_e = (_d = (_c = fileDetail.tags) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.reference) === null || _e === void 0 ? void 0 : _e.id) || '';
            }
            const contentDetail = await this.service.content.info.getDetail({ fileId: fileId, deleted: false });
            if (!contentDetail) {
                return Response.warning(app_config_1.i18n.component.invalidFileId, 2110501);
            }
            // Get user info and component online store info
            const [userObject, onlineInfo] = await Promise.all([
                this.service.user.getUserBaseObjectByIds([contentDetail.creator]),
                this.service.store.goods.getDetailByTypeId(fileId),
            ]);
            const contentUserInfo = Object.assign({}, {
                type: fileDetail.type || '',
                fileId: params.id,
                creator: userObject[contentDetail.creator] || {},
                liveVersion: (this.service.version.number.getVersionFromNumber(contentDetail.liveVersionNumber)),
                online: !!(params.id === fileId &&
                    onlineInfo &&
                    onlineInfo.id &&
                    onlineInfo.status === 1 &&
                    !onlineInfo.deleted),
            }, lodash_1.default.omit(contentDetail, ['creator', 'fileId']));
            return Response.success(contentUserInfo, 1110501);
        }
        catch (err) {
            return Response.error(err, app_config_1.i18n.component.getComponentContentDetailFailed, 3110501);
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)('/contents'),
    (0, routing_controllers_openapi_1.OpenAPI)({
        summary: app_config_1.i18n.sw.getComponentContentDetail,
        description: '',
        tags: ['Component'],
        operationId: 'get-component-content-detail',
    }),
    (0, routing_controllers_openapi_1.ResponseSchema)(content_validate_types_1.ContentVersionDetailRes),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [component_validate_types_1.ComponentFileContentReq]),
    __metadata("design:returntype", Promise)
], GetComponentVersionDetail.prototype, "index", null);
GetComponentVersionDetail = __decorate([
    (0, routing_controllers_1.JsonController)('components'),
    __metadata("design:paramtypes", [])
], GetComponentVersionDetail);
exports.GetComponentVersionDetail = GetComponentVersionDetail;
