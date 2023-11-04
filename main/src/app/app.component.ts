import {Component, ViewChild} from '@angular/core';
import {WheelComponent} from "./wheel/wheel.component";
import {connect, Socket} from "socket.io-client";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  socket: Socket;
  constructor() {
    this.socket = connect("http://localhost:3000");

    this.socket.emit("server");

    this.socket.on("number", (data: {randNum: number, items: any}) => {
      console.log(data.randNum)

      const receivedData = JSON.parse(data.items);

      const map = new Map(
        Array.from(receivedData, ([outerKey, innerArray]) => {
          const innerMap = new Map(innerArray);
          return [outerKey, innerMap];
        })
      );

      console.log(map)

      this.spinWheel(data.randNum);
    })
  }

  @ViewChild(WheelComponent) wheelComponent!: WheelComponent;

  spinWheel(number: number) {
    this.wheelComponent.start(number);
  }

}
