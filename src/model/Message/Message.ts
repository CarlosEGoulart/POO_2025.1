import { MessageType } from "./EnumType";
import IMessage from "../Interfaces/IMessage";

export default class Message implements IMessage {
    public showMessage(type: MessageType): void {
        console.log(type);
    }
}
