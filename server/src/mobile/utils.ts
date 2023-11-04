import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

export enum ErrorMSG {
    error = "error",
    notEnoughMoney = "notEnoughMoney",
    playerNotExists = "playerNotExists",
    playerAlreadyExists = "playerAlreadyExists"
}

export enum Success {
    success = "success"
}

export type WebSocket = Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;