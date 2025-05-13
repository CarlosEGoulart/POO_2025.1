import { IMessage } from "./IMessage";  

export class Message implements IMessage {
    showMessage(): void {
        console.log("Ação realizada com sucesso!");
    }
}

