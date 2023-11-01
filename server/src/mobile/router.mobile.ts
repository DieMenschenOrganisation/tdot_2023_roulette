import http from "http";
import express from 'express';
import cors from 'cors';
import {Server} from "socket.io";

export class RouterMobile {
    app = express();
    server = http.createServer(this.app);
    socketIO = new Server(this.server, {cors: {origin: true}});
    port = 3000;


    constructor() {
        this.app.use(cors());

        this.socketIO.on("connection", (ws) => {
            console.log("connected: " + ws);

            ws.emit("joined", {message: "passed"})
        })

        this.server.listen(this.port, () => {
            console.log("backend booted successful on port: " + this.port);
        })
    }
}