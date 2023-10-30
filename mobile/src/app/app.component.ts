import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  isLandscape: boolean = window.innerWidth > window.innerHeight;

  constructor() { }

  ngOnInit() {
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
