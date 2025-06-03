"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "carlos",
    password: "1234",
    database: "artGallery",
    synchronize: true,
    logging: false,
    entities: [__dirname + '/model/Classes/*.{js,ts}'],
    migrations: [],
    subscribers: [],
});
