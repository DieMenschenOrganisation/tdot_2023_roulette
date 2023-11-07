import {Component, OnInit, ViewChild} from '@angular/core';
import {WheelComponent} from "./wheel/wheel.component";
import {connect, Socket} from "socket.io-client";
import {DataService, Item} from "./data.service";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {hashPassword} from "./utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  socket!: Socket;
  authenticated: boolean = false;

  constructor(public data: DataService, private httpClient: HttpClient) {

  }

  async ngOnInit() {
    this.buildSocketIoConnection()
    this.authenticated = true

    // let password = prompt("enter admin-password:");
    // password = password == null ? "" : password;
    //
    // let passwordHash = await hashPassword(password);
    //
    // this.httpClient.post<void>(environment.apiURL + "/auth", {password: password}, {responseType: "text" as 'json'}).subscribe({
    //   next: res => {
    //     console.log("ok")
    //
    //     this.authenticated = true
    //     this.buildSocketIoConnection();
    //   },
    //   error: err => {
    //     console.log("err")
    //   }
    // })
  }

  formatTime() {
    return this.data.remainingTime === 1 ? 'Sekunde' : 'Sekunden';
  }
  buildSocketIoConnection() {
    this.socket = connect(environment.apiURL);
    this.socket.emit("server");

    this.socket.on("number", (data: { randNum: number }) => {
      this.data.active = true;
      console.log(data.randNum)

      this.spinWheel(data.randNum);
    })

    this.socket.on("remainingTime", (i: number) => {
      this.data.remainingTime = i;
    })

    this.socket.on("table", (data: { jetons: number, itemName: string }) => {
      this.data.items.get(data.itemName)!.jetonAmount += data.jetons
    })

    this.socket.on("delete", (items: any) => {
      let map: Map<string, Item> = new Map(JSON.parse(items));
      console.log(map)

      for (let [key, value] of this.data.items) {
        this.data.items.get(key)!.jetonAmount -= map.get(key)!.jetonAmount;
      }
    })

    this.socket.on("end", () => {
      this.data.delete();
      this.data.activeNum = undefined;
    })
  }

  @ViewChild(WheelComponent) wheelComponent!: WheelComponent;

  spinWheel(number: number) {
    this.wheelComponent.start(number);

    setTimeout(() => {
      this.data.activeNum = number;
    }, 6500)
  }


}
