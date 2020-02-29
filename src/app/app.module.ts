import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './main/home/home.component';
import { StatsComponent } from './management/stats/stats.component';
import { MainComponent } from './main/main.component';
import { ManagementComponent } from './management/management.component';
import { ButtonModule } from 'primeng';
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
import { CoachesComponent } from './management/coaches/coaches.component';
import { SeasonsComponent } from './management/seasons/seasons.component';
import { UsersComponent } from './management/users/users.component';
import { SettingsComponent } from './management/settings/settings.component';
import { HelpComponent } from './management/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatsComponent,
    MainComponent,
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
    CoachesComponent,
    SeasonsComponent,
    UsersComponent,
    SettingsComponent,
    HelpComponent
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
