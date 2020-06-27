import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/api/auth/auth.service';
import User from '../shared/models/entities/User';
import ManagementNavMenu from '../shared/models/menus/ManagementNavMenu';
import { MenuItem } from 'primeng';
import AppConstants from '../shared/AppConstants';

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
    private authService: AuthService
  ) {
    this.title = AppConstants.APP_NAME_MEDIUM;
    this.loggedUser = this.authService.getLoggedUser();
    this.managementNavMenu = AppConstants.getNavMenuItems(this.authService.getLoggedUser().privileges);
    // this.managementNavMenu = AppConstants.APP_NAV_MENU_ITEMS;
  }

  ngOnInit() {
    this.userMenu = [
      { label: 'Retour au site', icon: 'fas fa-home', routerLink: ['/main'] },
      { label: 'Compte utilisateur', icon: 'fas fa-user-edit' },
      { label: 'Fiche de joueur', icon: 'fas fa-user' },
      { label: 'Déconnexion', icon: 'fas fa-sign-out-alt', routerLink: ['/login/sign-out'] }
    ];
  }

  public logout(): void {
    this.authService.signOut();
  }

  public getUserConnectionLabel() {
    return this.loggedUser.firstName + ' ' + this.loggedUser.lastName.toUpperCase();
  }

}
