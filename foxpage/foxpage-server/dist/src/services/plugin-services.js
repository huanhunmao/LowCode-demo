"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginService = void 0;
const path_1 = require("path");
const foxpage_plugin_1 = require("@foxpage/foxpage-plugin");
const app_config_1 = require("../../app.config");
class PluginService {
    constructor() {
        this.plugins = null;
        this.loadPlugins();
    }
    /**
     * Single instance
     * @returns PluginServices
     */
    static getInstance() {
        this._instance || (this._instance = new PluginService());
        return this._instance;
    }
    loadPlugins() {
        const plugins = (0, foxpage_plugin_1.createPluginLoader)({
            baseDir: (0, path_1.join)(__dirname, process.env.START_FROM === 'yarn' ? '../../../../../' : '../../../'),
            plugins: app_config_1.config.plugins || [],
            api: {},
            mode: 3,
        });
        plugins.load();
        this.plugins = plugins.getHooks() || {};
    }
}
exports.PluginService = PluginService;
