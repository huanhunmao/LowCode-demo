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
exports.AppSettingItemRes = exports.AppSettingItemDetail = exports.AppSettingDetailReq = exports.AppSettingInfo = exports.AppSettingListReq = exports.AppPackageGoodsListReq = exports.AppProjectGoodsListReq = exports.AppLocalesRes = exports.AppLocalesReq = exports.AppPackageListRes = exports.AppPackageListDetail = exports.AppPackageListReq = exports.AppDetailWithFolderRes = exports.AppDetailWithFolder = exports.AppDetailReq = exports.AppInfo = exports.AppResourceDetailRes = exports.AppDetailRes = exports.AppListRes = exports.UpdateAppReq = exports.AddAppDetailReq = exports.AppListByIdsReq = exports.AllAppListReq = exports.AppListReq = exports.AppBaseDetail = exports.AppHostInfo = exports.AppResource = exports.AppDetail = exports.AppIDReq = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const file_validate_types_1 = require("./file-validate-types");
const index_validate_types_1 = require("./index-validate-types");
const user_validate_types_1 = require("./user-validate-types");
class AppIDReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppIDReq.prototype, "applicationId", void 0);
exports.AppIDReq = AppIDReq;
class AppDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], AppDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application introduction' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppDetail.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application Owner' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20),
    __metadata("design:type", String)
], AppDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application locales' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AppDetail.prototype, "locales", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application resources' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => AppResource),
    __metadata("design:type", Array)
], AppDetail.prototype, "resources", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application create time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AppDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], AppDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'deleted status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AppDetail.prototype, "deleted", void 0);
exports.AppDetail = AppDetail;
class AppResource {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], AppResource.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'resource type, 1: self-built, 2: third party' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AppResource.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource basic information' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], AppResource.prototype, "detail", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppResource.prototype, "id", void 0);
exports.AppResource = AppResource;
class AppHostInfo {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Host url' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppHostInfo.prototype, "url", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Host locales' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AppHostInfo.prototype, "locales", void 0);
exports.AppHostInfo = AppHostInfo;
class AppBaseDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], AppBaseDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application introdution' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppBaseDetail.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application Host' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AppBaseDetail.prototype, "host", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'App Slug' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppBaseDetail.prototype, "slug", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'application locales' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AppBaseDetail.prototype, "locales", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application static resources' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => AppResource),
    __metadata("design:type", Array)
], AppBaseDetail.prototype, "resources", void 0);
exports.AppBaseDetail = AppBaseDetail;
class AppListReq extends index_validate_types_1.PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppListReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'App type, user, organization, default is organization' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppListReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, currently only filtered by application name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppListReq.prototype, "search", void 0);
exports.AppListReq = AppListReq;
class AllAppListReq extends index_validate_types_1.PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, currently only filtered by application name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AllAppListReq.prototype, "search", void 0);
exports.AllAppListReq = AllAppListReq;
class AppListByIdsReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID list' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AppListByIdsReq.prototype, "applicationIds", void 0);
exports.AppListByIdsReq = AppListByIdsReq;
class AddAppDetailReq extends AppBaseDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID to which the application belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddAppDetailReq.prototype, "organizationId", void 0);
exports.AddAppDetailReq = AddAppDetailReq;
class UpdateAppReq extends AppBaseDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateAppReq.prototype, "applicationId", void 0);
exports.UpdateAppReq = UpdateAppReq;
class AppListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AppDetail)
], AppListRes.prototype, "data", void 0);
exports.AppListRes = AppListRes;
class AppDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application details' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", AppDetail)
], AppDetailRes.prototype, "data", void 0);
exports.AppDetailRes = AppDetailRes;
class AppResourceDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application resource details' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", AppResource)
], AppResourceDetailRes.prototype, "data", void 0);
exports.AppResourceDetailRes = AppResourceDetailRes;
class AppInfo {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppInfo.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(1, 50),
    __metadata("design:type", String)
], AppInfo.prototype, "name", void 0);
exports.AppInfo = AppInfo;
class AppDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource Type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppDetailReq.prototype, "type", void 0);
exports.AppDetailReq = AppDetailReq;
class AppDetailWithFolder extends AppDetail {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", file_validate_types_1.FolderDetail)
], AppDetailWithFolder.prototype, "folders", void 0);
exports.AppDetailWithFolder = AppDetailWithFolder;
class AppDetailWithFolderRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", AppDetailWithFolder)
], AppDetailWithFolderRes.prototype, "data", void 0);
exports.AppDetailWithFolderRes = AppDetailWithFolderRes;
class AppPackageListReq extends AppIDReq {
}
exports.AppPackageListReq = AppPackageListReq;
class AppPackageListDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppPackageListDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppPackageListDetail.prototype, "title", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component live version' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppPackageListDetail.prototype, "version", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Component details' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], AppPackageListDetail.prototype, "content", void 0);
exports.AppPackageListDetail = AppPackageListDetail;
class AppPackageListRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application component list' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", AppPackageListDetail)
], AppPackageListRes.prototype, "data", void 0);
exports.AppPackageListRes = AppPackageListRes;
class AppLocalesReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppLocalesReq.prototype, "applicationId", void 0);
exports.AppLocalesReq = AppLocalesReq;
class AppLocalesRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application Locales' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], AppLocalesRes.prototype, "data", void 0);
exports.AppLocalesRes = AppLocalesRes;
class AppProjectGoodsListReq extends index_validate_types_1.PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppProjectGoodsListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter filed, goods types' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppProjectGoodsListReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Product name, fuzzy match' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppProjectGoodsListReq.prototype, "search", void 0);
exports.AppProjectGoodsListReq = AppProjectGoodsListReq;
class AppPackageGoodsListReq extends index_validate_types_1.PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppPackageGoodsListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Product name, fuzzy match' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppPackageGoodsListReq.prototype, "search", void 0);
exports.AppPackageGoodsListReq = AppPackageGoodsListReq;
class AppSettingListReq extends index_validate_types_1.PagingReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppSettingListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'App type, user, organization, default is organization' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppSettingListReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, currently only filtered by application name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AppSettingListReq.prototype, "search", void 0);
exports.AppSettingListReq = AppSettingListReq;
class AppSettingInfo {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'App setting item id, file Id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppSettingInfo.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'App setting item name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppSettingInfo.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Item type status, true|false' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AppSettingInfo.prototype, "status", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Item type status, true|false' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], AppSettingInfo.prototype, "category", void 0);
exports.AppSettingInfo = AppSettingInfo;
class AppSettingDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppSettingDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application setting item type, page|template|component' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AppSettingDetailReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application setting item detail' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => AppSettingInfo),
    __metadata("design:type", Array)
], AppSettingDetailReq.prototype, "setting", void 0);
exports.AppSettingDetailReq = AppSettingDetailReq;
class AppSettingItemDetail extends AppSettingInfo {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application Owner' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", user_validate_types_1.UserBase)
], AppSettingItemDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application create time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AppSettingItemDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application update time' }),
    (0, class_validator_1.IsDate)(),
    __metadata("design:type", Date)
], AppSettingItemDetail.prototype, "updateTime", void 0);
exports.AppSettingItemDetail = AppSettingItemDetail;
class AppSettingItemRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => AppSettingItemDetail),
    __metadata("design:type", Array)
], AppSettingItemRes.prototype, "data", void 0);
exports.AppSettingItemRes = AppSettingItemRes;
