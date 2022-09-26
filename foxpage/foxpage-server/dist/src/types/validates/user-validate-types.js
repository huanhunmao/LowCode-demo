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
exports.UserInfoRes = exports.UserInfo = exports.GetPageUserListReq = exports.UpdateUserPassword = exports.AddUserRes = exports.AddUserResponseDetail = exports.AddUserReq = exports.LoginKeyRes = exports.LoginKeyDetail = exports.LoginRes = exports.LoginResData = exports.LoginReq = exports.RegisterRes = exports.RegisterResData = exports.RegisterReq = exports.UserBase = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const index_validate_types_1 = require("./index-validate-types");
class UserBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserBase.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 30),
    __metadata("design:type", String)
], UserBase.prototype, "account", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'registered email' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserBase.prototype, "email", void 0);
exports.UserBase = UserBase;
class RegisterReq {
    constructor() {
        this.account = '';
        this.email = '';
    }
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 30),
    __metadata("design:type", String)
], RegisterReq.prototype, "account", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'registered email' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterReq.prototype, "email", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Password' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterReq.prototype, "password", void 0);
exports.RegisterReq = RegisterReq;
class RegisterResData {
    constructor() {
        this.account = '';
        this.email = '';
    }
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 30),
    __metadata("design:type", String)
], RegisterResData.prototype, "account", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'registered email' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterResData.prototype, "email", void 0);
exports.RegisterResData = RegisterResData;
class RegisterRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", RegisterResData)
], RegisterRes.prototype, "data", void 0);
exports.RegisterRes = RegisterRes;
class LoginReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User Name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 30),
    __metadata("design:type", String)
], LoginReq.prototype, "account", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Password' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginReq.prototype, "password", void 0);
exports.LoginReq = LoginReq;
class LoginResData {
    constructor() {
        this.token = '';
    }
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User Basic Information' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", UserBase)
], LoginResData.prototype, "userInfo", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Token' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginResData.prototype, "token", void 0);
exports.LoginResData = LoginResData;
class LoginRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", LoginResData)
], LoginRes.prototype, "data", void 0);
exports.LoginRes = LoginRes;
class LoginKeyDetail {
    constructor() {
        this.key = '';
    }
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'public key' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginKeyDetail.prototype, "key", void 0);
exports.LoginKeyDetail = LoginKeyDetail;
class LoginKeyRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", LoginKeyDetail)
], LoginKeyRes.prototype, "data", void 0);
exports.LoginKeyRes = LoginKeyRes;
class AddUserReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User Name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 30),
    __metadata("design:type", String)
], AddUserReq.prototype, "account", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User mailbox' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddUserReq.prototype, "email", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User organization' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddUserReq.prototype, "organizationId", void 0);
exports.AddUserReq = AddUserReq;
class AddUserResponseDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User Name' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 30),
    __metadata("design:type", String)
], AddUserResponseDetail.prototype, "account", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User mailbox' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddUserResponseDetail.prototype, "email", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User password' }),
    __metadata("design:type", String)
], AddUserResponseDetail.prototype, "password", void 0);
exports.AddUserResponseDetail = AddUserResponseDetail;
class AddUserRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", AddUserResponseDetail)
], AddUserRes.prototype, "data", void 0);
exports.AddUserRes = AddUserRes;
class UpdateUserPassword {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User ID' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateUserPassword.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User original password' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserPassword.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User new password' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], UpdateUserPassword.prototype, "newPassword", void 0);
exports.UpdateUserPassword = UpdateUserPassword;
class GetPageUserListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'user name search' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPageUserListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPageUserListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page size' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPageUserListReq.prototype, "size", void 0);
exports.GetPageUserListReq = GetPageUserListReq;
class UserInfo {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User Id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(15),
    __metadata("design:type", String)
], UserInfo.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 45),
    __metadata("design:type", String)
], UserInfo.prototype, "account", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'User type, register/sso' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserInfo.prototype, "type", void 0);
exports.UserInfo = UserInfo;
class UserInfoRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => UserInfo),
    __metadata("design:type", Array)
], UserInfoRes.prototype, "data", void 0);
exports.UserInfoRes = UserInfoRes;
