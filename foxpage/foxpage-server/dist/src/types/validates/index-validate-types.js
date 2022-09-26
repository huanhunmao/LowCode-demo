"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentIdVersion = exports.App = exports.CreatorInfo = exports.ResponsePageBase = exports.ResponseBase = exports.PagingRes = exports.PagingReq = void 0;
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
class PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PagingReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'The maximum amount of data on the current page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PagingReq.prototype, "size", void 0);
exports.PagingReq = PagingReq;
class PagingRes extends PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Total data volume' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], PagingRes.prototype, "total", void 0);
exports.PagingRes = PagingRes;
class ResponseBase {
    constructor() {
        this.code = 200;
        this.msg = '';
        this.err = '';
    }
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: 'Returning result status code: 200-success; 400-warning; 403-no permission; 500-system error',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ResponseBase.prototype, "code", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Return information' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResponseBase.prototype, "msg", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Return error message' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResponseBase.prototype, "err", void 0);
exports.ResponseBase = ResponseBase;
class ResponsePageBase extends ResponseBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Return result paging data' }),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", PagingRes)
], ResponsePageBase.prototype, "pageInfo", void 0);
exports.ResponsePageBase = ResponsePageBase;
class CreatorInfo {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatorInfo.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User Name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatorInfo.prototype, "account", void 0);
exports.CreatorInfo = CreatorInfo;
class App {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], App.prototype, "applicationId", void 0);
exports.App = App;
class ContentIdVersion {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentIdVersion.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content Version' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentIdVersion.prototype, "version", void 0);
exports.ContentIdVersion = ContentIdVersion;
