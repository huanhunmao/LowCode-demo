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
exports.AddMockReq = exports.GetFileParentReq = exports.AddResourceGroupDetailReq = exports.AddTypeFolderDetailReq = exports.DeleteFolderReq = exports.DeleteFileReq = exports.UpdateFolderDetailReq = exports.UpdateTypeFileDetailReq = exports.UpdateFileDetailReq = exports.FolderDeleteReq = exports.FileDetailRes = exports.FileVersionDetailReq = exports.FileDetailReq = exports.FolderDetailRes = exports.FolderDetailReq = exports.FileBreadcrumbRes = exports.FileBreadcrumbReq = exports.BreadcrumbDetail = exports.FileFolderListRes = exports.FolderListRes = exports.FileListRes = exports.AppFileListReq = exports.FileListReq = exports.FolderAndFileDetail = exports.FileBaseDetail = exports.FileDetail = exports.FolderDetail = void 0;
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const app_validate_types_1 = require("./app-validate-types");
const index_validate_types_1 = require("./index-validate-types");
class FolderDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FolderDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], FolderDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Introduction to Folder' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FolderDetail.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the folder belongs' }),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", app_validate_types_1.AppInfo)
], FolderDetail.prototype, "application", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder parent folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 20),
    __metadata("design:type", String)
], FolderDetail.prototype, "folder", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder creator' }),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", index_validate_types_1.CreatorInfo)
], FolderDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Created time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FolderDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FolderDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Delete status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FolderDetail.prototype, "deleted", void 0);
exports.FolderDetail = FolderDetail;
class FileDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], FileDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileDetail.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the file belongs' }),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", app_validate_types_1.AppInfo)
], FileDetail.prototype, "application", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileDetail.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File suffix' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileDetail.prototype, "suffix", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File parent folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 20),
    __metadata("design:type", String)
], FileDetail.prototype, "folderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File creator' }),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", index_validate_types_1.CreatorInfo)
], FileDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Created time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FileDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FileDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Delete status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FileDetail.prototype, "deleted", void 0);
exports.FileDetail = FileDetail;
class FileBaseDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileBaseDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], FileBaseDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileBaseDetail.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the file belongs' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FileBaseDetail.prototype, "application", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileBaseDetail.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File suffix' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileBaseDetail.prototype, "suffix", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File parent folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 20),
    __metadata("design:type", String)
], FileBaseDetail.prototype, "folderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File creator' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FileBaseDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Created time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FileBaseDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], FileBaseDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Delete status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FileBaseDetail.prototype, "deleted", void 0);
exports.FileBaseDetail = FileBaseDetail;
class FolderAndFileDetail {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", FolderDetail)
], FolderAndFileDetail.prototype, "folders", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", FileDetail)
], FolderAndFileDetail.prototype, "files", void 0);
exports.FolderAndFileDetail = FolderAndFileDetail;
class FileListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], FileListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 20),
    __metadata("design:type", String)
], FileListReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File deleted status, default is false' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FileListReq.prototype, "deleted", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileListReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Search character' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FileListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'The maximum amount of data on the current page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], FileListReq.prototype, "size", void 0);
exports.FileListReq = FileListReq;
class AppFileListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppFileListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID list' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AppFileListReq.prototype, "ids", void 0);
exports.AppFileListReq = AppFileListReq;
class FileListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", FileDetail)
], FileListRes.prototype, "data", void 0);
exports.FileListRes = FileListRes;
class FolderListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", FolderDetail)
], FolderListRes.prototype, "data", void 0);
exports.FolderListRes = FolderListRes;
class FileFolderListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", FolderAndFileDetail)
], FileFolderListRes.prototype, "data", void 0);
exports.FileFolderListRes = FileFolderListRes;
class BreadcrumbDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Level ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BreadcrumbDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'level name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BreadcrumbDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Level type: folder/file/template, etc.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BreadcrumbDetail.prototype, "type", void 0);
exports.BreadcrumbDetail = BreadcrumbDetail;
class FileBreadcrumbReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], FileBreadcrumbReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 24),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileBreadcrumbReq.prototype, "folderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Path' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileBreadcrumbReq.prototype, "path", void 0);
exports.FileBreadcrumbReq = FileBreadcrumbReq;
class FileBreadcrumbRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", BreadcrumbDetail)
], FileBreadcrumbRes.prototype, "data", void 0);
exports.FileBreadcrumbRes = FileBreadcrumbRes;
class FolderDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], FolderDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Introduction to Folder' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FolderDetailReq.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the folder belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], FolderDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder type, item/variable/component etc.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FolderDetailReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder parent folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FolderDetailReq.prototype, "parentFolderId", void 0);
exports.FolderDetailReq = FolderDetailReq;
class FolderDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", FolderDetail)
], FolderDetailRes.prototype, "data", void 0);
exports.FolderDetailRes = FolderDetailRes;
class FileDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], FileDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileDetailReq.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the file belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], FileDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File parent folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileDetailReq.prototype, "folderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileDetailReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File label' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], FileDetailReq.prototype, "tags", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File suffix' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileDetailReq.prototype, "suffix", void 0);
exports.FileDetailReq = FileDetailReq;
class FileVersionDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the file belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], FileVersionDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], FileVersionDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileVersionDetailReq.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File parent folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileVersionDetailReq.prototype, "folderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileVersionDetailReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File suffix' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileVersionDetailReq.prototype, "suffix", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File content' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], FileVersionDetailReq.prototype, "content", void 0);
exports.FileVersionDetailReq = FileVersionDetailReq;
class FileDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", FileDetail)
], FileDetailRes.prototype, "data", void 0);
exports.FileDetailRes = FileDetailRes;
class FolderDeleteReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FolderDeleteReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the folder belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], FolderDeleteReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'delete status value, true: delete, false: enable, default is true' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], FolderDeleteReq.prototype, "status", void 0);
exports.FolderDeleteReq = FolderDeleteReq;
class UpdateFileDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the file belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateFileDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateFileDetailReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], UpdateFileDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateFileDetailReq.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File label' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateFileDetailReq.prototype, "tags", void 0);
exports.UpdateFileDetailReq = UpdateFileDetailReq;
class UpdateTypeFileDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the file belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateTypeFileDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTypeFileDetailReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], UpdateTypeFileDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File content version information' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateTypeFileDetailReq.prototype, "content", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTypeFileDetailReq.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File type' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateTypeFileDetailReq.prototype, "type", void 0);
exports.UpdateTypeFileDetailReq = UpdateTypeFileDetailReq;
class UpdateFolderDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFolderDetailReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFolderDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the folder belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateFolderDetailReq.prototype, "applicationId", void 0);
exports.UpdateFolderDetailReq = UpdateFolderDetailReq;
class DeleteFileReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteFileReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the file belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], DeleteFileReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'delete status value, true: delete, false: enable, default is true' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], DeleteFileReq.prototype, "status", void 0);
exports.DeleteFileReq = DeleteFileReq;
class DeleteFolderReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DeleteFolderReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application to which the folder belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], DeleteFolderReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'delete status value, true: delete, false: enable, default is true' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], DeleteFolderReq.prototype, "status", void 0);
exports.DeleteFolderReq = DeleteFolderReq;
class AddTypeFolderDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddTypeFolderDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], AddTypeFolderDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddTypeFolderDetailReq.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Path' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddTypeFolderDetailReq.prototype, "path", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Parent ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddTypeFolderDetailReq.prototype, "parentFolderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder label' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddTypeFolderDetailReq.prototype, "tags", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Resource group config' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], AddTypeFolderDetailReq.prototype, "config", void 0);
exports.AddTypeFolderDetailReq = AddTypeFolderDetailReq;
class AddResourceGroupDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddResourceGroupDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], AddResourceGroupDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Parent ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddResourceGroupDetailReq.prototype, "parentFolderId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddResourceGroupDetailReq.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Path' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddResourceGroupDetailReq.prototype, "path", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Folder label' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddResourceGroupDetailReq.prototype, "tags", void 0);
exports.AddResourceGroupDetailReq = AddResourceGroupDetailReq;
class GetFileParentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetFileParentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Target data ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetFileParentReq.prototype, "id", void 0);
exports.GetFileParentReq = GetFileParentReq;
class AddMockReq extends FileVersionDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Binding content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddMockReq.prototype, "contentId", void 0);
exports.AddMockReq = AddMockReq;
