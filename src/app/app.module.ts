import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DisplayComponent } from './display/display.component';
import {DisplayService }  from './display.service';
import { FilterboxComponent } from './filterbox/filterbox.component';
import { UsersComponent } from './users/users.component';
import { UseridComponent } from './userid/userid.component';
import {  NgxPaginationModule } from 'ngx-pagination';
import { EvntsComponent } from './evnts/evnts.component';
import { DateComponent } from './date/date.component';
import { StatusComponent } from './status/status.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DisplayComponent,
    FilterboxComponent,
    UsersComponent,
    UseridComponent,
    EvntsComponent,
    DateComponent,
    StatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
