import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/api/auth/auth.service';
import User from '../shared/models/entities/User';
import ManagementNavMenu from '../shared/models/menus/ManagementNavMenu';
import { MenuItem } from 'primeng';
import AppConstants from '../shared/AppConstants';
import {ActivatedRoute, Router} from '@angular/router';
import {TeamService} from '../shared/services/api/team/team.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public title: string;

  public userMenu: MenuItem[];
  public managementNavMenu: ManagementNavMenu[];

  public loggedUser: User;

  constructor(
    private authService: AuthService,
    private teamService: TeamService,
    private router: Router
  ) {
    this.title = AppConstants.APP_NAME_MEDIUM;
    this.loggedUser = this.authService.getLoggedUser();
    this.managementNavMenu = this.getNavMenuItems();

    // Home page redirection:
    if (this.router.url === '/management') {
      if (this.authService.userHasRole('ROLE_PRESIDENT')
        || this.authService.userHasRole('ROLE_MANAGER')) {
        this.router.navigate(['/management/stats']);
      } else if (this.authService.userHasRole('ROLE_PLAYER')) {
        this.router.navigate(['/management/play']);
      } else if (this.authService.userHasRole('ROLE_COACH')) {
        this.router.navigate(['/management/coach']);
      }
    }
  }

  ngOnInit() {
    this.userMenu = [
      { label: 'Retour au site', icon: 'fas fa-home', routerLink: ['/main'] },
      { label: 'Compte utilisateur', icon: 'fas fa-user-edit', routerLink: ['/management/user'] },
      { label: 'Déconnexion', icon: 'fas fa-sign-out-alt', routerLink: ['/login/sign-out'] }
    ];
  }

  public getNavMenuItems(): ManagementNavMenu[] {
    const navMenuItems = AppConstants.APP_NAV_MENU_ITEMS;
    const returnNavMenu: ManagementNavMenu[] = [];

    // Add dynamic items :
    if (this.authService.userHasRole('ROLE_PLAYER')) {
      const playMenu: ManagementNavMenu = {
        label: 'Je joue',
        items: []
      };
      this.teamService.getTeamsOfUser(this.loggedUser.id)
        .subscribe(
          teams => teams.forEach(team => {
              playMenu.items.push({
                label: team.teamName,
                icon: 'fas fa-users',
                route: 'play/' + team.id
              });
          }),
          err => console.error(err)
        );
      returnNavMenu.push(playMenu);
    }

    if (this.authService.userHasRole('ROLE_COACH')) {
      const playMenu: ManagementNavMenu = {
        label: 'J\'entraîne',
        items: []
      };
      this.teamService.getCoachedTeams(this.loggedUser.id)
        .subscribe(
          teams => teams.forEach(team => {
            playMenu.items.push({
              label: team.teamName,
              icon: 'fas fa-users',
              route: 'coach/' + team.id
            });
          }),
          err => console.error(err)
        );
      returnNavMenu.push(playMenu);
    }

    // Add static items :
    let item: ManagementNavMenu;
    navMenuItems.forEach(
      navMenu => {
        item = { label: navMenu.label, items: [] };
        navMenu.items.forEach(
          navMenuItem => {
            if (navMenuItem.privilege !== undefined) {
              if (this.authService.userHasPrivilege(navMenuItem.privilege)) {
                item.items.push(navMenuItem);
              }
            } else {
              item.items.push(navMenuItem);
            }
          }
        );
        if (item.items.length > 0) {
          returnNavMenu.push(item);
        }
      }
    );
    return returnNavMenu;
  }
}
