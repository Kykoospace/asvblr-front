// Angular imports :
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components import :
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ClubComponent } from './main/club/club.component';
import { TeamsComponent
    as TeamsMainComponent } from './main/teams/teams.component';
import { ContactComponent } from './main/contact/contact.component';
import { SubscriptionComponent
    as SubscriptionMainComponent } from './main/subscription/subscription.component';

import { LoginComponent } from './login/login/login.component';
import { LogoutComponent } from './login/logout/logout.component';

import { ManagementComponent } from './management/management.component';
import { ArticlesComponent } from './management/articles/articles.component';
import { SubscriptionsComponent } from './management/subscriptions/subscriptions.component';
import { SubscriptionComponent
    as SubscriptionManagementComponent } from './management/subscriptions/subscription/subscription.component';
import { PlayersComponent } from './management/players/players.component';
import { TeamsComponent
    as TeamsManagementComponent } from './management/teams/teams.component';
import { TeamComponent
    as TeamManagementComponent } from './management/teams/team/team.component';
import { SeasonsComponent } from './management/seasons/seasons.component';
import { StatsComponent } from './management/stats/stats.component';
import { UsersComponent } from './management/users/users.component';
import { DevToolsComponent } from './management/dev-tools/dev-tools.component';
import { ArticleComponent } from './management/articles/article/article.component';
import { SandboxComponent } from './management/sandbox/sandbox.component';
import { ResetPasswordComponent } from './login/reset-password/reset-password.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import { MailerComponent } from './management/mailer/mailer.component';

// Guards import :
import { LoginGuard } from './shared/guards/login/login.guard';
import { PermissionGuard } from './shared/guards/permission/permission.guard';
import { PlayComponent } from './management/play/play.component';
import { CoachComponent } from './management/coach/coach.component';
import { PricesComponent } from './management/prices/prices.component';
import { UserProfileComponent } from './management/user-profile/user-profile.component';
import { GymnasiumComponent } from './main/gymnasium/gymnasium.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'club', component: ClubComponent },
      { path: 'gymnasium', component: GymnasiumComponent },
      { path: 'teams',
        children: [
          { path: '', component: TeamsMainComponent },
          { path: ':id', component: TeamsMainComponent }
        ]
      },
      { path: 'contact', component: ContactComponent },
      { path: 'subscription', component: SubscriptionMainComponent },
      { path: '**', redirectTo: 'home' }
    ]
  },
  { path: 'login',
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: LoginComponent },
      { path: 'sign-out', component: LogoutComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'reset-password:token', component: ResetPasswordComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: '**', redirectTo: '/login' }
    ]
  },
  { path: 'management', component: ManagementComponent,
    canActivate: [ LoginGuard, PermissionGuard ],
    canActivateChild: [ LoginGuard, PermissionGuard ],
    children: [
      {
        path: 'articles',
        children: [
          { path: '', component: ArticlesComponent },
          { path: ':id', component: ArticleComponent }
        ]
      },
      { path: 'prices', component: PricesComponent },
      { path: 'subscriptions',
        children: [
          { path: '', component: SubscriptionsComponent },
          { path: ':id', component: SubscriptionManagementComponent }
      ]
      },
      { path: 'players', component: PlayersComponent },
      { path: 'play',
        children: [
          { path: ':id', component: PlayComponent }
        ]
      },
      { path: 'coach',
        children: [
          { path: ':id', component: CoachComponent }
        ]
      },
      {
        path: 'teams',
        children: [
          { path: '', component: TeamsManagementComponent },
          { path: ':id', component: TeamManagementComponent }
        ]
      },
      { path: 'mailer', component: MailerComponent },
      { path: 'seasons', component: SeasonsComponent },
      { path: 'stats', component: StatsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'dev-tools', component: DevToolsComponent },
      { path: 'sandbox', component: SandboxComponent },
      { path: 'user', component: UserProfileComponent },
      { path: 'dev', component: SandboxComponent },
      { path: '**', redirectTo: '/management' }
    ]
  },
  { path: '**', redirectTo: '/main' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
