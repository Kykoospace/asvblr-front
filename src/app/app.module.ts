import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, Inject, LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './shared/interceptors/http-error.interceptor';
import localeFr from '@angular/common/locales/fr';
import { map } from 'rxjs/operators';
import {DatePipe, registerLocaleData} from '@angular/common';
import { SafePipeModule } from 'safe-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ClubComponent } from './main/club/club.component';
import { SubscriptionComponent
    as SubscriptionMainComponent} from './main/subscription/subscription.component';
import { ContactComponent } from './main/contact/contact.component';

import { ManagementComponent } from './management/management.component';
import {
  ButtonModule,
  CalendarModule, ChartModule, CheckboxModule, ConfirmationService, ConfirmDialogModule, DialogModule, DialogService,
  DropdownModule, DynamicDialogModule, EditorModule, FileUploadModule,
  GalleriaModule, InplaceModule, InputSwitchModule, InputTextareaModule,
  InputTextModule,
  MegaMenuModule, MenuModule, MessageService, MultiSelectModule, PickListModule, ProgressSpinnerModule,
  RadioButtonModule, RatingModule, SelectButtonModule, SpinnerModule, StepsModule,
  TableModule,
  TabMenuModule, TabViewModule, ToastModule, ToggleButtonModule,
  ToolbarModule, TooltipModule
} from 'primeng';
import { ArticlesComponent } from './management/articles/articles.component';
import { SubscriptionsComponent } from './management/subscriptions/subscriptions.component';
import { SubscriptionComponent
    as SubscriptionManagementComponent } from './management/subscriptions/subscription/subscription.component';
import { PlayersComponent } from './management/players/players.component';
import { TeamsComponent as TeamsMainComponent } from './main/teams/teams.component';
import { TeamsComponent as TeamsManagementComponent } from './management/teams/teams.component';
import { StatsComponent } from './management/stats/stats.component';
import { SeasonsComponent } from './management/seasons/seasons.component';
import { UsersComponent } from './management/users/users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';

import { DevToolsComponent } from './management/dev-tools/dev-tools.component';
import { ArticleComponent } from './management/articles/article/article.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { SubscriptionFormComponent } from './shared/components/subscription-form/subscription-form.component';
import { PlayerCardComponent } from './shared/components/player-card/player-card.component';
import { UserCardComponent } from './shared/components/user-card/user-card.component';
import { LoadingScreenInterceptor } from './shared/interceptors/loading-screen.interceptor';
import { SandboxComponent } from './management/sandbox/sandbox.component';
import { TeamComponent } from './management/teams/team/team.component';
import { DynamicDialogTeamFormComponent } from './shared/components/dynamic-dialog-team-form/dynamic-dialog-team-form.component';
import { DynamicDialogTeamSelectPlayersComponent } from './shared/components/dynamic-dialog-team-select-players/dynamic-dialog-team-select-players.component';
import { TeamCardComponent } from './shared/components/team-card/team-card.component';
import { DynamicDialogTeamEventManagerComponent } from './shared/components/dynamic-dialog-team-event-manager/dynamic-dialog-team-event-manager.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { DynamicDialogCreateUserComponent } from './shared/components/dynamic-dialog-create-user/dynamic-dialog-create-user.component';
import { MailerComponent } from './management/mailer/mailer.component';
import { DynamicDialogSelectUsersComponent } from './shared/components/dynamic-dialog-select-users/dynamic-dialog-select-users.component';
import { TeamPlayersListComponent } from './shared/components/team-players-list/team-players-list.component';
import { DynamicDialogTeamSelectCoachComponent } from './shared/components/dynamic-dialog-team-select-coach/dynamic-dialog-team-select-coach.component';
import { PlayComponent } from './management/play/play.component';
import { CoachComponent } from './management/coach/coach.component';
import { TeamMatchListComponent } from './shared/components/team-match-list/team-match-list.component';
import { TeamMatchCardComponent } from './shared/components/team-match-list/team-match-card/team-match-card.component';
import { DynamicDialogTeamMatchDetailComponent } from './shared/components/dynamic-dialog-team-match-detail/dynamic-dialog-team-match-detail.component';
import { MatchDriveListComponent } from './shared/components/match-drive-list/match-drive-list.component';
import { MatchDriveCardComponent } from './shared/components/match-drive-list/match-drive-card/match-drive-card.component';
import { DynamicDialogTeamPlayerListEditComponent } from './shared/components/dynamic-dialog-team-player-list-edit/dynamic-dialog-team-player-list-edit.component';
import { SubscriptionPaymentModeCardComponent } from './shared/components/subscription-payment-mode-card/subscription-payment-mode-card.component';
import { PricesComponent } from './management/prices/prices.component';
import { UserProfileComponent } from './management/user-profile/user-profile.component';
import { DynamicDialogUsersSelectPresidentComponent } from './shared/components/dynamic-dialog-users-select-president/dynamic-dialog-users-select-president.component';
import { GymnasiumComponent } from './main/gymnasium/gymnasium.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    ClubComponent,
    SubscriptionMainComponent,
    ContactComponent,
    ManagementComponent,
    ArticlesComponent,
    SubscriptionsComponent,
    PlayersComponent,
    TeamsMainComponent,
    TeamsManagementComponent,
    StatsComponent,
    SeasonsComponent,
    UsersComponent,
    LoginComponent,
    LogoutComponent,
    SubscriptionManagementComponent,
    DevToolsComponent,
    ArticleComponent,
    LoadingComponent,
    SubscriptionFormComponent,
    PlayerCardComponent,
    UserCardComponent,
    LoadingComponent,
    SandboxComponent,
    TeamComponent,
    DynamicDialogTeamFormComponent,
    DynamicDialogTeamSelectPlayersComponent,
    TeamCardComponent,
    DynamicDialogTeamEventManagerComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    DynamicDialogCreateUserComponent,
    MailerComponent,
    DynamicDialogSelectUsersComponent,
    TeamPlayersListComponent,
    DynamicDialogTeamSelectCoachComponent,
    PlayComponent,
    CoachComponent,
    TeamMatchListComponent,
    TeamMatchCardComponent,
    DynamicDialogTeamMatchDetailComponent,
    MatchDriveListComponent,
    MatchDriveCardComponent,
    DynamicDialogTeamPlayerListEditComponent,
    SubscriptionPaymentModeCardComponent,
    PricesComponent,
    UserProfileComponent,
    DynamicDialogUsersSelectPresidentComponent,
    GymnasiumComponent
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
    DynamicDialogModule,
    InputSwitchModule,
    TooltipModule,
    ToggleButtonModule,
    SafePipeModule,
    StepsModule,
    MultiSelectModule,
    PickListModule,
    ChartModule,
    RatingModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
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
    ConfirmationService,
    DialogService,
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    DynamicDialogTeamFormComponent,
    DynamicDialogTeamSelectPlayersComponent
  ]
})
export class AppModule {
  constructor(
    @Inject(LOCALE_ID) locale: string
  ) {
    console.log(locale);
  }
}
