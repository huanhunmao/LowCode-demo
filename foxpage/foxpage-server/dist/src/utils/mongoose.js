'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_config_1 = require("../../app.config");
const dbConnect = () => {
    console.time('mongoose');
    mongoose_1.default.connect(app_config_1.config.mongodb, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 60000,
        socketTimeoutMS: 60000,
        replicaSet: 'foxpageRs'
    });
    const db = mongoose_1.default.connection;
    db.on('error', (err) => {
        console.log('Connection MongoDB database error:' + err.message);
    });
    db.once('open', () => {
        console.timeEnd('mongoose');
        console.log('Connected to MongoDB database!');
    });
};
exports.default = dbConnect;
