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

    socket!: Socket;
    authenticated: boolean = false;

    reqPassword() {
        return prompt("enter admin-password:");
    }

    constructor(public data: DataService) {
        let pass = this.reqPassword();

        this.socket = connect(environment.apiURL);
        this.socket.emit("server", (pass));

        this.socket.on("wrongPassword", () => {
            console.log("falsches passwort");

            let pass = this.reqPassword();
            this.socket.emit("server", (pass))
        })

        this.socket.on("correctPassword", () => {
            this.authenticated = true;
        })

        this.socket.on("number", (data: { randNum: number }) => {
            this.data.active = true;
            console.log(data.randNum)

            this.spinWheel(data.randNum);
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
        })
    }

    @ViewChild(WheelComponent) wheelComponent!: WheelComponent;

    spinWheel(number: number) {
        this.wheelComponent.start(number);
    }

}
