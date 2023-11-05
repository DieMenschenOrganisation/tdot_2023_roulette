import {Injectable} from '@angular/core';
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class HandleClicksService {

  betweenBetsEnabled: boolean = false;
  isBetweenBetExistent: boolean = false;

  constructor(private dataService: DataService) {
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
    console.log(numbers)
    console.log(this.dataService.items.get(numbers.toString()))
    return this.dataService.items.get(numbers.toString())!;
  }

}

export type Item = {
  values: number[],
  payoutFactor: number,
  jetonAmount: number
}
