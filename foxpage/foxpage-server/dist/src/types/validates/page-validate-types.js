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
exports.AppProjectItemContentDetailRes = exports.AppProjectItemContentDetail = exports.AppPageItemListContentReq = exports.PageBuildVersionRes = exports.PageBuildVersion = exports.PageContentDataRes = exports.PageContentData = exports.AppContentListRes = exports.AppContentDetail = exports.PageBuildVersionReq = exports.AppTypeFilesReq = exports.AppContentVersionReq = exports.AppPageBuilderItemReq = exports.AppPageCatalogCommonReq = exports.AppTypePageListCommonReq = exports.AppPageListCommonReq = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const component_validate_types_1 = require("./component-validate-types");
const content_validate_types_1 = require("./content-validate-types");
const file_validate_types_1 = require("./file-validate-types");
const index_validate_types_1 = require("./index-validate-types");
;
class AppPageListCommonReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppPageListCommonReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppPageListCommonReq.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppPageListCommonReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Number of data per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppPageListCommonReq.prototype, "size", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Search characters, content name and ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppPageListCommonReq.prototype, "search", void 0);
exports.AppPageListCommonReq = AppPageListCommonReq;
class AppTypePageListCommonReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppTypePageListCommonReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppTypePageListCommonReq.prototype, "folderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Response data type: live|"", default is empty to get all status data' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppTypePageListCommonReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppTypePageListCommonReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Number of data per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppTypePageListCommonReq.prototype, "size", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Search characters, content name and ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppTypePageListCommonReq.prototype, "search", void 0);
exports.AppTypePageListCommonReq = AppTypePageListCommonReq;
class AppPageCatalogCommonReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppPageCatalogCommonReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppPageCatalogCommonReq.prototype, "id", void 0);
exports.AppPageCatalogCommonReq = AppPageCatalogCommonReq;
class AppPageBuilderItemReq extends index_validate_types_1.PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppPageBuilderItemReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page build scope, application|user|involve' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppPageBuilderItemReq.prototype, "scope", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Builder type, page|template' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppPageBuilderItemReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Builder filter, name of file id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppPageBuilderItemReq.prototype, "search", void 0);
exports.AppPageBuilderItemReq = AppPageBuilderItemReq;
class AppContentVersionReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppContentVersionReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content ID list' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AppContentVersionReq.prototype, "ids", void 0);
exports.AppContentVersionReq = AppContentVersionReq;
class AppTypeFilesReq extends index_validate_types_1.PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppTypeFilesReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Group scope, application|project' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppTypeFilesReq.prototype, "scope", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Get the file under project when scope typs is project, eg. project id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppTypeFilesReq.prototype, "folderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File name or file id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppTypeFilesReq.prototype, "search", void 0);
exports.AppTypeFilesReq = AppTypeFilesReq;
class PageBuildVersionReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], PageBuildVersionReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], PageBuildVersionReq.prototype, "id", void 0);
exports.PageBuildVersionReq = PageBuildVersionReq;
class AppContentDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Version ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppContentDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Version content ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppContentDetail.prototype, "contentId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Version' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppContentDetail.prototype, "version", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Version number' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AppContentDetail.prototype, "versionNumber", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Version details' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], AppContentDetail.prototype, "content", void 0);
exports.AppContentDetail = AppContentDetail;
class AppContentListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", AppContentDetail)
], AppContentListRes.prototype, "list", void 0);
exports.AppContentListRes = AppContentListRes;
class PageContentData {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], PageContentData.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content details' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", Array)
], PageContentData.prototype, "schemas", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content reference list' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", Object)
], PageContentData.prototype, "relation", void 0);
exports.PageContentData = PageContentData;
class PageContentDataRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", PageContentData)
], PageContentDataRes.prototype, "data", void 0);
exports.PageContentDataRes = PageContentDataRes;
class PageBuildVersion extends content_validate_types_1.ContentVersionBaseDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component details' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => component_validate_types_1.ComponentDetail),
    __metadata("design:type", Array)
], PageBuildVersion.prototype, "components", void 0);
exports.PageBuildVersion = PageBuildVersion;
class PageBuildVersionRes {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", PageBuildVersion)
], PageBuildVersionRes.prototype, "data", void 0);
exports.PageBuildVersionRes = PageBuildVersionRes;
class AppPageItemListContentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppPageItemListContentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppPageItemListContentReq.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppPageItemListContentReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Number of data per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppPageItemListContentReq.prototype, "size", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Search, item name or id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppPageItemListContentReq.prototype, "search", void 0);
exports.AppPageItemListContentReq = AppPageItemListContentReq;
class AppProjectItemContentDetail extends file_validate_types_1.FileBaseDetail {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AppProjectItemContentDetail.prototype, "contents", void 0);
exports.AppProjectItemContentDetail = AppProjectItemContentDetail;
class AppProjectItemContentDetailRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AppProjectItemContentDetailRes.prototype, "data", void 0);
exports.AppProjectItemContentDetailRes = AppProjectItemContentDetailRes;
