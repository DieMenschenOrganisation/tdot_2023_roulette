import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-jeton',
  templateUrl: './jeton.component.html',
  styleUrls: ['./jeton.component.scss']
})
export class JetonComponent implements OnChanges{

  @Input() jetonAmount: number = 0;

  jeton1: string = "../../assets/jeton1.png";
  jeton5: string = "../../assets/jeton5.png";
  jeton10: string = "../../assets/jeton10.png";
  jeton25: string = "../../assets/jeton25.png";
  jeton50: string = "../../assets/jeton50.png";
  jeton100: string = "../../assets/jeton100.png";
  jeton500: string = "../../assets/jeton500.png";

  activeImg: string = "../../assets/jeton1.png";

  ngOnChanges(changes: SimpleChanges): void {
    if (this.jetonAmount == 0) return

    if (this.jetonAmount < 5) {
      this.activeImg = this.jeton1;
    } else if (this.jetonAmount < 10) {
      this.activeImg = this.jeton5;
    } else if (this.jetonAmount < 25) {
      this.activeImg = this.jeton10;
    } else if (this.jetonAmount < 50) {
      this.activeImg = this.jeton25;
    } else if (this.jetonAmount < 100) {
      this.activeImg = this.jeton50;
    } else if (this.jetonAmount < 500) {
      this.activeImg = this.jeton100;
    } else {
      this.activeImg = this.jeton500;
    }
  }
}
