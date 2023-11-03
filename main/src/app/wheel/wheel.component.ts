import {Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss']
})
export class WheelComponent {

  @ViewChild("inner") inner!: ElementRef;
  @ViewChild("ball") ball!: ElementRef;

  lastWheelRotation = 0;
  lastBallRotation = 0;

  list = [0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23, 8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32]

  start(number: number) {
    let nativeElement = this.inner.nativeElement as HTMLElement;
    let ball = this.ball.nativeElement as HTMLElement;

    let idx = this.list.indexOf(number);
    let base = ((360 / 37) * idx) - 0.5;

    let rand = Math.random() * 360

    nativeElement.animate([{transform: `rotateZ(${this.lastWheelRotation}deg)`}, {transform: `rotateZ(${rand + (360 * 3)}deg)`}], {
      duration: 6000,
      iterations: 1,
      easing: "ease-in-out",
      fill: "forwards"
    })

    ball.animate([{transform: `rotateZ(${this.lastBallRotation}deg) translateY(-250px)`}, {transform: `rotateZ(-${-rand + base + (360 * 3)}deg) translateY(-130px)`}], {
      duration: 6500,
      iterations: 1,
      easing: "ease-in-out",
      fill: "forwards"
    })

    this.lastWheelRotation = rand;
    this.lastBallRotation = rand - base;
  }
}
