"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Artist_1 = __importDefault(require("./model/Classes/Artist"));
const Exhibition_1 = __importDefault(require("./model/Classes/Exhibition"));
const Art_1 = __importDefault(require("./model/Classes/Art"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: 'carlos',
    password: '1234',
    database: 'artGallery',
    logging: false,
    entities: [Artist_1.default, Art_1.default, Exhibition_1.default],
    migrations: ["./db/Migrations/*.ts"],
    subscribers: [],
});
