import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, Inject, LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
import localeFr from '@angular/common/locales/fr';
import { map } from 'rxjs/operators';
import { registerLocaleData } from '@angular/common';
import { SafePipeModule } from 'safe-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ClubComponent } from './main/club/club.component';
import { SubscriptionComponent
    as SubscriptionMainComponent} from './main/subscription/subscription.component';
import { GalleryComponent } from './main/gallery/gallery.component';
import { ContactComponent } from './main/contact/contact.component';

import { ManagementComponent } from './management/management.component';
import {
  ButtonModule,
  CalendarModule, CheckboxModule, ConfirmationService, ConfirmDialogModule, DialogModule,
  DropdownModule, EditorModule, FileUploadModule,
  GalleriaModule, InplaceModule, InputSwitchModule, InputTextareaModule,
  InputTextModule,
  MegaMenuModule, MenuModule, MessageService, ProgressSpinnerModule,
  RadioButtonModule, SelectButtonModule, SpinnerModule,
  TableModule,
  TabMenuModule, TabViewModule, ToastModule, ToggleButtonModule,
  ToolbarModule, TooltipModule
} from 'primeng';
import { ArticlesComponent } from './management/articles/articles.component';
import { InformationsComponent } from './management/informations/informations.component';
import { GymnasiumsComponent } from './management/gymnasiums/gymnasiums.component';
import { SchedulesComponent } from './management/schedules/schedules.component';
import { SubscriptionsComponent } from './management/subscriptions/subscriptions.component';
import { SubscriptionComponent
    as SubscriptionManagementComponent } from './management/subscriptions/subscription/subscription.component';
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
import { DevToolsComponent } from './management/dev-tools/dev-tools.component';
import { ArticleComponent } from './management/articles/article/article.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { SubscriptionFormComponent } from './shared/components/subscription-form/subscription-form.component';
import { PlayerCardComponent } from './shared/components/player-card/player-card.component';
import { UserCardComponent } from './shared/components/user-card/user-card.component';
import {LoadingScreenInterceptor} from './shared/interceptors/loading-screen.interceptor';

registerLocaleData(localeFr);

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
            configService.apiGouvBaseUrl = config.apiGouvBaseUrl;
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
    SubscriptionMainComponent,
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
    LogoutComponent,
    SubscriptionManagementComponent,
    DevToolsComponent,
    ArticleComponent,
    LoadingComponent,
    SubscriptionFormComponent,
    PlayerCardComponent,
    UserCardComponent,
    LoadingComponent
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
    MenuModule,
    ToastModule,
    SelectButtonModule,
    FormsModule,
    TabViewModule,
    FileUploadModule,
    ConfirmDialogModule,
    ProgressSpinnerModule,
    EditorModule,
    InplaceModule,
    DialogModule,
    InputSwitchModule,
    TooltipModule,
    ToggleButtonModule,
    SafePipeModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      provide: APP_INITIALIZER,
      useFactory: loadConfiguration,
      deps: [
        HttpClient,
        ConfigService
      ],
      multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    },
    MessageService,
    ConfirmationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
    @Inject(LOCALE_ID) locale: string
  ) {
    console.log(locale);
  }
}
