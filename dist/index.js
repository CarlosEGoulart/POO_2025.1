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
const mainController = new MainController_1.default();
const mainScreen = new MainScreen_1.default(mainController);
const message = new Message_1.default();
try {
    mainScreen.start();
}
catch (error) {
    throw new Exception_1.default("Erro ao iniciar o sistema principal " + EnumType_1.MessageType.Error);
}
