import { Component } from '@angular/core';

@Component({
  selector: 'app-roulette-table',
  templateUrl: './roulette-table.component.html',
  styleUrls: ['./roulette-table.component.scss']
})
export class RouletteTableComponent {

  handleNumberClick(event: Event) {
    console.log("number")
  }

  handleInvisible1Click(event: Event) {
    event.stopPropagation();
    console.log("inv1")
  }

  handleInvisible2Click(event: Event) {
    event.stopPropagation();
    console.log("inv2")
  }

  handleInvisible3Click(event: Event) {
    event.stopPropagation();
    console.log("inv3")
  }

}
