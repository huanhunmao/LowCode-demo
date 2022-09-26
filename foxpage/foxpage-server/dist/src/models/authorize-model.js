"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeModel = void 0;
const authorize_1 = __importDefault(require("./schema/authorize"));
const base_model_1 = require("./base-model");
/**
 * Authorize repository related classes
 */
class AuthorizeModel extends base_model_1.BaseModel {
    constructor() {
        super(authorize_1.default);
    }
    /**
     * Single instance
     * @returns AuthorizeModel
     */
    static getInstance() {
        this._instance || (this._instance = new AuthorizeModel());
        return this._instance;
    }
}
exports.AuthorizeModel = AuthorizeModel;
