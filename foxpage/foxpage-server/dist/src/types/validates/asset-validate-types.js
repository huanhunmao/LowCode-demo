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
exports.UpdateResourceContentReq = exports.AddResourceContentReq = exports.ResourceListReq = exports.ResourceFolderDetailRes = exports.UpdateResourceDetailReq = exports.AddResourceFolderDetailReq = void 0;
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const file_validate_types_1 = require("./file-validate-types");
class AddResourceFolderDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddResourceFolderDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddResourceFolderDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource parent folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddResourceFolderDetailReq.prototype, "folderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddResourceFolderDetailReq.prototype, "intro", void 0);
exports.AddResourceFolderDetailReq = AddResourceFolderDetailReq;
class UpdateResourceDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateResourceDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateResourceDetailReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource parent folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceDetailReq.prototype, "folderId", void 0);
exports.UpdateResourceDetailReq = UpdateResourceDetailReq;
class ResourceFolderDetailRes extends file_validate_types_1.FolderDetailRes {
}
exports.ResourceFolderDetailRes = ResourceFolderDetailRes;
class ResourceListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Search character' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ResourceListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'The maximum amount of data on the current page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ResourceListReq.prototype, "size", void 0);
exports.ResourceListReq = ResourceListReq;
class AddResourceContentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddResourceContentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddResourceContentReq.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File content' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], AddResourceContentReq.prototype, "content", void 0);
exports.AddResourceContentReq = AddResourceContentReq;
class UpdateResourceContentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateResourceContentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateResourceContentReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File content' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateResourceContentReq.prototype, "content", void 0);
exports.UpdateResourceContentReq = UpdateResourceContentReq;
