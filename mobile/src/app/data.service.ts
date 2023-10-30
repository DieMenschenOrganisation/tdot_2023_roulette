import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  currentJetonImg: string = "";
  currentJeton: number = 1;
  currentMoney: number = 800;

}
