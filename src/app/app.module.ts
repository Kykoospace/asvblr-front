import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ClubComponent } from './main/club/club.component';
import { SubscriptionComponent } from './main/subscription/subscription.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { ContactComponent } from './main/contact/contact.component';

import { ManagementComponent } from './management/management.component';
import {
  ButtonModule,
  CalendarModule, DropdownModule,
  GalleriaModule,
  InputTextModule,
  MegaMenuModule,
  RadioButtonModule,
  TableModule,
  TabMenuModule,
  ToolbarModule
} from 'primeng';
import { ArticlesComponent } from './management/articles/articles.component';
import { InformationsComponent } from './management/informations/informations.component';
import { GymnasiumsComponent } from './management/gymnasiums/gymnasiums.component';
import { SchedulesComponent } from './management/schedules/schedules.component';
import { SubscriptionsComponent } from './management/subscriptions/subscriptions.component';
import { PlayersComponent } from './management/players/players.component';
import { TeamsComponent } from './management/teams/teams.component';
import { LicenceComponent } from './management/licence/licence.component';
import { JerseyComponent } from './management/jersey/jersey.component';
import { OfficeComponent } from './management/office/office.component';
import { StatsComponent } from './management/stats/stats.component';
import { CoachesComponent } from './management/coaches/coaches.component';
import { SeasonsComponent } from './management/seasons/seasons.component';
import { UsersComponent } from './management/users/users.component';
import { SettingsComponent } from './management/settings/settings.component';
import { HelpComponent } from './management/help/help.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    ClubComponent,
    SubscriptionComponent,
    GalleryComponent,
    ContactComponent,
    ManagementComponent,
    ArticlesComponent,
    InformationsComponent,
    GymnasiumsComponent,
    SchedulesComponent,
    SubscriptionsComponent,
    PlayersComponent,
    TeamsComponent,
    LicenceComponent,
    JerseyComponent,
    OfficeComponent,
    StatsComponent,
    CoachesComponent,
    SeasonsComponent,
    UsersComponent,
    SettingsComponent,
    HelpComponent,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    TabMenuModule,
    ToolbarModule,
    MegaMenuModule,
    GalleriaModule,
    ReactiveFormsModule,
    RadioButtonModule,
    CalendarModule,
    DropdownModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
