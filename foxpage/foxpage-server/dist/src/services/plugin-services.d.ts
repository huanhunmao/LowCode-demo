export declare class PluginService {
    private static _instance;
    plugins: any;
    constructor();
    /**
     * Single instance
     * @returns PluginServices
     */
    static getInstance(): PluginService;
    private loadPlugins;
}
