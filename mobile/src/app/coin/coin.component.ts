import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.scss']
})
export class CoinComponent implements OnInit{

  jetons: number[] = [1, 5, 10, 25, 50, 100, 500];
  currentJetonIdx: number = 0;
  currentJeton: number = this.jetons[this.currentJetonIdx];

  currentJetonImg: string = "";

  previous() {
    this.currentJetonIdx--;
    this.setImgAndVal();
  }

  next() {
    this.currentJetonIdx++;
    this.setImgAndVal();
  }

  setImgAndVal() {
    this.currentJeton = this.jetons[this.currentJetonIdx];
    this.currentJetonImg = "../../assets/jeton" + this.currentJeton + ".png";
  }

  ngOnInit(): void {
    this.currentJetonImg = "../../assets/jeton" + this.currentJeton + ".png";
  }
}
