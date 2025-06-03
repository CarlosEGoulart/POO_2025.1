"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MainController_1 = __importDefault(require("./controller/MainController"));
const MainScreen_1 = __importDefault(require("./view/MainScreen"));
const Exception_1 = __importDefault(require("./model/Error/Exception"));
const EnumType_1 = require("./model/Message/EnumType");
const Message_1 = __importDefault(require("./model/Message/Message"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const message = new Message_1.default();
const mainController = new MainController_1.default();
const mainScreen = new MainScreen_1.default(mainController);
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "carlos",
    password: "1234",
    database: "galeria_arte",
    entities: [__dirname + '/model/Classes/*.{js,ts}'],
    synchronize: true,
    logging: false,
});
try {
    AppDataSource.initialize()
        .then(async () => {
        mainScreen.start();
        message.showMessage(EnumType_1.MessageType.Success);
    })
        .catch((error) => {
        console.error(error);
        throw new Exception_1.default("Erro ao iniciar o banco de dados");
    });
}
catch (error) {
    throw new Exception_1.default("Erro ao iniciar o sistema principal");
}
