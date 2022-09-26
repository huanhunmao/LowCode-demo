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
exports.WorkspaceProjectListReq = exports.ProjectDeleteReq = exports.PublishProjectPageRes = exports.PublishProjectPageReq = exports.ProjectPageListRes = exports.ProjectScopeTypeReq = exports.ProjectPageDetail = exports.ProjectListRes = exports.ProjectPagesReq = exports.ProjectPageFilter = exports.ProjectListReq = exports.ProjectDetailRes = exports.UpdateProjectDetailReq = exports.AddProjectPagesReq = exports.ProjectPage = exports.ProjectPageContent = exports.AddProjectDetailReq = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const file_validate_types_1 = require("./file-validate-types");
const index_validate_types_1 = require("./index-validate-types");
class AddProjectDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddProjectDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], AddProjectDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project Introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddProjectDetailReq.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project path' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddProjectDetailReq.prototype, "path", void 0);
exports.AddProjectDetailReq = AddProjectDetailReq;
class ProjectPageContent {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page locale' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectPageContent.prototype, "locale", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page details' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectPageContent.prototype, "detail", void 0);
exports.ProjectPageContent = ProjectPageContent;
class ProjectPage {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectPage.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page path, xx/xx/xx' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjectPage.prototype, "path", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => ProjectPageContent),
    __metadata("design:type", ProjectPageContent)
], ProjectPage.prototype, "content", void 0);
exports.ProjectPage = ProjectPage;
class AddProjectPagesReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddProjectPagesReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddProjectPagesReq.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page data' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ProjectPage),
    __metadata("design:type", Array)
], AddProjectPagesReq.prototype, "files", void 0);
exports.AddProjectPagesReq = AddProjectPagesReq;
class UpdateProjectDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateProjectDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateProjectDetailReq.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(0, 100),
    __metadata("design:type", String)
], UpdateProjectDetailReq.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project Introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDetailReq.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project path' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProjectDetailReq.prototype, "path", void 0);
exports.UpdateProjectDetailReq = UpdateProjectDetailReq;
class ProjectDetailRes extends file_validate_types_1.FolderDetailRes {
}
exports.ProjectDetailRes = ProjectDetailRes;
class ProjectListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ProjectListReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project type, user, involve, team, organization, default is organization' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjectListReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Target type project, if type is team, then typeId is team id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjectListReq.prototype, "typeId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjectListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, currently only filter by organization name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjectListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProjectListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProjectListReq.prototype, "size", void 0);
exports.ProjectListReq = ProjectListReq;
class ProjectPageFilter {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Path' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", Array)
], ProjectPageFilter.prototype, "pathList", void 0);
exports.ProjectPageFilter = ProjectPageFilter;
class ProjectPagesReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ProjectPagesReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ProjectPagesReq.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'filter conditions' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", ProjectPageFilter)
], ProjectPagesReq.prototype, "filter", void 0);
exports.ProjectPagesReq = ProjectPagesReq;
class ProjectListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => file_validate_types_1.FolderDetail),
    __metadata("design:type", Array)
], ProjectListRes.prototype, "data", void 0);
exports.ProjectListRes = ProjectListRes;
class ProjectPageDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ProjectPageDetail.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File path' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectPageDetail.prototype, "path", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File version' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectPageDetail.prototype, "version", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File version content' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ProjectPageDetail.prototype, "content", void 0);
exports.ProjectPageDetail = ProjectPageDetail;
class ProjectScopeTypeReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ProjectScopeTypeReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project ID', default: 'Project ID/Folder ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ProjectScopeTypeReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Search field, name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProjectScopeTypeReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Search field, multiple names match exactly' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProjectScopeTypeReq.prototype, "names", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProjectScopeTypeReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProjectScopeTypeReq.prototype, "size", void 0);
exports.ProjectScopeTypeReq = ProjectScopeTypeReq;
class ProjectPageListRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => ProjectPageDetail),
    __metadata("design:type", ProjectPageDetail)
], ProjectPageListRes.prototype, "data", void 0);
exports.ProjectPageListRes = ProjectPageListRes;
class PublishProjectPageReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], PublishProjectPageReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], PublishProjectPageReq.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page content ID list' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], PublishProjectPageReq.prototype, "ids", void 0);
exports.PublishProjectPageReq = PublishProjectPageReq;
class PublishProjectPageRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsObject)(),
    (0, class_transformer_1.Type)(() => ProjectPageDetail),
    __metadata("design:type", ProjectPageDetail)
], PublishProjectPageRes.prototype, "data", void 0);
exports.PublishProjectPageRes = PublishProjectPageRes;
class ProjectDeleteReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Project ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProjectDeleteReq.prototype, "projectId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID to which the project belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ProjectDeleteReq.prototype, "applicationId", void 0);
exports.ProjectDeleteReq = ProjectDeleteReq;
class WorkspaceProjectListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Organization id' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], WorkspaceProjectListReq.prototype, "organizationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, currently only filter by organization name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], WorkspaceProjectListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WorkspaceProjectListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], WorkspaceProjectListReq.prototype, "size", void 0);
exports.WorkspaceProjectListReq = WorkspaceProjectListReq;
