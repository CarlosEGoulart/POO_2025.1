import { MessageType } from "./EnumType";
import IMessage from "./IMessage";

export default class Fit implements IMessage {
    public showMessage(type: MessageType): void {
        console.log(type);
    }
}