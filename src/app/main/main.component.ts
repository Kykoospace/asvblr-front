import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng';
import {NavigationEnd, Router} from '@angular/router';
import AppConstants from '../shared/AppConstants';
import {filter} from 'rxjs/operators';
import {ManagementService} from '../shared/services/api/management/management.service';
import {TeamService} from '../shared/services/api/team/team.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public title: string;
  public subTitle: string;

  public navItems = [
    { label: 'Accueil', routerLink: 'home', icon: 'fas fa-home' },
    { label: 'Le club', routerLink: 'club', icon: 'fas fa-volleyball-ball' },
    { label: 'Les gymnases', routerLink: 'gymnasium', icon: 'fas fa-map-marker-alt' },
    { label: 'Nos équipes', routerLink: 'teams', icon: 'fas fa-users', items: [] },
    { label: 'Inscription', routerLink: 'subscription', icon: 'fas fa-file-signature' },
    { label: 'Contact', routerLink: 'contact', icon: 'fas fa-envelope' },
  ];

  constructor(
    private router: Router,
    private managementService: ManagementService,
    private teamService: TeamService
  ) {
    this.title = AppConstants.APP_NAME_MAIN_TITLE;
    this.subTitle = AppConstants.APP_NAME_SUB_TITLE;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(
        (event: NavigationEnd) => {
          let pageCode: string;
          switch (event.urlAfterRedirects) {
            case '/main/home':
              pageCode = 'HOME_PAGE';
              break;
            case '/main/gymnasium':
              pageCode = 'GYMNASIUM_PAGE';
              break;
            case '/main/club':
              pageCode = 'CLUB_PAGE';
              break;
            case '/main/teams':
              pageCode = 'TEAMS_PAGE';
              break;
            case '/main/subscription':
              pageCode = 'SUBSCRIPTION_PAGE';
              break;
            case '/main/contact':
              pageCode = 'CONTACT_PAGE';
              break;
            default:
              pageCode = undefined;
              break;
          }
          if (pageCode) {
            this.managementService.addVisitCount(pageCode)
              .subscribe();
          }
        }
      );
  }

  ngOnInit() {
    forkJoin({
      teamCategories: this.teamService.getAllTeamCategories(),
      teams: this.teamService.getAllTeams()
    })
      .subscribe(
        results => {
          const items = [];
          results.teamCategories.forEach(
            category => {
              const subItems: MenuItem[] = [];
              results.teams.filter(team => team.idTeamCategory === category.id)
                .forEach(
                  team => subItems.push({
                    label: team.name,
                    routerLink: '/main/teams/' + team.id
                  })
                );
              if (subItems.length > 0) {
                items.push({
                  label: category.name,
                  items: subItems
                });
              }
            }
          );
          this.navItems[3].items = [items];
        }
      );
  }

  public accessMemberArea() {
    this.router.navigate(['/management']);
  }

}
