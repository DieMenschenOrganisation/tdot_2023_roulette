import {Injectable} from '@angular/core';
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class HandleClicksService {

  betweenBetsEnabled: boolean = false;
  isBetweenBetExistent: boolean = false;

  constructor(private dataService: DataService) {
    this.dataService.items = this.dataService.getItems();
  }

  add(numbers: number[]) {
    if (this.dataService.currentJeton > this.dataService.currentMoney) {
      alert("Sie besitzten nicht genügend Jetons!");
      return
    }

    this.dataService.socket.emit("add", ({
      userID: this.dataService.name,
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
    this.dataService.socket.emit("delete", (this.dataService.name));

    this.isBetweenBetExistent = false;
  }

}

export type Item = {
  values: number[],
  payoutFactor: number,
  jetonAmount: number
}
