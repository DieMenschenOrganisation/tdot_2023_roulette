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
export class AppComponent implements OnInit {


  isLandscape: boolean = window.innerWidth > window.innerHeight;
  authorized: boolean = false;

  constructor(public dataService: DataService, private route: ActivatedRoute, private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const userID = params["userID"];

      if (userID) {
        this.httpClient.get<string>(environment.apiURL + "/user/" + userID).subscribe({
          next: res => {
            this.authorized = true;
            this.dataService.name = userID;
            this.dataService.start();
          },
          error: err => {
            console.error(err)
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
