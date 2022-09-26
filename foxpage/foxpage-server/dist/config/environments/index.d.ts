declare const config: {
    test: {
        host: string;
        port: number;
        jwtKey: string;
        ignoreTokenPath: string[];
        mongodb: string;
        locale: string;
        plugins: string[];
        allLocales: string[];
    };
    debug: {
        host: string;
        port: number;
        jwtKey: string;
        ignoreTokenPath: string[];
        mongodb: string;
        locale: string;
        plugins: string[];
        allLocales: string[];
    };
    development: {
        host: string;
        port: number;
        jwtKey: string;
        ignoreTokenPath: string[];
        mongodb: string;
        locale: string;
        plugins: string[];
        allLocales: string[];
    };
    production: {
        host: string;
        port: number;
        jwtKey: string;
        ignoreTokenPath: string[];
        mongodb: string;
        plugins: string[];
        allLocales: string[];
    };
};
export default config;
