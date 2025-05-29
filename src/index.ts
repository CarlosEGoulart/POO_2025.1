import MainController from "./controller/MainController";
import MainScreen from "./view/MainScreen";
import Exception from "./model/Error/Exception";
import { MessageType } from "./model/Message/EnumType";
import Message from "./model/Message/Message";
import "reflect-metadata";
import { DataSource } from "typeorm";
import Art from "./model/Classes/Art";

const message = new Message()
const mainController = new MainController();
const mainScreen = new MainScreen(mainController);
const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "carlos",
    password: "1234",
    database: "galeria_arte",
    entities: [Art],
    synchronize: true,
    logging: false,
})




try {
    mainScreen.start();
    AppDataSource.initialize()
        .then(() => {
            message.showMessage(MessageType.Success);
        })
        .catch((error) => () => { 
            throw new Exception("Erro ao iniciar o banco de dados" + MessageType.Error);
        });
        }       

catch (error) {
    throw new Exception("Erro ao iniciar o sistema principal " + MessageType.Error);
}