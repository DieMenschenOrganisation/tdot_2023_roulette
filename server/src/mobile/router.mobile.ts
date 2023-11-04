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

        this.app.use(express.static(path.join(__dirname, '/../../../mobile/dist/mobile')));
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '/../../../mobile/dist/mobile/index.html'));
            res.end()
        });

        this.app.use(express.static(path.join(__dirname, '/../../../main/dist/main')));
        this.app.get('/main', (req, res) => {
            res.sendFile(path.join(__dirname, '/../../../main/dist/main/index.html'));
            res.end()
        });

        ServiceMobile.getInstanz().countdownAndDoSomething().then();

        this.socketIO.on("connection", (ws) => {
            console.log("connected: " + ws);
            ws.emit("joined", {message: "user connected successfully"})

            ws.on("server", () => {
                ServiceMobile.getInstanz().serverWS = ws;
            })

            ws.on("initData", (name: { name: string }) => {
                console.log(name)
                ServiceMobile.getInstanz().login(name.name, ws);

                ws.emit("startData", ({
                    money: ServiceMobile.getInstanz().getMoneyOfPlayer(name.name),
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
                if (status == Success.success) ws.emit("added", ({itemName: data.itemName, amount: data.amount}))
            })

        })

        this.server.listen(this.port, () => {
            console.log("backend booted successful on port: " + this.port);
        })
    }
}