import {Component, ViewChild} from '@angular/core';
import {WheelComponent} from "./wheel/wheel.component";
import {connect, Socket} from "socket.io-client";
import {DataService, Item} from "./data.service";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  socket: Socket;

  constructor(public data: DataService) {
    this.socket = connect(environment.apiURL);

    this.socket.emit("server");

    this.socket.on("number", (data: {randNum: number}) => {
      this.data.active = true;
      console.log(data.randNum)

      this.spinWheel(data.randNum);
    })

    this.socket.on("table", (data: {jetons: number, itemName: string}) => {
      this.data.items.get(data.itemName)!.jetonAmount += data.jetons
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
