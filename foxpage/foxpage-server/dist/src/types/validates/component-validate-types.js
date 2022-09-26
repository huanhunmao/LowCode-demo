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
exports.ComponentCategoryTypesRes = exports.ComponentCategoryTypes = exports.GetCategoryComponentReq = exports.BatchLiveReq = exports.RemotePagePackageRes = exports.SetComponentCategoryReq = exports.DeleteComponentCategoryReq = exports.ComponentCategory = exports.RemotePagePackageReq = exports.RemotePackageRes = exports.SaveEditorPackageReq = exports.BatchEditorResource = exports.SaveRemotePackageReq = exports.BatchComponentResource = exports.RemoteComponent = exports.RemoteComponentContent = exports.RemoteResource = exports.NewComponentDetail = exports.RemotePackageReq = exports.AppNameVersionPackagesReq = exports.AppPackageNameVersion = exports.UpdateComponentContentReq = exports.UpdateComponentReq = exports.ComponentVersionUpdateReq = exports.ComponentVersionEditReq = exports.ComponentFileVersionReq = exports.ComponentFileContentReq = exports.AddComponentReq = exports.AppComponentVersionListReq = exports.AppComponentListReq = exports.AppComponentsRes = exports.ComponentDetail = exports.ComponentResource = exports.ResourceEntry = exports.AppComponentsReq = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const index_validate_types_1 = require("./index-validate-types");
class AppComponentsReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppComponentsReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component type, component|editor|library' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AppComponentsReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component ID list' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AppComponentsReq.prototype, "componentIds", void 0);
exports.AppComponentsReq = AppComponentsReq;
class ResourceEntry {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'node' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ResourceEntry.prototype, "node", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'browser' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceEntry.prototype, "browser", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'css' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceEntry.prototype, "css", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'debug' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ResourceEntry.prototype, "debug", void 0);
exports.ResourceEntry = ResourceEntry;
class ComponentResource {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'entry' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => ResourceEntry),
    __metadata("design:type", ResourceEntry)
], ComponentResource.prototype, "entry", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'editor-entry' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => ResourceEntry),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ResourceEntry)
], ComponentResource.prototype, "editor-entry", void 0);
exports.ComponentResource = ComponentResource;
class ComponentDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComponentDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComponentDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component version' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComponentDetail.prototype, "version", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ComponentDetail.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component details' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ComponentResource)
], ComponentDetail.prototype, "resource", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component Schema' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComponentDetail.prototype, "schema", void 0);
exports.ComponentDetail = ComponentDetail;
class AppComponentsRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], AppComponentsRes.prototype, "data", void 0);
exports.AppComponentsRes = AppComponentsRes;
class AppComponentListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppComponentListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: 'Component type, component|editor|library, multiple types can be passed, separated by commas',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppComponentListReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Search characters, component name and ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppComponentListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppComponentListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Number of data per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppComponentListReq.prototype, "size", void 0);
exports.AppComponentListReq = AppComponentListReq;
class AppComponentVersionListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppComponentVersionListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component file ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppComponentVersionListReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Search characters, component name and ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppComponentVersionListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppComponentVersionListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Number of data per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AppComponentVersionListReq.prototype, "size", void 0);
exports.AppComponentVersionListReq = AppComponentVersionListReq;
class AddComponentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddComponentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], AddComponentReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component type, component|editor|library' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddComponentReq.prototype, "type", void 0);
exports.AddComponentReq = AddComponentReq;
class ComponentFileContentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ComponentFileContentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component file ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ComponentFileContentReq.prototype, "id", void 0);
exports.ComponentFileContentReq = ComponentFileContentReq;
class ComponentFileVersionReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ComponentFileVersionReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component file ID', default: 'Component file ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ComponentFileVersionReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component version ID' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ComponentFileVersionReq.prototype, "versionNumber", void 0);
exports.ComponentFileVersionReq = ComponentFileVersionReq;
class ComponentVersionEditReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ComponentVersionEditReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component version ID', default: 'Component version ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ComponentVersionEditReq.prototype, "id", void 0);
exports.ComponentVersionEditReq = ComponentVersionEditReq;
class ComponentVersionUpdateReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ComponentVersionUpdateReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page content version ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ComponentVersionUpdateReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page version content' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], ComponentVersionUpdateReq.prototype, "content", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page version number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ComponentVersionUpdateReq.prototype, "version", void 0);
exports.ComponentVersionUpdateReq = ComponentVersionUpdateReq;
class UpdateComponentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateComponentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component file ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateComponentReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component Introduction' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateComponentReq.prototype, "intro", void 0);
exports.UpdateComponentReq = UpdateComponentReq;
class UpdateComponentContentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateComponentContentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component content ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateComponentContentReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component tags' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UpdateComponentContentReq.prototype, "tags", void 0);
exports.UpdateComponentContentReq = UpdateComponentContentReq;
class AppPackageNameVersion {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppPackageNameVersion.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component version' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppPackageNameVersion.prototype, "version", void 0);
exports.AppPackageNameVersion = AppPackageNameVersion;
class AppNameVersionPackagesReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppNameVersionPackagesReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component ID list' }),
    (0, class_validator_1.ValidateNested)({ always: true, each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AppNameVersionPackagesReq.prototype, "nameVersions", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component type, component|editor|library' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AppNameVersionPackagesReq.prototype, "type", void 0);
exports.AppNameVersionPackagesReq = AppNameVersionPackagesReq;
class RemotePackageReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], RemotePackageReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Package file ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], RemotePackageReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource group ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], RemotePackageReq.prototype, "groupId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Package name ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemotePackageReq.prototype, "name", void 0);
exports.RemotePackageReq = RemotePackageReq;
class NewComponentDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewComponentDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component version' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewComponentDetail.prototype, "version", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component name/Resource folder name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NewComponentDetail.prototype, "resourceName", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'current component version is new or not' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NewComponentDetail.prototype, "isNew", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component files' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], NewComponentDetail.prototype, "files", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewComponentDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component resource group ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NewComponentDetail.prototype, "groupId", void 0);
exports.NewComponentDetail = NewComponentDetail;
class RemoteResource {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Group ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], RemoteResource.prototype, "groupId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Group Name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemoteResource.prototype, "groupName", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource alias name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemoteResource.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource Version' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemoteResource.prototype, "version", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource Name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemoteResource.prototype, "resourceName", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource file level' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RemoteResource.prototype, "files", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource meta' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], RemoteResource.prototype, "meta", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource schema' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], RemoteResource.prototype, "schema", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource is new version status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], RemoteResource.prototype, "isNew", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource folder id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RemoteResource.prototype, "id", void 0);
exports.RemoteResource = RemoteResource;
class RemoteComponentContent {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component content resource' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RemoteComponentContent.prototype, "resource", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component content schema' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], RemoteComponentContent.prototype, "schema", void 0);
exports.RemoteComponentContent = RemoteComponentContent;
class RemoteComponent {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component file id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], RemoteComponent.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component version' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RemoteComponent.prototype, "version", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component version' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RemoteComponentContent),
    __metadata("design:type", RemoteComponentContent)
], RemoteComponent.prototype, "content", void 0);
exports.RemoteComponent = RemoteComponent;
class BatchComponentResource {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Remote resource detail' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RemoteResource),
    __metadata("design:type", RemoteResource)
], BatchComponentResource.prototype, "resource", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Remote component detail' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RemoteComponent),
    __metadata("design:type", RemoteComponent)
], BatchComponentResource.prototype, "component", void 0);
exports.BatchComponentResource = BatchComponentResource;
class SaveRemotePackageReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], SaveRemotePackageReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'package data list' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], SaveRemotePackageReq.prototype, "components", void 0);
exports.SaveRemotePackageReq = SaveRemotePackageReq;
class BatchEditorResource {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Editor name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BatchEditorResource.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Editor resource group id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BatchEditorResource.prototype, "groupId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Remote component detail' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => RemoteComponent),
    __metadata("design:type", RemoteComponent)
], BatchEditorResource.prototype, "component", void 0);
exports.BatchEditorResource = BatchEditorResource;
class SaveEditorPackageReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], SaveEditorPackageReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'package editor list' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], SaveEditorPackageReq.prototype, "components", void 0);
exports.SaveEditorPackageReq = SaveEditorPackageReq;
class RemotePackageRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", BatchComponentResource)
], RemotePackageRes.prototype, "data", void 0);
exports.RemotePackageRes = RemotePackageRes;
class RemotePagePackageReq extends index_validate_types_1.PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], RemotePagePackageReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource group ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], RemotePagePackageReq.prototype, "groupId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource group name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RemotePagePackageReq.prototype, "groupName", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'component name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RemotePagePackageReq.prototype, "name", void 0);
exports.RemotePagePackageReq = RemotePagePackageReq;
class ComponentCategory {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component nick name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComponentCategory.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component category name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComponentCategory.prototype, "categoryName", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component group name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComponentCategory.prototype, "groupName", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component Sort' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ComponentCategory.prototype, "sort", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component Rank' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ComponentCategory.prototype, "rank", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component Props' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ComponentCategory.prototype, "props", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component category description' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ComponentCategory.prototype, "description", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component category screenshot image url' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ComponentCategory.prototype, "screenshot", void 0);
exports.ComponentCategory = ComponentCategory;
class DeleteComponentCategoryReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], DeleteComponentCategoryReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], DeleteComponentCategoryReq.prototype, "id", void 0);
exports.DeleteComponentCategoryReq = DeleteComponentCategoryReq;
class SetComponentCategoryReq extends DeleteComponentCategoryReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource category detail' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ComponentCategory),
    __metadata("design:type", ComponentCategory)
], SetComponentCategoryReq.prototype, "category", void 0);
exports.SetComponentCategoryReq = SetComponentCategoryReq;
class RemotePagePackageRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], RemotePagePackageRes.prototype, "data", void 0);
exports.RemotePagePackageRes = RemotePagePackageRes;
class BatchLiveReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], BatchLiveReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], BatchLiveReq.prototype, "idVersions", void 0);
exports.BatchLiveReq = BatchLiveReq;
class GetCategoryComponentReq extends index_validate_types_1.PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], GetCategoryComponentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component name or id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetCategoryComponentReq.prototype, "search", void 0);
exports.GetCategoryComponentReq = GetCategoryComponentReq;
class ComponentCategoryTypes {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component category name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ComponentCategoryTypes.prototype, "categoryName", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component category group names' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ComponentCategoryTypes.prototype, "groupNames", void 0);
exports.ComponentCategoryTypes = ComponentCategoryTypes;
class ComponentCategoryTypesRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ComponentCategoryTypes),
    __metadata("design:type", Array)
], ComponentCategoryTypesRes.prototype, "data", void 0);
exports.ComponentCategoryTypesRes = ComponentCategoryTypesRes;
