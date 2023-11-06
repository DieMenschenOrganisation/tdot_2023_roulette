import http from "http";
import express from 'express';
import cors from 'cors';
import {Server} from "socket.io";
import {ErrorMSG, Success} from "./utils";
import {ServiceMobile} from "./service.mobile";
import path from "path";

export class RouterMobile {
    app = express();
    server = http.createServer(this.app);
    socketIO = new Server(this.server, {cors: {origin: true}});
    port = 3000;

    constructor() {
        this.app.use(cors());

        this.app.use("/mobile", express.static(path.join(__dirname, '/../../../mobile/dist/mobile')));
        this.app.use("/main", express.static(path.join(__dirname, '/../../../main/dist/main')));

        this.app.use("/assets", express.static(path.join(__dirname, "/../../../assets")))

        ServiceMobile.getInstanz().countdownAndDoSomething().then();

        this.socketIO.on("connection", (ws) => {
            console.log("connected: " + ws.id);

            ws.emit("joined", {message: "user connected successfully"})

            ws.on("server", (password: string) => {
                if (ServiceMobile.getInstanz().checkPassword(password)) {
                    ServiceMobile.getInstanz().serverWS = ws;
                    ws.emit("correctPassword");
                } else {
                    ws.emit("wrongPassword");
                }

                //todo on connect send fullMap
            })

            ws.on("initData", (name: { name: string }) => {
                console.log(name)
                ServiceMobile.getInstanz().login(name.name, ws);

                ws.emit("startData", ({
                    money: ServiceMobile.getInstanz().getMoneyOfPlayer(name.name),
                    items: JSON.stringify(Array.from(ServiceMobile.getInstanz().items.get(name.name)!.entries())),
                    remainingTime: ServiceMobile.getInstanz().remainingTime
                }));
            })

            ws.on("delete", (name: string) => {
                console.log("del")
                ServiceMobile.getInstanz().delete(name);

                ws.emit("deleted", (ServiceMobile.getInstanz().getMoneyOfPlayer(name)))
            })

            ws.on("add", (data: { name: string, itemName: string, amount: number }) => {
                let status = ServiceMobile.getInstanz().add(data.name, data.itemName, data.amount);

                if (status == ErrorMSG.notEnoughMoney) ws.emit("error", ErrorMSG.notEnoughMoney);
                if (status == ErrorMSG.error) ws.emit("error", ErrorMSG.error);
                if (status == Success.success) {
                    ws.emit("added", ({itemName: data.itemName, amount: data.amount}))
                }
            })

        })

        this.server.listen(this.port, () => {
            console.log("backend booted successful on port: " + this.port);
        })
    }
}