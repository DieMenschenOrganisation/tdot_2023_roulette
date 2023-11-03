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

  start() {
    let nativeElement = this.inner.nativeElement as HTMLElement;
    let ball = this.ball.nativeElement as HTMLElement;

    let idx = 5;
    let base = ((360 / 37) * idx) - 0.5;

    let rand = Math.random() * 360

    nativeElement.animate([{transform: `rotateZ(${this.lastWheelRotation}deg)`}, {transform: `rotateZ(${rand + (360 * 3)}deg)`}], {
      duration: 5000,
      iterations: 1,
      easing: "ease-in-out",
      fill: "forwards"
    })

    ball.animate([{transform: `rotateZ(${this.lastBallRotation}deg) translateY(-250px)`}, {transform: `rotateZ(-${-rand + base + (360 * 3)}deg) translateY(-130px)`}], {
      duration: 5500,
      iterations: 1,
      easing: "ease-in-out",
      fill: "forwards"
    })

    this.lastWheelRotation = rand;
    this.lastBallRotation = rand - base;
  }
}
