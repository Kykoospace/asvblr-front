// Angular imports :
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components import :
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ManagementComponent } from './management/management.component';
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
import { StatsComponent } from './management/stats/stats.component';
import { UsersComponent } from './management/users/users.component';
import { SettingsComponent } from './management/settings/settings.component';
import { HelpComponent } from './management/help/help.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }
    ]
  },
  { path: 'management', component: ManagementComponent,
    children: [
      { path: '', redirectTo: 'stats', pathMatch: 'full' },
      { path: 'articles', component: ArticlesComponent },
      { path: 'informations', component: InformationsComponent },
      { path: 'gymnasiums', component: GymnasiumsComponent },
      { path: 'schedules', component: SchedulesComponent },
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'players', component: PlayersComponent },
      { path: 'teams', component: TeamsComponent },
      { path: 'licence', component: LicenceComponent },
      { path: 'jersey', component: JerseyComponent },
      { path: 'office', component: OfficeComponent },
      { path: 'coaches', component: CoachesComponent },
      { path: 'seasons', component: SeasonsComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'help', component: HelpComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
