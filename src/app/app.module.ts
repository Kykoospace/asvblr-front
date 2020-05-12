import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
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
  CalendarModule, CheckboxModule,
  DropdownModule,
  GalleriaModule, InputTextareaModule,
  InputTextModule,
  MegaMenuModule, MenuModule,
  RadioButtonModule, SpinnerModule,
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
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';

import { ConfigService } from './shared/services/config/config.service';
import { map } from 'rxjs/operators';

function loadConfiguration(
  http: HttpClient,
  configService: ConfigService
) {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (a: boolean) => void): void => {
      http.get<any>('assets/config/config.json')
        .pipe(
          map(config => {
            configService.apiBaseUrl = config.apiBaseUrl;
            resolve(true);
          })).subscribe();
    });
  };
}

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
    LoginComponent,
    LogoutComponent
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
    DropdownModule,
    CheckboxModule,
    SpinnerModule,
    InputTextareaModule,
    MenuModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
