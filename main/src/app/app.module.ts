import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WheelComponent } from './wheel/wheel.component';
import { TableComponent } from './table/table.component';
import {NgForOf, NgIf} from "@angular/common";
import {JetonComponent} from "./jeton/jeton.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    WheelComponent,
    TableComponent,
    JetonComponent,
  ],
  imports: [
    BrowserModule,
    NgForOf,
    NgIf,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
