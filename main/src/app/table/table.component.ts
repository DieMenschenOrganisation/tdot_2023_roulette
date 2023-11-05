import { Component } from '@angular/core';
import {HandleClicksService} from "../jeton/handle-clicks.service";
import {DataService} from "../data.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  constructor(public handleClick: HandleClicksService, public data: DataService) {
  }

  redNumbers: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  isRedNumber(number: number): boolean {
    return this.redNumbers.includes(number);
  }

}
