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
exports.ResourceRemoteURLReq = exports.UpdateResourceConfigReq = exports.SaveResourceListReq = exports.NewResourceDetail = exports.ResourceGroupReq = exports.ResourceInfoReq = exports.ResourceContentListReq = exports.ResourceContentDetailReq = exports.ResourcePathDetailReq = exports.UpdateResourceFolderReq = exports.ResourceDetailReq = exports.UpdateResourceContentReq = exports.AddResourceContentReq = exports.ResourceContent = exports.ResourceListReq = exports.ResourceGroupListReq = exports.ResourceFolderDetailRes = exports.UpdateResourceDetailReq = exports.AddResourceFolderDetailReq = void 0;
const class_transformer_1 = require("class-transformer");
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
class ResourceGroupListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceGroupListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Search character' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceGroupListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ResourceGroupListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'The maximum amount of data on the current page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ResourceGroupListReq.prototype, "size", void 0);
exports.ResourceGroupListReq = ResourceGroupListReq;
class ResourceListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Parent ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceListReq.prototype, "parentFolderId", void 0);
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
class ResourceContent {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource address' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceContent.prototype, "realPath", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource download address' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceContent.prototype, "downloadPath", void 0);
exports.ResourceContent = ResourceContent;
class AddResourceContentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddResourceContentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddResourceContentReq.prototype, "folderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource content' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ResourceContent),
    __metadata("design:type", ResourceContent)
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
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateResourceContentReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File content' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ResourceContent),
    __metadata("design:type", ResourceContent)
], UpdateResourceContentReq.prototype, "content", void 0);
exports.UpdateResourceContentReq = UpdateResourceContentReq;
class ResourceDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceDetailReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceDetailReq.prototype, "name", void 0);
exports.ResourceDetailReq = ResourceDetailReq;
class UpdateResourceFolderReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateResourceFolderReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateResourceFolderReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], UpdateResourceFolderReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Introduction to Folder' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceFolderReq.prototype, "intro", void 0);
exports.UpdateResourceFolderReq = UpdateResourceFolderReq;
class ResourcePathDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourcePathDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource path' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourcePathDetailReq.prototype, "path", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'The number of layers of resource subsets, only return 5 layers at most' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ResourcePathDetailReq.prototype, "depth", void 0);
exports.ResourcePathDetailReq = ResourcePathDetailReq;
class ResourceContentDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceContentDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource file content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceContentDetailReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource file ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceContentDetailReq.prototype, "fileId", void 0);
exports.ResourceContentDetailReq = ResourceContentDetailReq;
class ResourceContentListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceContentListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource file ID', default: 'Resource file ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceContentListReq.prototype, "id", void 0);
exports.ResourceContentListReq = ResourceContentListReq;
class ResourceInfoReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceInfoReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource folder ID', default: 'Resource folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceInfoReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource path' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceInfoReq.prototype, "path", void 0);
exports.ResourceInfoReq = ResourceInfoReq;
class ResourceGroupReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceGroupReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource group ID', default: 'Resource group ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceGroupReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource search test' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceGroupReq.prototype, "name", void 0);
exports.ResourceGroupReq = ResourceGroupReq;
class NewResourceDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewResourceDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource version' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewResourceDetail.prototype, "version", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource folder name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewResourceDetail.prototype, "resourceName", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'current resource version is new or not' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NewResourceDetail.prototype, "isNew", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource files' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], NewResourceDetail.prototype, "files", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource meta' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], NewResourceDetail.prototype, "meta", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource schema' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], NewResourceDetail.prototype, "schema", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewResourceDetail.prototype, "id", void 0);
exports.NewResourceDetail = NewResourceDetail;
class SaveResourceListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], SaveResourceListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource group ID', default: 'Resource group ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SaveResourceListReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource data list' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SaveResourceListReq.prototype, "resources", void 0);
exports.SaveResourceListReq = SaveResourceListReq;
class UpdateResourceConfigReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateResourceConfigReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource group ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateResourceConfigReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource group name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], UpdateResourceConfigReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource group config' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateResourceConfigReq.prototype, "config", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource group introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateResourceConfigReq.prototype, "intro", void 0);
exports.UpdateResourceConfigReq = UpdateResourceConfigReq;
class ResourceRemoteURLReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ResourceRemoteURLReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource type name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceRemoteURLReq.prototype, "resourceType", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource Group scope' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceRemoteURLReq.prototype, "resourceScope", void 0);
exports.ResourceRemoteURLReq = ResourceRemoteURLReq;
