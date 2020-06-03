import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/api/auth/auth.service';
import User from '../shared/models/entities/User';
import ManagementNavMenu from '../shared/models/menus/ManagementNavMenu';
import { MenuItem } from 'primeng';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public userMenu: MenuItem[];
  public managementNavMenu: ManagementNavMenu[];

  public loggedUser: User;

  constructor(
    private authService: AuthService
  ) {
    this.loggedUser = this.authService.getLoggedUser();
  }

  ngOnInit() {
    this.managementNavMenu = [
      {
        label: 'Site public',
        items: [
          { label: 'Articles', route: 'articles', icon: 'fas fa-newspaper', privilege: '' },
          { label: 'Informations', route: 'informations', icon: 'fas fa-info', privilege: '' },
          { label: 'Gymnases', route: 'gymnasiums', icon: 'fas fa-volleyball-ball', privilege: '' },
          { label: 'Séances et horaires', route: 'schedules', icon: 'fas fa-calendar-alt', privilege: '' }
        ]
      },
      {
        label: 'Membres',
        items: [
          { label: 'Inscriptions', route: 'subscriptions', icon: 'fas fa-file-signature', privilege: '' },
          { label: 'Équipes', route: 'teams', icon: 'fas fa-users', privilege: '' },
          { label: 'Demande de licence', route: 'licence', icon: 'fas fa-id-card', privilege: '' },
          { label: 'Demande de maillot', route: 'jersey', icon: 'fas fa-tshirt', privilege: '' }
        ]
      },
      {
        label: 'Gestion du club',
        items: [
          { label: 'Bureau', route: 'office', icon: 'fas fa-building', privilege: '' },
          { label: 'Entraîneurs', route: 'coaches', icon: 'fas fa-user-friends', privilege: '' },
          { label: 'Saisons', route: 'seasons', icon: 'fas fa-newspaper', privilege: '' },
          { label: 'Statistiques', route: 'stats', icon: 'fas fa-chart-bar', privilege: '' }
        ]
      },
      {
        label: 'Outils',
        items: [
          { label: 'Utilisateurs', route: 'users', icon: 'fas fa-user-friends', privilege: '' },
          { label: 'Paramètres', route: 'settings', icon: 'fas fa-cogs', privilege: '' }
        ]
      },
      {
        label: 'Dev tools',
        items: [
          { label: 'IHM items', route: 'dev-tools', icon: 'pi pi-desktop', privilege: '' },
          { label: 'Sandbox', route: 'sandbox', icon: 'pi pi-desktop', privilege: '' }
        ]
      }
    ];

    this.userMenu = [
      { label: 'Retour au site', icon: 'pi pi-fw pi-home', routerLink: ['/main'] },
      { label: 'Compte utilisateur', icon: 'pi pi-fw pi-user-edit' },
      { label: 'Fiche de joueur', icon: 'pi pi-fw pi-user' },
      { label: 'Déconnexion', icon: 'pi pi-fw pi-sign-out', routerLink: ['/login/sign-out'] }
    ];
  }

  public logout(): void {
    this.authService.signOut();
  }

  public getUserConnectionLabel() {
    return this.loggedUser.firstName + ' ' + this.loggedUser.lastName.toUpperCase();
  }

}
