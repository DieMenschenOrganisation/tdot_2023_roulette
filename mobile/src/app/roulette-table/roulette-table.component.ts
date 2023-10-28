import {Component} from '@angular/core';
import {DataService, PayOutType} from "../data.service";

@Component({
  selector: 'app-roulette-table',
  templateUrl: './roulette-table.component.html',
  styleUrls: ['./roulette-table.component.scss']
})
export class RouletteTableComponent {

  constructor(public dataService: DataService) {
  }

  redNumbers: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  isRedNumber(number: number): boolean {
    return this.redNumbers.includes(number);
  }
  handleOuterClick(event: Event, numbers: number[]) {
    switch (numbers.length) {
      case 12: {
        this.dataService.clicked(numbers, PayOutType.twelve);
        break
      }
      case 18: {
        this.dataService.clicked(numbers, PayOutType.eighteen);
        break
      }
    }
  }
  handleNumberClick(event: Event, number: number) {
    this.dataService.clicked([number], PayOutType.number)

    //todo log for zero, double zero, and merges
  }

  handleInvisible1Click(event: Event, x: number, y: number) {
    event.stopPropagation();

    if (x == 2) {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x - 1));
      let num3 = ((y + 1) * 3 - (x - 2));

      this.dataService.clicked([num1, num2, num3], PayOutType.threeNumber)
    } else {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x + 1));

      this.dataService.clicked([num1, num2], PayOutType.twoNumber)
    }
  }

  handleInvisible2Click(event: Event, x: number, y: number) {
    event.stopPropagation();

    let num1 = ((y + 1) * 3 - x);
    let num2 = ((y + 2) * 3 - x);

    this.dataService.clicked([num1, num2], PayOutType.twoNumber)
  }

  handleInvisible3Click(event: Event, x: number, y: number) {
    event.stopPropagation();

    if (x == 2) {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x - 1));
      let num3 = ((y + 1) * 3 - (x - 2));
      let num4 = ((y + 2) * 3 - x);
      let num5 = ((y + 2) * 3 - (x - 1));
      let num6 = ((y + 2) * 3 - (x - 2));

      this.dataService.clicked([num1, num2, num3, num4, num5, num6], PayOutType.sixNumber)
    } else {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x + 1));
      let num3 = ((y + 2) * 3 - x);
      let num4 = ((y + 2) * 3 - (x + 1));

      this.dataService.clicked([num1, num2, num3, num4], PayOutType.fourNumber)
    }
  }

}
