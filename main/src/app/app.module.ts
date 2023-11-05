import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WheelComponent } from './wheel/wheel.component';
import { TableComponent } from './table/table.component';
import {NgForOf, NgIf} from "@angular/common";
import {JetonComponent} from "./jeton/jeton.component";

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    TableComponent,
    JetonComponent
  ],
  imports: [
    BrowserModule,
    NgForOf,
    NgIf
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
