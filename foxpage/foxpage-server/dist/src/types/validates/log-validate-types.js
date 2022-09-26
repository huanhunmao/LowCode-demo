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
exports.WorkspaceHistoryReq = exports.RequestDetailsRes = exports.RequestResData = exports.WorkspaceRequestReq = exports.DynamicListRes = exports.WorkspaceDynamicListReq = exports.LogDetail = exports.LogRequestContent = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const index_validate_types_1 = require("./index-validate-types");
class LogRequestContent {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'user name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LogRequestContent.prototype, "user", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Request time' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LogRequestContent.prototype, "requestTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Response time' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LogRequestContent.prototype, "responseTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Request tooks time, millisecond' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], LogRequestContent.prototype, "tooks", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LogRequestContent.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Request parameter' }),
    __metadata("design:type", Object)
], LogRequestContent.prototype, "request", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Response data' }),
    __metadata("design:type", Object)
], LogRequestContent.prototype, "response", void 0);
exports.LogRequestContent = LogRequestContent;
class LogDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Log ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LogDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Log transaction id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LogDetail.prototype, "transactionId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Operator id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LogDetail.prototype, "operator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Operation action, request|update|remove...' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LogDetail.prototype, "action", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Operation action, request|update|remove...' }),
    (0, class_transformer_1.Type)(() => LogRequestContent),
    __metadata("design:type", LogRequestContent)
], LogDetail.prototype, "content", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Created time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], LogDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], LogDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Delete status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], LogDetail.prototype, "deleted", void 0);
exports.LogDetail = LogDetail;
class WorkspaceDynamicListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization Id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], WorkspaceDynamicListReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID to which the project belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WorkspaceDynamicListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, currently only filter by organization name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WorkspaceDynamicListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WorkspaceDynamicListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WorkspaceDynamicListReq.prototype, "size", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, start time, millisecond' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WorkspaceDynamicListReq.prototype, "startTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, end time, millisecond' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WorkspaceDynamicListReq.prototype, "endTime", void 0);
exports.WorkspaceDynamicListReq = WorkspaceDynamicListReq;
class DynamicListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => LogDetail),
    __metadata("design:type", Array)
], DynamicListRes.prototype, "data", void 0);
exports.DynamicListRes = DynamicListRes;
class WorkspaceRequestReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Request transaction id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], WorkspaceRequestReq.prototype, "transactionId", void 0);
exports.WorkspaceRequestReq = WorkspaceRequestReq;
class RequestResData {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => LogDetail),
    __metadata("design:type", LogDetail)
], RequestResData.prototype, "request", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => LogDetail),
    __metadata("design:type", LogDetail)
], RequestResData.prototype, "details", void 0);
exports.RequestResData = RequestResData;
class RequestDetailsRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", RequestResData)
], RequestDetailsRes.prototype, "data", void 0);
exports.RequestDetailsRes = RequestDetailsRes;
class WorkspaceHistoryReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Request data id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], WorkspaceHistoryReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WorkspaceHistoryReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WorkspaceHistoryReq.prototype, "size", void 0);
exports.WorkspaceHistoryReq = WorkspaceHistoryReq;
