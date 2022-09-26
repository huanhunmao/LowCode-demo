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
exports.AuthInfoRes = exports.AuthorizeBaseInfo = exports.AuthDetailRes = exports.GetAuthReq = exports.SetAuthStatusReq = exports.UpdateAuthReq = exports.AddAuthReq = exports.AuthorizeDetail = void 0;
// import { Type } from 'class-transformer';
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const index_validate_types_1 = require("./index-validate-types");
class AuthorizeDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Authorize ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthorizeDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Type name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], AuthorizeDetail.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Type id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AuthorizeDetail.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Target id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AuthorizeDetail.prototype, "targetId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Authorize mask' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AuthorizeDetail.prototype, "mask", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Authorize creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20),
    __metadata("design:type", String)
], AuthorizeDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Create time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AuthorizeDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AuthorizeDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'deleted status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AuthorizeDetail.prototype, "deleted", void 0);
exports.AuthorizeDetail = AuthorizeDetail;
class AddAuthReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Auth type' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddAuthReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Auth type id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddAuthReq.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Auth target ids' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AddAuthReq.prototype, "targetIds", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Auth mask' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AddAuthReq.prototype, "mask", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Auth allow status, default is true' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AddAuthReq.prototype, "allow", void 0);
exports.AddAuthReq = AddAuthReq;
class UpdateAuthReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Auth ids' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateAuthReq.prototype, "ids", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Auth mask' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAuthReq.prototype, "mask", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Auth allow status, default is true' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateAuthReq.prototype, "allow", void 0);
exports.UpdateAuthReq = UpdateAuthReq;
class SetAuthStatusReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], SetAuthStatusReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Auth ids' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SetAuthStatusReq.prototype, "ids", void 0);
exports.SetAuthStatusReq = SetAuthStatusReq;
class GetAuthReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], GetAuthReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Data type ' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetAuthReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Data type id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], GetAuthReq.prototype, "typeId", void 0);
exports.GetAuthReq = GetAuthReq;
class AuthDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Authorize details' }),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", AuthorizeDetail)
], AuthDetailRes.prototype, "data", void 0);
exports.AuthDetailRes = AuthDetailRes;
class AuthorizeBaseInfo {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Authorize ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AuthorizeBaseInfo.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Type name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], AuthorizeBaseInfo.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Type id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AuthorizeBaseInfo.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Target info' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", index_validate_types_1.CreatorInfo)
], AuthorizeBaseInfo.prototype, "target", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Authorize mask' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AuthorizeBaseInfo.prototype, "mask", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Authorize creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20),
    __metadata("design:type", String)
], AuthorizeBaseInfo.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Create time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AuthorizeBaseInfo.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AuthorizeBaseInfo.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'deleted status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AuthorizeBaseInfo.prototype, "deleted", void 0);
exports.AuthorizeBaseInfo = AuthorizeBaseInfo;
class AuthInfoRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Authorize details' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", AuthorizeBaseInfo)
], AuthInfoRes.prototype, "data", void 0);
exports.AuthInfoRes = AuthInfoRes;
