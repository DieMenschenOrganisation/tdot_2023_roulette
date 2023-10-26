import {Component} from '@angular/core';

@Component({
  selector: 'app-roulette-table',
  templateUrl: './roulette-table.component.html',
  styleUrls: ['./roulette-table.component.scss']
})
export class RouletteTableComponent {

  handleNumberClick(event: Event, number: number) {
    console.log(number)

    //todo log for zero, double zero, and merges
  }

  handleInvisible1Click(event: Event, x: number, y: number) {
    event.stopPropagation();

    if (x == 2) {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x - 1));
      let num3 = ((y + 1) * 3 - (x - 2));

      console.log(num1, num2, num3)
    } else {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x + 1));

      console.log(num1, num2)
    }
  }

  handleInvisible2Click(event: Event, x: number, y: number) {
    event.stopPropagation();

    let num1 = ((y + 1) * 3 - x);
    let num2 = ((y + 2) * 3 - x);

    console.log(num1, num2)
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

      console.log(num1, num2, num3, num4, num5, num6)
    } else {
      let num1 = ((y + 1) * 3 - x);
      let num2 = ((y + 1) * 3 - (x + 1));
      let num3 = ((y + 2) * 3 - x);
      let num4 = ((y + 2) * 3 - (x + 1));

      console.log(num1, num2, num3, num4)
    }
  }

}
