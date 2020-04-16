import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeersComponent } from './beers/beers.component';

import { BeerService } from './services/beer.service';


@NgModule({
  declarations: [
    AppComponent,
    BeersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [BeerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
