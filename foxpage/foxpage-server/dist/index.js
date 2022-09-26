"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const app_config_1 = require("./app.config");
const app = (0, app_1.startService)({ createSwagger: true });
app.listen(app_config_1.config.port, () => {
    console.info('Start success at port:' + app_config_1.config.port);
});
