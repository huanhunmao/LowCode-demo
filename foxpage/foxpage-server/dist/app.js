'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startService = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const dotenv_1 = __importDefault(require("dotenv"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa2_swagger_ui_1 = require("koa2-swagger-ui");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const middlewares_1 = require("./src/middlewares");
const mongoose_1 = __importDefault(require("./src/utils/mongoose"));
dotenv_1.default.config();
const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
function startService(options) {
    try {
        (0, mongoose_1.default)();
        // start the service
        const routingControllerOptions = {
            cors: {
                origin: false,
                methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
                allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
                credentials: true,
                'Content-Type': 'application/json;charset=utf-8',
            },
            defaultErrorHandler: false,
            routePrefix: '/',
            controllers: [path_1.default.resolve(__dirname, './src/controllers/**/*.{js,ts}')],
            middlewares: [middlewares_1.loggerMiddleware, middlewares_1.tokenMiddleware],
            defaults: { paramOptions: { required: true } },
        };
        const app = (0, routing_controllers_1.createKoaServer)(routingControllerOptions);
        app.use((0, koa_bodyparser_1.default)());
        // healthcheck
        app.use(new koa_router_1.default()
            .all('/healthcheck', async (ctx) => {
            ctx.body = 'Hello Foxpage!';
        })
            .routes());
        app.use((0, koa_static_1.default)(path_1.default.join(__dirname, './static')));
        if (options.createSwagger) {
            const schemas = (0, class_validator_jsonschema_1.validationMetadatasToSchemas)({
                classTransformerMetadataStorage: defaultMetadataStorage,
                refPointerPrefix: '#/components/schemas/',
            });
            const storage = (0, routing_controllers_1.getMetadataArgsStorage)();
            const spec = (0, routing_controllers_openapi_1.routingControllersToSpec)(storage, routingControllerOptions, {
                components: {
                    schemas,
                    securitySchemes: {
                        basicAuth: {
                            scheme: 'basic',
                            type: 'http',
                        },
                    },
                },
                info: {
                    description: 'Generated with `Foxpage`',
                    title: 'Foxpage server api list',
                    version: '1.0.0',
                },
            });
            // Update the content of the swagger.json file
            (0, fs_1.writeFile)(__dirname + '/static/swagger/swagger.json', JSON.stringify(spec), 'utf8', () => { });
            app.use((0, koa2_swagger_ui_1.koaSwagger)({
                routePrefix: '/swagger',
                swaggerOptions: {
                    supportedSubmitMethods: ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace'],
                    url: './swagger.json',
                },
            }));
        }
        app.on('error', (err) => {
            console.error(`Unexpected error: ${err.message}`);
        });
        process.on('exit', (code) => {
            console.log(`Process exit with code: ${code}`);
        });
        process.on('unhandledRejection', (err) => {
            console.log(err);
            console.error(`Unhandled rejection: ${err.message}`);
        });
        return app;
    }
    catch (err) {
        console.error(`Start system cause error: ${err.message}`);
    }
}
exports.startService = startService;
