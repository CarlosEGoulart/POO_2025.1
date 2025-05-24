import { MessageType } from "./EnumType";
import IMessage from "./IMessage";

export default class Message implements IMessage {
    public showMessage(type: MessageType): void {
        console.log(type);
    }
}
