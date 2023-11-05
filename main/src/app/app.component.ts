import {Component, ViewChild} from '@angular/core';
import {WheelComponent} from "./wheel/wheel.component";
import {connect, Socket} from "socket.io-client";
import {DataService, Item} from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  socket: Socket;

  constructor(public data: DataService) {
    this.socket = connect("http://localhost:3000");

    this.socket.emit("server");

    this.socket.on("number", (data: {randNum: number}) => {
      this.data.active = true;
      console.log(data.randNum)

      this.spinWheel(data.randNum);
    })

    this.socket.on("table", (data: {items: any}) => {
      const receivedData = JSON.parse(data.items);

      let map = new Map(
        Array.from(receivedData, ([outerKey, innerArray]) => {
          const innerMap: Map<string, Item> = new Map(innerArray);
          return [outerKey, innerMap];
        })
      );

      for (let [inner, outer] of map) {
        console.log(inner)
        for (let [i1, o1] of outer) {
          console.log(i1)
          console.log(o1)
        }
      }

      this.data.split(map)
    })

    this.socket.on("end", () => {
      this.data.delete();
    })
  }

  @ViewChild(WheelComponent) wheelComponent!: WheelComponent;

  spinWheel(number: number) {
    this.wheelComponent.start(number);
  }

}
