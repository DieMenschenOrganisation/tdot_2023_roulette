import {Component, HostListener, OnInit} from '@angular/core';
import {DataService} from "./data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLandscape: boolean = window.innerWidth > window.innerHeight;

  constructor(public dataService: DataService, private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const userID = params["userID"];

      if (userID) {
        console.log("name:" + userID);

        this.httpClient.get(environment.apiURL + "/user/" + userID).subscribe({
          next: res => {
            this.dataService.name = userID;
            this.dataService.start();
          }
        })
      }
    })

    this.checkOrientation();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkOrientation();
  }

  checkOrientation() {
    this.isLandscape = window.innerWidth > window.innerHeight;
  }
}
