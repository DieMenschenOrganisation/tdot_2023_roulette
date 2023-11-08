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
        this.app.use(express.json())

        this.app.post("/auth", (req, res) => {
            const userEnteredPassword = req.body.password;
            console.log(userEnteredPassword)

            if (ServiceMobile.getInstanz().checkPassword(userEnteredPassword)) {
                res.status(200);
                res.end()
            } else {
                res.status(401).send("wrong password")
                res.end()
            }
        })

        this.app.get("/user/:userID", async (req, res) => {
            let userID = req.params.userID;
            console.log("anfrage")
            console.log(userID)

            let response = await ServiceMobile.getInstanz().doesPlayerExists(userID);

            console.log("bool: " + response)

            if (response) {
                res.status(200).send({msg: "accepted"});
                res.end()
            } else {
                res.status(401).send({msg: "user does not exist"})
                res.end()
            }
        })

        this.app.use("/mobile", express.static(path.join(__dirname, '/../../../mobile/dist/mobile')));
        this.app.use("/main", express.static(path.join(__dirname, '/../../../main/dist/main')));

        this.app.use("/assets", express.static(path.join(__dirname, "/../../../assets")))

        ServiceMobile.getInstanz().countdownAndDoSomething().then();

        this.socketIO.on("connection", (ws) => {
            console.log("connected: " + ws.id);

            ws.emit("joined", {message: "user connected successfully"})

            ws.on("server", () => {
                ServiceMobile.getInstanz().serverWS = ws;

                //todo on connect send fullMap
            })

            ws.on("initData", async (userID: { userID: string }) => {
                console.log(userID.userID);
                await ServiceMobile.getInstanz().login(userID.userID, ws);

                ws.emit("startData", ({
                    money: ServiceMobile.getInstanz().getMoneyOfPlayer(userID.userID),
                    items: JSON.stringify(Array.from(ServiceMobile.getInstanz().items.get(userID.userID)!.entries())),
                    remainingTime: ServiceMobile.getInstanz().remainingTime
                }));
            })

            ws.on("delete", async (userID: string) => {
                console.log("del")
                await ServiceMobile.getInstanz().delete(userID);

                ws.emit("deleted", (ServiceMobile.getInstanz().getMoneyOfPlayer(userID)))
            })

            ws.on("add", async (data: { userID: string, itemName: string, amount: number }) => {
                let status = await ServiceMobile.getInstanz().add(data.userID, data.itemName, data.amount);


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