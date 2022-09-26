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
exports.GetTeamMemberListReq = exports.AddDeleteTeamMembers = exports.TeamMemberDetailReq = exports.TeamListRes = exports.TeamStatusReq = exports.UpdateTeamDetailReq = exports.TeamBaseDetailRes = exports.TeamDetail = exports.TeamBaseDetail = exports.AddTeamDetailReq = exports.TeamListReq = exports.Member = exports.MemberBase = void 0;
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
exports.MemberBase = MemberBase;
class Member extends MemberBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Join time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], Member.prototype, "joinTime", void 0);
exports.Member = Member;
class TeamListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TeamListReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, currently only filtered by team name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TeamListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TeamListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TeamListReq.prototype, "size", void 0);
exports.TeamListReq = TeamListReq;
class AddTeamDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], AddTeamDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'The ID of the organization to which the team belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddTeamDetailReq.prototype, "organizationId", void 0);
exports.AddTeamDetailReq = AddTeamDetailReq;
class TeamBaseDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamBaseDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamBaseDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'team member' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TeamBaseDetail.prototype, "members", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TeamBaseDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team creation time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TeamBaseDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TeamBaseDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team deletion status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], TeamBaseDetail.prototype, "deleted", void 0);
exports.TeamBaseDetail = TeamBaseDetail;
class TeamDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TeamDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Member' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Member)
], TeamDetail.prototype, "members", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Creator' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", index_validate_types_1.CreatorInfo)
], TeamDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team creation time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TeamDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], TeamDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team deletion status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], TeamDetail.prototype, "deleted", void 0);
exports.TeamDetail = TeamDetail;
class TeamBaseDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team details' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", TeamBaseDetail)
], TeamBaseDetailRes.prototype, "data", void 0);
exports.TeamBaseDetailRes = TeamBaseDetailRes;
class UpdateTeamDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateTeamDetailReq.prototype, "teamId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], UpdateTeamDetailReq.prototype, "name", void 0);
exports.UpdateTeamDetailReq = UpdateTeamDetailReq;
class TeamStatusReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], TeamStatusReq.prototype, "teamId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team deletion status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], TeamStatusReq.prototype, "status", void 0);
exports.TeamStatusReq = TeamStatusReq;
class TeamListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", TeamDetail)
], TeamListRes.prototype, "data", void 0);
exports.TeamListRes = TeamListRes;
class TeamMemberDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], TeamMemberDetailReq.prototype, "teamId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'team member' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], TeamMemberDetailReq.prototype, "members", void 0);
exports.TeamMemberDetailReq = TeamMemberDetailReq;
class AddDeleteTeamMembers {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddDeleteTeamMembers.prototype, "teamId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team member ID' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayMaxSize)(50),
    __metadata("design:type", Array)
], AddDeleteTeamMembers.prototype, "userIds", void 0);
exports.AddDeleteTeamMembers = AddDeleteTeamMembers;
class GetTeamMemberListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Team ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], GetTeamMemberListReq.prototype, "teamId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Member account name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetTeamMemberListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetTeamMemberListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Number of data per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetTeamMemberListReq.prototype, "size", void 0);
exports.GetTeamMemberListReq = GetTeamMemberListReq;
