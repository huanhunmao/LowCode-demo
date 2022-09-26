"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = exports.user = exports.team = exports.storeOrder = exports.storeGoods = exports.relation = exports.org = exports.log = exports.folder = exports.file = exports.content = exports.auth = exports.application = void 0;
const application_model_1 = require("./application-model");
const authorize_model_1 = require("./authorize-model");
const content_model_1 = require("./content-model");
const content_relation_model_1 = require("./content-relation-model");
const file_model_1 = require("./file-model");
const folder_model_1 = require("./folder-model");
const log_model_1 = require("./log-model");
const organization_model_1 = require("./organization-model");
const store_goods_model_1 = require("./store-goods-model");
const store_order_model_1 = require("./store-order-model");
const team_model_1 = require("./team-model");
const user_model_1 = require("./user-model");
const version_model_1 = require("./version-model");
const application = application_model_1.ApplicationModel.getInstance();
exports.application = application;
const auth = authorize_model_1.AuthorizeModel.getInstance();
exports.auth = auth;
const user = user_model_1.UserModel.getInstance();
exports.user = user;
const folder = folder_model_1.FolderModel.getInstance();
exports.folder = folder;
const file = file_model_1.FileModel.getInstance();
exports.file = file;
const org = organization_model_1.OrgModel.getInstance();
exports.org = org;
const team = team_model_1.TeamModel.getInstance();
exports.team = team;
const content = content_model_1.ContentModel.getInstance();
exports.content = content;
const version = version_model_1.VersionModel.getInstance();
exports.version = version;
const log = log_model_1.LogModel.getInstance();
exports.log = log;
const relation = content_relation_model_1.RelationModel.getInstance();
exports.relation = relation;
const storeGoods = store_goods_model_1.StoreGoodsModel.getInstance();
exports.storeGoods = storeGoods;
const storeOrder = store_order_model_1.StoreOrderModel.getInstance();
exports.storeOrder = storeOrder;