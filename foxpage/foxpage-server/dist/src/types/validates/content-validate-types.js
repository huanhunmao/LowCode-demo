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
exports.CloneContentReq = exports.VersionPublishStatus2Req = exports.VersionPublishStatusReq = exports.ContentChangeReq = exports.AppContentLiveReq = exports.AppContentStatusReq = exports.AppFileContentStatusReq = exports.TagContentVersionReq = exports.TemplateListReq = exports.ContentVersionDetailReq = exports.PageContentVersionDetailReq = exports.ContentDetailReq = exports.ContentDSLReq = exports.ContentVersionBuildDetailReq = exports.ContentVersionBaseDetailRes = exports.ContentVersionDetailRes = exports.ContentVersionListReq = exports.ContentLiveReq = exports.ContentVersionBaseDetail = exports.ContentVersionDetail = exports.ContentVersionCommonDetail = exports.ContentVersionBaseUpdateReq = exports.ContentVersionUpdateReq = exports.ContentSchemaRelation = exports.DSLContentStructureReq = exports.ContentVersionReq = exports.ContentDetailsReq = exports.ContentListReq = exports.ContentStatusReq = exports.DeleteContentReq = exports.TagVersionRelationRes = exports.TagVersionRelation = exports.ContentBaseDetailRes = exports.ContentDetailRes = exports.ContentDetail = exports.ContentBaseDetail = exports.UpdateContentReq = exports.AddContentReq = void 0;
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const index_validate_types_1 = require("./index-validate-types");
class AddContentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddContentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID to which the page belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddContentReq.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page Title' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 100),
    __metadata("design:type", String)
], AddContentReq.prototype, "title", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page Content base tag' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AddContentReq.prototype, "isBase", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page Content extend tag' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddContentReq.prototype, "extendId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page label' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddContentReq.prototype, "tags", void 0);
exports.AddContentReq = AddContentReq;
class UpdateContentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateContentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UpdateContentReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page Title' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContentReq.prototype, "title", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page Content base tag' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateContentReq.prototype, "isBase", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page Content extend tag' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateContentReq.prototype, "extendId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page label' }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)()
    // @Type(() => ContentTag)
    ,
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateContentReq.prototype, "tags", void 0);
exports.UpdateContentReq = UpdateContentReq;
class ContentBaseDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentBaseDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page Title' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentBaseDetail.prototype, "title", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID to which the page belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentBaseDetail.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page label' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ContentBaseDetail.prototype, "tags", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page live version ID' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ContentBaseDetail.prototype, "liveVersionCode", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page creator' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentBaseDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page creation time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ContentBaseDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ContentBaseDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page delete status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ContentBaseDetail.prototype, "deleted", void 0);
exports.ContentBaseDetail = ContentBaseDetail;
class ContentDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page Title' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentDetail.prototype, "title", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID to which the page belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentDetail.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page label' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ContentDetail.prototype, "tags", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page live version ID' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ContentDetail.prototype, "liveVersionNumber", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page live version number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ContentDetail.prototype, "liveVersion", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page creator' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", index_validate_types_1.CreatorInfo)
], ContentDetail.prototype, "creator", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page creation time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ContentDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ContentDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page delete status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ContentDetail.prototype, "deleted", void 0);
exports.ContentDetail = ContentDetail;
class ContentDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", ContentDetail)
], ContentDetailRes.prototype, "data", void 0);
exports.ContentDetailRes = ContentDetailRes;
class ContentBaseDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", ContentBaseDetail)
], ContentBaseDetailRes.prototype, "data", void 0);
exports.ContentBaseDetailRes = ContentBaseDetailRes;
class TagVersionRelation {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content' }),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ContentDetail)
], TagVersionRelation.prototype, "content", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'The version corresponding to the page, including the relation version' }),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], TagVersionRelation.prototype, "contentInfo", void 0);
exports.TagVersionRelation = TagVersionRelation;
class TagVersionRelationRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", TagVersionRelation)
], TagVersionRelationRes.prototype, "data", void 0);
exports.TagVersionRelationRes = TagVersionRelationRes;
class DeleteContentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], DeleteContentReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Deleted status of page content; true: deleted, false: normal' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], DeleteContentReq.prototype, "status", void 0);
exports.DeleteContentReq = DeleteContentReq;
class ContentStatusReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page version ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentStatusReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page version status: base|alpha|beta|release...' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentStatusReq.prototype, "status", void 0);
exports.ContentStatusReq = ContentStatusReq;
class ContentListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID to which the page belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentListReq.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content deleted status, default is false' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ContentListReq.prototype, "deleted", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content search string' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ContentListReq.prototype, "search", void 0);
exports.ContentListReq = ContentListReq;
class ContentDetailsReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentDetailsReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content ID list' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], ContentDetailsReq.prototype, "contentIds", void 0);
exports.ContentDetailsReq = ContentDetailsReq;
class ContentVersionReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionReq.prototype, "contentId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page content version number' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentVersionReq.prototype, "version", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ContentVersionReq.prototype, "content", void 0);
exports.ContentVersionReq = ContentVersionReq;
class DSLContentStructureReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content version ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DSLContentStructureReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Operation type, add|update|delete|move' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DSLContentStructureReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'parent ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DSLContentStructureReq.prototype, "parentId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'The position of the node under the parent' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], DSLContentStructureReq.prototype, "position", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Node content' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DSLContentStructureReq.prototype, "content", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Node associated content' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], DSLContentStructureReq.prototype, "relation", void 0);
exports.DSLContentStructureReq = DSLContentStructureReq;
class ContentSchemaRelation {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ContentSchemaRelation.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Version content' }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Object)
], ContentSchemaRelation.prototype, "schemas", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content associated with version' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ContentSchemaRelation.prototype, "relation", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Version extension' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ContentSchemaRelation.prototype, "extension", void 0);
exports.ContentSchemaRelation = ContentSchemaRelation;
class ContentVersionUpdateReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionUpdateReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionUpdateReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page version content' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ContentSchemaRelation)
], ContentVersionUpdateReq.prototype, "content", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page version number' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ContentVersionUpdateReq.prototype, "version", void 0);
exports.ContentVersionUpdateReq = ContentVersionUpdateReq;
class ContentVersionBaseUpdateReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionBaseUpdateReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionBaseUpdateReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page version content' }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ContentSchemaRelation)
], ContentVersionBaseUpdateReq.prototype, "content", void 0);
exports.ContentVersionBaseUpdateReq = ContentVersionBaseUpdateReq;
class ContentVersionCommonDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionCommonDetail.prototype, "contentId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page version number' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentVersionCommonDetail.prototype, "version", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page version number' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], ContentVersionCommonDetail.prototype, "versionNumber", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page state' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentVersionCommonDetail.prototype, "status", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content' }),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], ContentVersionCommonDetail.prototype, "content", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page creation time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ContentVersionCommonDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ContentVersionCommonDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page delete status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], ContentVersionCommonDetail.prototype, "deleted", void 0);
exports.ContentVersionCommonDetail = ContentVersionCommonDetail;
class ContentVersionDetail extends ContentVersionCommonDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page creator' }),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", index_validate_types_1.CreatorInfo)
], ContentVersionDetail.prototype, "creator", void 0);
exports.ContentVersionDetail = ContentVersionDetail;
class ContentVersionBaseDetail extends ContentVersionCommonDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page creator' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ContentVersionBaseDetail.prototype, "creator", void 0);
exports.ContentVersionBaseDetail = ContentVersionBaseDetail;
class ContentLiveReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentLiveReq.prototype, "contentId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Live version number' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ContentLiveReq.prototype, "versionNumber", void 0);
exports.ContentLiveReq = ContentLiveReq;
class ContentVersionListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionListReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID to which the page belongs' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionListReq.prototype, "fileId", void 0);
exports.ContentVersionListReq = ContentVersionListReq;
class ContentVersionDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", ContentVersionDetail)
], ContentVersionDetailRes.prototype, "data", void 0);
exports.ContentVersionDetailRes = ContentVersionDetailRes;
class ContentVersionBaseDetailRes extends index_validate_types_1.ResponseBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", ContentVersionBaseDetail)
], ContentVersionBaseDetailRes.prototype, "data", void 0);
exports.ContentVersionBaseDetailRes = ContentVersionBaseDetailRes;
class ContentVersionBuildDetailReq extends index_validate_types_1.App {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionBuildDetailReq.prototype, "fileId", void 0);
exports.ContentVersionBuildDetailReq = ContentVersionBuildDetailReq;
class ContentDSLReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentDSLReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page content version number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ContentDSLReq.prototype, "versionNumber", void 0);
exports.ContentDSLReq = ContentDSLReq;
class ContentDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentDetailReq.prototype, "id", void 0);
exports.ContentDetailReq = ContentDetailReq;
class PageContentVersionDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], PageContentVersionDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], PageContentVersionDetailReq.prototype, "contentId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page content version number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PageContentVersionDetailReq.prototype, "versionNumber", void 0);
exports.PageContentVersionDetailReq = PageContentVersionDetailReq;
class ContentVersionDetailReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionDetailReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'page content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentVersionDetailReq.prototype, "contentId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page content version number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ContentVersionDetailReq.prototype, "versionNumber", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Page content version ID' }),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ContentVersionDetailReq.prototype, "id", void 0);
exports.ContentVersionDetailReq = ContentVersionDetailReq;
class TemplateListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], TemplateListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TemplateListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'The maximum amount of data on the current page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], TemplateListReq.prototype, "size", void 0);
exports.TemplateListReq = TemplateListReq;
class TagContentVersionReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], TagContentVersionReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Path, path or file id must pass one of it' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TagContentVersionReq.prototype, "pathname", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File id, path or file id must pass one of it' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TagContentVersionReq.prototype, "fileId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content Tags' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], TagContentVersionReq.prototype, "tags", void 0);
exports.TagContentVersionReq = TagContentVersionReq;
class AppFileContentStatusReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppFileContentStatusReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'ID, folder ID, file ID' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AppFileContentStatusReq.prototype, "ids", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Delete status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AppFileContentStatusReq.prototype, "status", void 0);
exports.AppFileContentStatusReq = AppFileContentStatusReq;
class AppContentStatusReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppContentStatusReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppContentStatusReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Delete status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], AppContentStatusReq.prototype, "status", void 0);
exports.AppContentStatusReq = AppContentStatusReq;
class AppContentLiveReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppContentLiveReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AppContentLiveReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'live version number' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AppContentLiveReq.prototype, "versionNumber", void 0);
exports.AppContentLiveReq = AppContentLiveReq;
class ContentChangeReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], ContentChangeReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Timestamp' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ContentChangeReq.prototype, "timestamp", void 0);
exports.ContentChangeReq = ContentChangeReq;
class VersionPublishStatusReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], VersionPublishStatusReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Version ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], VersionPublishStatusReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Version status' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VersionPublishStatusReq.prototype, "status", void 0);
exports.VersionPublishStatusReq = VersionPublishStatusReq;
class VersionPublishStatus2Req extends VersionPublishStatusReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content ID, contentId or versionId must provider one of it' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], VersionPublishStatus2Req.prototype, "contentId", void 0);
exports.VersionPublishStatus2Req = VersionPublishStatus2Req;
class CloneContentReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], CloneContentReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Target Content ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CloneContentReq.prototype, "targetContentId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Content ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CloneContentReq.prototype, "sourceContentId", void 0);
exports.CloneContentReq = CloneContentReq;
