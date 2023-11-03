import {Injectable} from '@angular/core';
import {connect, Socket} from "socket.io-client";
import {Item} from "./jeton/handle-clicks.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
    this.socket = connect("http://localhost:3000");

    this.socket.on("joined", (message: { message: string }) => {
      console.log(message.message);

      this.socket.emit("initData", {name: this.name});
    })

    this.socket.on("startData", (data: {money: number, remainingTime: number}) => {
      this.currentMoney = data.money;
      this.remainingTime = data.remainingTime;

      if (this.remainingTime == 0) this.running = true;
    })

    this.socket.on("added", (data: {itemName: string, amount: number}) => {
      this.items.get(data.itemName)!.jetonAmount += data.amount;
      this.currentMoney -= data.amount;

      console.log(this.items.get(data.itemName)?.jetonAmount)
    })

    this.socket.on("remainingTime", (time: number) => {
      this.remainingTime = time;
    })

    this.socket.on("running", () => {
      this.running = true;
      console.log(this.running)
    })

    this.socket.on("runnable", () => {
      this.running = false;
      console.log(this.running)
    })

    this.socket.on("error", (error: ErrorMSG) => {
      console.log(ErrorMSG[error])
    })
  }

  socket: Socket;

  items: Map<string, Item> = new Map<string, Item>();

  name: string = "huff";

  currentJetonImg: string = "";
  currentJeton: number = 1;
  currentMoney: number = 0;

  running: boolean = false;

  remainingTime: number = 0;
}

export enum ErrorMSG {
  error = "error",
  notEnoughMoney = "notEnoughMoney",
  playerNotExists = "playerNotExists",
}

export enum Success {
  success = "success"
}
