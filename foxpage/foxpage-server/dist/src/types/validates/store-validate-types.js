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
exports.OfflineGoodsFromStoreReq = exports.AddGoodsToStoreReq = exports.GetStorePackageListRes = exports.AddGoodsItemTpApplicationReq = exports.AddGoodsToApplicationReq = exports.GetPageTemplateListRes = exports.GetFileListReq = exports.GetPackageListReq = exports.GetPageTemplateListReq = exports.StoreGoodsDetail = void 0;
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const index_validate_types_1 = require("./index-validate-types");
class StoreGoodsDetail {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Product ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreGoodsDetail.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'product name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreGoodsDetail.prototype, "name", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Product introduction' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreGoodsDetail.prototype, "intro", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Product type' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreGoodsDetail.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Product details' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreGoodsDetail.prototype, "detail", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Product status' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Number)
], StoreGoodsDetail.prototype, "status", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Created time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], StoreGoodsDetail.prototype, "createTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Update time' }),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], StoreGoodsDetail.prototype, "updateTime", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Delete status' }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], StoreGoodsDetail.prototype, "deleted", void 0);
exports.StoreGoodsDetail = StoreGoodsDetail;
class GetPageTemplateListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], GetPageTemplateListReq.prototype, "appIds", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter goods source file type, default is empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPageTemplateListReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPageTemplateListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPageTemplateListReq.prototype, "size", void 0);
exports.GetPageTemplateListReq = GetPageTemplateListReq;
class GetPackageListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], GetPackageListReq.prototype, "appIds", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter goods source file type, default is empty' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetPackageListReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPackageListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetPackageListReq.prototype, "size", void 0);
exports.GetPackageListReq = GetPackageListReq;
class GetFileListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Product type' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetFileListReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], GetFileListReq.prototype, "appIds", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, currently only filter by name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetFileListReq.prototype, "search", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetFileListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetFileListReq.prototype, "size", void 0);
exports.GetFileListReq = GetFileListReq;
class GetPageTemplateListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", StoreGoodsDetail)
], GetPageTemplateListRes.prototype, "data", void 0);
exports.GetPageTemplateListRes = GetPageTemplateListRes;
class AddGoodsToApplicationReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AddGoodsToApplicationReq.prototype, "appIds", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Product ID' }),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AddGoodsToApplicationReq.prototype, "goodsIds", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Add type, clone|reference, default clone' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddGoodsToApplicationReq.prototype, "delivery", void 0);
exports.AddGoodsToApplicationReq = AddGoodsToApplicationReq;
class AddGoodsItemTpApplicationReq extends AddGoodsToApplicationReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Item type, variable|condition|function..' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddGoodsItemTpApplicationReq.prototype, "type", void 0);
exports.AddGoodsItemTpApplicationReq = AddGoodsItemTpApplicationReq;
class GetStorePackageListRes extends index_validate_types_1.ResponsePageBase {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", StoreGoodsDetail)
], GetStorePackageListRes.prototype, "data", void 0);
exports.GetStorePackageListRes = GetStorePackageListRes;
class AddGoodsToStoreReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddGoodsToStoreReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], AddGoodsToStoreReq.prototype, "id", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Type' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddGoodsToStoreReq.prototype, "type", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Product introduction' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AddGoodsToStoreReq.prototype, "intro", void 0);
exports.AddGoodsToStoreReq = AddGoodsToStoreReq;
class OfflineGoodsFromStoreReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], OfflineGoodsFromStoreReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'File ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], OfflineGoodsFromStoreReq.prototype, "id", void 0);
exports.OfflineGoodsFromStoreReq = OfflineGoodsFromStoreReq;
