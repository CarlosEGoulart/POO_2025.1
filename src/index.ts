import MainController from "./controller/MainController";
import MainScreen from "./view/MainScreen";
import Exception from "./model/Error/Exception";
import { MessageType } from "./model/Message/EnumType";
import Message from "./model/Message/Message";
import "reflect-metadata";
import { DataSource } from "typeorm";

const message = new Message();
const mainController = new MainController();
const mainScreen = new MainScreen(mainController);

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "carlos",
    password: "1234",
    database: "artGallery",
    entities: [__dirname + '/model/Classes/*.{js,ts}'],
    synchronize: true,
    logging: false,
});

try {
    AppDataSource.initialize()
    .then(async () => {
        mainScreen.start();
        message.showMessage(MessageType.Success);
    })
    .catch((error) => {
        console.error(error);
        throw new Exception("Erro ao iniciar o banco de dados");
    });
} 

catch (error) {
    throw new Exception("Erro ao iniciar o sistema principal");
}
