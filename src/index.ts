import MainController from "./controller/Controllers/MainController";
import MainScreen from "./view/MainScreen";
import Exception from "./model/Error/Exception";
import { MessageType } from "./model/Message/EnumType";
import Message from "./model/Message/Message";
import { AppDataSource } from "./data-source";

const message = new Message();
const mainController = new MainController();
const mainScreen = new MainScreen(mainController);

try {
    AppDataSource.initialize()
    .then(async () => {
        await mainScreen.start();
        message.showMessage(MessageType.Success);
    })
    .catch((Exception) => {
        throw new Exception("Erro ao iniciar o banco de dados");
    });
} 

catch (error) {
    throw new Exception("Erro ao iniciar o sistema principal");
}
