import {Component, HostListener, OnInit} from '@angular/core';
import {DataService} from "./data.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLandscape: boolean = window.innerWidth > window.innerHeight;

  constructor(public dataService: DataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const name = params["name"];

      if (name) {
        console.log("name:" + name);

        this.dataService.name = name;

        this.dataService.start();
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
