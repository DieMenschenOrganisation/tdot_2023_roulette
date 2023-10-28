import { Component } from '@angular/core';
import {DataService} from "../data.service";

@Component({
  selector: 'app-jeton',
  templateUrl: './jeton.component.html',
  styleUrls: ['./jeton.component.scss']
})
export class JetonComponent {

  constructor(public dataService: DataService) {
  }

  currentJetonImg: string = "";

  clicked() {
    this.currentJetonImg = this.dataService.currentJetonImg;
  }

}
