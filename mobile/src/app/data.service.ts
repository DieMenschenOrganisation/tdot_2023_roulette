import {Injectable} from '@angular/core';
import {connect, Socket} from "socket.io-client";
import {Item} from "./jeton/handle-clicks.service";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  start() {
    this.socket = connect(environment.apiURL);

    this.socket.on("joined", (message: { message: string }) => {
      console.log(message.message);

      this.socket.emit("initData", {userID: this.name});
    })

    this.socket.on("startData", (data: {money: number, items: any, remainingTime: number}) => {
      this.currentMoney = data.money;
      this.remainingTime = data.remainingTime;
      this.items = new Map(JSON.parse(data.items));

      if (this.remainingTime == 0) this.running = true;
    })

    this.socket.on("added", (data: {itemName: string, amount: number}) => {
      this.items.get(data.itemName)!.jetonAmount += data.amount;
      this.currentMoney -= data.amount;
    })

    this.socket.on("deleted", (money: number) => {
      this.currentMoney = money;
      this.items = this.getItems();
    })

    this.socket.on("payOut", (money: number) => {
      console.log(money)

      this.currentMoney = money;
    })

    this.socket.on("roundEnd", () => {
      this.items = this.getItems();
    })

    this.socket.on("remainingTime", (time: number) => {
      this.remainingTime = time;
    })

    this.socket.on("running", () => {
      this.running = true;
    })

    this.socket.on("runnable", () => {
      this.running = false;
    })

    this.socket.on("error", (error: ErrorMSG) => {
      console.log(ErrorMSG[error])
    })
  }

  socket!: Socket;

  items: Map<string, Item> = new Map<string, Item>();

  name: string = "";

  currentJetonImg: string = "";
  currentJeton: number = 1;
  currentMoney: number = 0;

  running: boolean = false;

  remainingTime: number = 0;

  getItems(): Map<string, Item> {
    let map = new Map<string, Item>;

    for (let i = 0; i < 37; i++) {
      map.set(i.toString(), {values: [i], jetonAmount: 0, payoutFactor: 35})
    }

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 12; y++) {
        if (x == 2) {
          let num1 = ((y + 1) * 3 - x);
          let num2 = ((y + 1) * 3 - (x - 1));
          let num3 = ((y + 1) * 3 - (x - 2));

          map.set([num1, num2, num3].toString(), {values: [num1, num2, num3], jetonAmount: 0, payoutFactor: 11})
        } else {
          let num1 = ((y + 1) * 3 - x);
          let num2 = ((y + 1) * 3 - (x + 1));

          map.set([num1, num2].toString(), {values: [num1, num2], jetonAmount: 0, payoutFactor: 17})
        }
      }
    }

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 12 - 1; y++) {
        let num1 = ((y + 1) * 3 - x);
        let num2 = ((y + 2) * 3 - x);

        map.set([num1, num2].toString(), {values: [num1, num2], jetonAmount: 0, payoutFactor: 17})
      }
    }

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 12 - 1; y++) {
        if (x == 2) {
          let num1 = ((y + 1) * 3 - x);
          let num2 = ((y + 1) * 3 - (x - 1));
          let num3 = ((y + 1) * 3 - (x - 2));
          let num4 = ((y + 2) * 3 - x);
          let num5 = ((y + 2) * 3 - (x - 1));
          let num6 = ((y + 2) * 3 - (x - 2));

          map.set([num1, num2, num3, num4, num5, num6].toString(), {
            values: [num1, num2, num3, num4, num5, num6],
            jetonAmount: 0,
            payoutFactor: 5
          })
        } else {
          let num1 = ((y + 1) * 3 - x);
          let num2 = ((y + 1) * 3 - (x + 1));
          let num3 = ((y + 2) * 3 - x);
          let num4 = ((y + 2) * 3 - (x + 1));

          map.set([num1, num2, num3, num4].toString(), {
            values: [num1, num2, num3, num4],
            jetonAmount: 0,
            payoutFactor: 8
          })
        }

      }
    }

    map.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].toString(), {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      jetonAmount: 0,
      payoutFactor: 2
    })
    map.set([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].toString(), {
      values: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      jetonAmount: 0,
      payoutFactor: 2
    })
    map.set([25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].toString(), {
      values: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
      jetonAmount: 0,
      payoutFactor: 2
    })

    map.set([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].toString(), {
      values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
      jetonAmount: 0,
      payoutFactor: 2
    })
    map.set([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].toString(), {
      values: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
      jetonAmount: 0,
      payoutFactor: 2
    })
    map.set([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].toString(), {
      values: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
      jetonAmount: 0,
      payoutFactor: 2
    })

    map.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].toString(), {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      jetonAmount: 0,
      payoutFactor: 1
    })
    map.set([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36].toString(), {
      values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
      jetonAmount: 0,
      payoutFactor: 1
    })
    map.set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].toString(), {
      values: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
      jetonAmount: 0,
      payoutFactor: 1
    })
    map.set([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].toString(), {
      values: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
      jetonAmount: 0,
      payoutFactor: 1
    })
    map.set([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35].toString(), {
      values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35],
      jetonAmount: 0,
      payoutFactor: 1
    })
    map.set([19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].toString(), {
      values: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
      jetonAmount: 0,
      payoutFactor: 1
    })

    return map;
  }

}

export enum ErrorMSG {
  error = "error",
  notEnoughMoney = "notEnoughMoney",
  playerNotExists = "playerNotExists",
}

export enum Success {
  success = "success"
}
