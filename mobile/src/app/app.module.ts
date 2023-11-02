import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouletteTableComponent } from './roulette-table/roulette-table.component';
import { CoinComponent } from './coin/coin.component';
import {NgOptimizedImage} from "@angular/common";
import { BlockedComponent } from './blocked/blocked.component';
import { JetonComponent } from './jeton/jeton.component';
import { RunningComponent } from './running/running.component';

@NgModule({
  declarations: [
    AppComponent,
    RouletteTableComponent,
    CoinComponent,
    BlockedComponent,
    JetonComponent,
    RunningComponent,
  ],
  imports: [
    BrowserModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
