import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
