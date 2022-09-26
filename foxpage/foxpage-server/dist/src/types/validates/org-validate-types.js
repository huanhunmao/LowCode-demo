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
exports.OrgDetailReq = exports.OrgStatusReq = exports.GetOrgMembersReq = exports.DeleteOrgMembersReq = exports.AddOrgMembersReq = exports.OrgMemberDetailReq = exports.OrgListRes = exports.OrgListReq = exports.OrgBaseDetailRes = exports.OrgDetailRes = exports.OrgBaseDetail = exports.OrgDetail = exports.OrgUpdateDetailReq = exports.AddOrgDetailReq = exports.Member = exports.MemberBase = void 0;
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const index_validate_types_1 = require("./index-validate-types");
class MemberBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MemberBase.prototype, "userId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User status: true: normal; false: left' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], MemberBase.prototype, "status", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MemberBase.prototype, "account", void 0);
exports.MemberBase = MemberBase;
class Member extends MemberBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Join time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Member.prototype, "joinTime", void 0);
exports.Member = Member;
class AddOrgDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], AddOrgDetailReq.prototype, "name", void 0);
exports.AddOrgDetailReq = AddOrgDetailReq;
class OrgUpdateDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrgUpdateDetailReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], OrgUpdateDetailReq.prototype, "name", void 0);
exports.OrgUpdateDetailReq = OrgUpdateDetailReq;
class OrgDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrgDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrgDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Member' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Member)
], OrgDetail.prototype, "members", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Creator' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", index_validate_types_1.CreatorInfo)
], OrgDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'organization creation time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrgDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrgDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization deletion status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OrgDetail.prototype, "deleted", void 0);
exports.OrgDetail = OrgDetail;
class OrgBaseDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrgBaseDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OrgBaseDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Member' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrgBaseDetail.prototype, "members", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Creator' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrgBaseDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'organization creation time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrgBaseDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrgBaseDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization deletion status' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OrgBaseDetail.prototype, "deleted", void 0);
exports.OrgBaseDetail = OrgBaseDetail;
class OrgDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Details' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", OrgDetail)
], OrgDetailRes.prototype, "data", void 0);
exports.OrgDetailRes = OrgDetailRes;
class OrgBaseDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Details' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", OrgBaseDetail)
], OrgBaseDetailRes.prototype, "data", void 0);
exports.OrgBaseDetailRes = OrgBaseDetailRes;
class OrgListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, currently only filter by organization name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrgListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrgListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrgListReq.prototype, "size", void 0);
exports.OrgListReq = OrgListReq;
class OrgListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", OrgDetail)
], OrgListRes.prototype, "data", void 0);
exports.OrgListRes = OrgListRes;
class OrgMemberDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], OrgMemberDetailReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Member' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], OrgMemberDetailReq.prototype, "members", void 0);
exports.OrgMemberDetailReq = OrgMemberDetailReq;
class AddOrgMembersReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddOrgMembersReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization member name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddOrgMembersReq.prototype, "account", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization member id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddOrgMembersReq.prototype, "userId", void 0);
exports.AddOrgMembersReq = AddOrgMembersReq;
class DeleteOrgMembersReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], DeleteOrgMembersReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization member ID' }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(50),
    __metadata("design:type", Array)
], DeleteOrgMembersReq.prototype, "userIds", void 0);
exports.DeleteOrgMembersReq = DeleteOrgMembersReq;
class GetOrgMembersReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], GetOrgMembersReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetOrgMembersReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Number of data per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetOrgMembersReq.prototype, "size", void 0);
exports.GetOrgMembersReq = GetOrgMembersReq;
class OrgStatusReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], OrgStatusReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization State' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], OrgStatusReq.prototype, "status", void 0);
exports.OrgStatusReq = OrgStatusReq;
class OrgDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], OrgDetailReq.prototype, "id", void 0);
exports.OrgDetailReq = OrgDetailReq;
