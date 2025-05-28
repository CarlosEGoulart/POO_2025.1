import MainController from "./controller/MainController";
import MainScreen from "./view/MainScreen";
import Exception from "./model/Error/Exception";
import { MessageType } from "./model/Message/EnumType";
import Message from "./model/Message/Message";


const mainController = new MainController();
const mainScreen = new MainScreen(mainController);
const message = new Message();


try {
    mainScreen.start();
}

catch (error) {
    throw new Exception("Erro ao iniciar o sistema principal " + MessageType.Error);
}