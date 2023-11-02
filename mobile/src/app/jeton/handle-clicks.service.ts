import {Injectable} from '@angular/core';
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class HandleClicksService {

  betweenBetsEnabled: boolean = false;
  isBetweenBetExistent: boolean = false;

  constructor(private dataService: DataService) {
    for (let i = 0; i < 37; i++) {
      this.dataService.items.set(i.toString(), {values: [i], jetonAmount: 0, payoutFactor: 35})
    }

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 12; y++) {
        if (x == 2) {
          let num1 = ((y + 1) * 3 - x);
          let num2 = ((y + 1) * 3 - (x - 1));
          let num3 = ((y + 1) * 3 - (x - 2));

          this.dataService.items.set([num1, num2, num3].toString(), {values: [num1, num2, num3], jetonAmount: 0, payoutFactor: 11})
        } else {
          let num1 = ((y + 1) * 3 - x);
          let num2 = ((y + 1) * 3 - (x + 1));

          this.dataService.items.set([num1, num2].toString(), {values: [num1, num2], jetonAmount: 0, payoutFactor: 17})
        }
      }
    }

    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 12 - 1; y++) {
        let num1 = ((y + 1) * 3 - x);
        let num2 = ((y + 2) * 3 - x);

        this.dataService.items.set([num1, num2].toString(), {values: [num1, num2], jetonAmount: 0, payoutFactor: 17})
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

          this.dataService.items.set([num1, num2, num3, num4, num5, num6].toString(), {
            values: [num1, num2, num3, num4, num5, num6],
            jetonAmount: 0,
            payoutFactor: 5
          })
        } else {
          let num1 = ((y + 1) * 3 - x);
          let num2 = ((y + 1) * 3 - (x + 1));
          let num3 = ((y + 2) * 3 - x);
          let num4 = ((y + 2) * 3 - (x + 1));

          this.dataService.items.set([num1, num2, num3, num4].toString(), {
            values: [num1, num2, num3, num4],
            jetonAmount: 0,
            payoutFactor: 8
          })
        }

      }
    }

    this.dataService.items.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].toString(), {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      jetonAmount: 0,
      payoutFactor: 2
    })
    this.dataService.items.set([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].toString(), {
      values: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      jetonAmount: 0,
      payoutFactor: 2
    })
    this.dataService.items.set([25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].toString(), {
      values: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
      jetonAmount: 0,
      payoutFactor: 2
    })

    this.dataService.items.set([3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].toString(), {
      values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
      jetonAmount: 0,
      payoutFactor: 2
    })
    this.dataService.items.set([2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].toString(), {
      values: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
      jetonAmount: 0,
      payoutFactor: 2
    })
    this.dataService.items.set([1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].toString(), {
      values: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
      jetonAmount: 0,
      payoutFactor: 2
    })

    this.dataService.items.set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].toString(), {
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
      jetonAmount: 0,
      payoutFactor: 1
    })
    this.dataService.items.set([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36].toString(), {
      values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
      jetonAmount: 0,
      payoutFactor: 1
    })
    this.dataService.items.set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].toString(), {
      values: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36],
      jetonAmount: 0,
      payoutFactor: 1
    })
    this.dataService.items.set([2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].toString(), {
      values: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35],
      jetonAmount: 0,
      payoutFactor: 1
    })
    this.dataService.items.set([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35].toString(), {
      values: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35],
      jetonAmount: 0,
      payoutFactor: 1
    })
    this.dataService.items.set([19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36].toString(), {
      values: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
      jetonAmount: 0,
      payoutFactor: 1
    })


    // for (let key of this.dataService.items.keys()) {
    //   console.log(key)
    // }
    //
    // for (let value of this.dataService.items.values()) {
    //   console.log(value.values)
    // }

  }

  add(numbers: number[]) {
    if (this.dataService.currentJeton > this.dataService.currentMoney) {
      alert("Sie besitzten nicht genügend Jetons!");
      return
    }

    this.dataService.socket.emit("add", ({
      name: this.dataService.name,
      itemName: numbers.toString(),
      amount: this.dataService.currentJeton
    }))
  }

  addNew(event: Event, numbers: number[]) {
    event.stopPropagation();

    this.add(numbers);
  }

  x1(x: number, y: number, event: Event) {
    event.stopPropagation();

    if (x == 2) {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x - 1));
      let num3 = ((y + 1) * 3 - (x - 2));

      this.add([num1, num2, num3]);
    } else {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x + 1));

      this.add([num1, num2]);
    }
    this.isBetweenBetExistent = true;
  }

  x2(x: number, y: number, event: Event) {
    event.stopPropagation();

    let num1 = ((y + 1) * 3 - x);
    let num2 = ((y + 2) * 3 - x);

    this.add([num1, num2]);
    this.isBetweenBetExistent = true;
  }

  x3(x: number, y: number, event: Event) {
    event.stopPropagation();

    if (x == 2) {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x - 1));
      let num3 = ((y + 1) * 3 - (x - 2));
      let num4 = ((y + 2) * 3 - x);
      let num5 = ((y + 2) * 3 - (x - 1));
      let num6 = ((y + 2) * 3 - (x - 2));

      this.add([num1, num2, num3, num4, num5, num6]);
    } else {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x + 1));
      let num3 = ((y + 2) * 3 - x);
      let num4 = ((y + 2) * 3 - (x + 1));

      this.add([num1, num2, num3, num4]);
    }
    this.isBetweenBetExistent = true;
  }

  handleInvisible1Click(x: number, y: number, event?: Event): number[] {
    if (event !== undefined) event.stopPropagation();

    if (x == 2) {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x - 1));
      let num3 = ((y + 1) * 3 - (x - 2));

      return [num1, num2, num3];
    } else {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x + 1));

      return [num1, num2];
    }
  }

  handleInvisible2Click(x: number, y: number, event?: Event): number[] {
    if (event !== undefined) event.stopPropagation();

    let num1 = ((y + 1) * 3 - x);
    let num2 = ((y + 2) * 3 - x);

    return [num1, num2];
  }

  handleInvisible3Click(x: number, y: number, event?: Event): number[] {
    if (event !== undefined) event.stopPropagation();

    if (x == 2) {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x - 1));
      let num3 = ((y + 1) * 3 - (x - 2));
      let num4 = ((y + 2) * 3 - x);
      let num5 = ((y + 2) * 3 - (x - 1));
      let num6 = ((y + 2) * 3 - (x - 2));

      return [num1, num2, num3, num4, num5, num6];
    } else {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x + 1));
      let num3 = ((y + 2) * 3 - x);
      let num4 = ((y + 2) * 3 - (x + 1));

      return [num1, num2, num3, num4];
    }
  }

  get(numbers: number[]): Item {
    return this.dataService.items.get(numbers.toString())!;
  }

  delete() {
    for (let value of this.dataService.items.values()) {
      value.jetonAmount = 0;
    }
    this.isBetweenBetExistent = false;
  }


}

export type Item = {
  values: number[],
  payoutFactor: number,
  jetonAmount: number
}
