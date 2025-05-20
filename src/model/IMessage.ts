import { MessageType } from "./EnumType";

export default interface IMessage {
    showMessage(type: MessageType): void;
}


