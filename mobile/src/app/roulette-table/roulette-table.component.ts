import {Component} from '@angular/core';
import {HandleClicksService} from "../jeton/handle-clicks.service";

@Component({
  selector: 'app-roulette-table',
  templateUrl: './roulette-table.component.html',
  styleUrls: ['./roulette-table.component.scss']
})
export class RouletteTableComponent {

  constructor(public handleClick: HandleClicksService) {
  }

  redNumbers: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  isRedNumber(number: number): boolean {
    return this.redNumbers.includes(number);
  }

}
