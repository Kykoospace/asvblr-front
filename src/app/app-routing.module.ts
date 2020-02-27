// Angular imports :
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components import :
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import { ManagementComponent } from './management/management.component';
import { StatsComponent } from './management/stats/stats.component';


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
      { path: 'stats', component: StatsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
