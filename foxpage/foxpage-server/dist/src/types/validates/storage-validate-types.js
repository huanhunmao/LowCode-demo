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
exports.UploadObjectsReq = exports.DownloadObjectsReq = exports.StorageListReq = void 0;
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
class StorageListReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], StorageListReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Object prefix' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StorageListReq.prototype, "prefix", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Target bucket' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StorageListReq.prototype, "bucket", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter field, current page number' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], StorageListReq.prototype, "page", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Filter fields, current data volume per page' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], StorageListReq.prototype, "size", void 0);
exports.StorageListReq = StorageListReq;
class DownloadObjectsReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], DownloadObjectsReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Object prefix' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DownloadObjectsReq.prototype, "prefix", void 0);
exports.DownloadObjectsReq = DownloadObjectsReq;
class UploadObjectsReq {
}
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Application ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(20, 20),
    __metadata("design:type", String)
], UploadObjectsReq.prototype, "applicationId", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Origin Object prefix' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UploadObjectsReq.prototype, "prefix", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Origin Object bucket' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UploadObjectsReq.prototype, "bucket", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Target Object bucket' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UploadObjectsReq.prototype, "targetBucket", void 0);
__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: 'Target Object prefix' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UploadObjectsReq.prototype, "targetPrefix", void 0);
exports.UploadObjectsReq = UploadObjectsReq;
