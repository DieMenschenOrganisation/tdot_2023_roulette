import {Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {HandleClicksService} from "../jeton/handle-clicks.service";

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit{

  constructor(public dataService: DataService, public handleClick: HandleClicksService) {
  }

  formatTime() {
    return this.dataService.remainingTime === 1 ? 'Sekunde' : 'Sekunden';
  }

  jetons: number[] = [1, 5, 10, 25, 50, 100, 500];
  currentJetonIdx: number = 0;

  previous() {
    this.currentJetonIdx--;
    this.setImgAndVal();
  }

  next() {
    this.currentJetonIdx++;
    this.setImgAndVal();
  }

  setImgAndVal() {
    this.dataService.currentJeton = this.jetons[this.currentJetonIdx];

    this.dataService.currentJetonImg = "../../assets/jeton" + this.dataService.currentJeton + ".png"
  }

  ngOnInit(): void {
    this.dataService.currentJetonImg = "../../assets/jeton" + this.dataService.currentJeton + ".png";
  }

  toggle() {
    if (!this.handleClick.betweenBetsEnabled) {
      alert("Achtung! Ab jetzt können Sie auf mehrere Felder setzen. Möglicherweise müssen Sie dafür zoomen. Viel Spaß!")
    } else {
      alert("Achtung! Ab jetzt können Sie NICHT mehr auf mehrere Felder setzen. Viel Spaß!")
    }
    this.handleClick.betweenBetsEnabled = !this.handleClick.betweenBetsEnabled
  }
}
