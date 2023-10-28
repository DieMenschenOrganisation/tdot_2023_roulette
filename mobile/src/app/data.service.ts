import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  currentJetonImg: string = "";
  currentJeton: number = 1;

  clicked(numbers: number[], type: PayOutType) {
    console.log(numbers)
    console.log(PayOutType[type])
  }

  func() {
    console.log("geht")
  }
}

export enum PayOutType {
  number,
  twoNumber,
  threeNumber,
  fourNumber,
  sixNumber,
  twelve,
  eighteen
}
