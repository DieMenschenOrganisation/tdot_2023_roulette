import {Injectable} from '@angular/core';
import {connect, Socket} from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
    this.socket = connect("http://localhost:3000");

    this.socket.on("joined", (message: {message: string}) => {
      console.log(message.message);
    })
  }

  socket: Socket;

  currentJetonImg: string = "";
  currentJeton: number = 1;
  currentMoney: number = 800;

}
