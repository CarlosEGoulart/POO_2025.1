import { MessageType } from "../Message/EnumType";

export default interface IMessage {
    showMessage(type: MessageType): void;
}


