import http from "http";
import express from 'express';
import cors from 'cors';
import {Server} from "socket.io";
import {ServiceMobile} from "./service.mobile";
import {ErrorMSG, Success} from "./utils";

export class RouterMobile {
    app = express();
    server = http.createServer(this.app);
    socketIO = new Server(this.server, {cors: {origin: true}});
    port = 3000;

    private serviceMobile: ServiceMobile = new ServiceMobile();

    remainingTime: number = 0;
    async countdownAndDoSomething() {
        for (let i = 30; i >= 0; i--) {
            console.log(`Noch ${i} Sekunden`);
            this.remainingTime = i;
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.socketIO.emit("remainingTime", i)
        }

        this.socketIO.emit("running");

        await new Promise(resolve => setTimeout(resolve, 15000));
        console.log(this.getRandomNumber(0, 36))

        this.socketIO.emit("runnable");
        this.countdownAndDoSomething().then();
    }

    getRandomNumber(min: number, max: number): number {
        const randomDecimal = Math.random();

        const randomNumber = Math.floor(randomDecimal * (max - min + 1)) + min;

        return randomNumber;
    }

    constructor() {
        this.app.use(cors());
        this.countdownAndDoSomething().then(r => {});

        this.socketIO.on("connection", (ws) => {
            console.log("connected: " + ws);
            ws.emit("joined", {message: "user connected successfully"})

            ws.on("initData", (name: { name: string }) => {
                this.serviceMobile.login(name.name);

                ws.emit("startData", ({money: this.serviceMobile.getMoneyOfPlayer(name.name), remainingTime: this.remainingTime}));
            })

            ws.on("add", (data: { name: string, itemName: string, amount: number }) => {
                let status = this.serviceMobile.add(data.name, data.itemName, data.amount);

                if (status == ErrorMSG.error) ws.emit("error", ErrorMSG.error);
                if (status == ErrorMSG.notEnoughMoney) ws.emit("error", ErrorMSG.notEnoughMoney);
                if (status == Success.success) ws.emit("added", ({itemName: data.itemName, amount: data.amount}))
            })

        })

        this.server.listen(this.port, () => {
            console.log("backend booted successful on port: " + this.port);
        })
    }
}