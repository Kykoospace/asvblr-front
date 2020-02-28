import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { StatsComponent } from './management/stats/stats.component';
import { MainComponent } from './main/main.component';
import { ManagementComponent } from './management/management.component';
import { ButtonModule } from 'primeng';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatsComponent,
    MainComponent,
    ManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
