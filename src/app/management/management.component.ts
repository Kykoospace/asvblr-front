import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/services/api/auth/auth.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public navItems = [
    {
      label: 'Site public',
      content: [
        { label: 'Articles', route: 'articles', icon: 'fas fa-newspaper' },
        { label: 'Informations', route: 'informations', icon: 'fas fa-info' },
        { label: 'Gymnases', route: 'gymnasiums', icon: 'fas fa-volleyball-ball' },
        { label: 'Séances et horaires', route: 'schedules', icon: 'fas fa-calendar-alt' }
      ]
    },
    {
      label: 'Membres',
      content: [
        { label: 'Inscriptions', route: 'subscriptions', icon: 'fas fa-file-signature' },
        { label: 'Joueurs', route: 'players', icon: 'fas fa-user-friends' },
        { label: 'Équipes', route: 'teams', icon: 'fas fa-users' },
        { label: 'Demande de licence', route: 'licence', icon: 'fas fa-id-card' },
        { label: 'Demande de maillot', route: 'jersey', icon: 'fas fa-tshirt' }
      ]
    },
    {
      label: 'Gestion du club',
      content: [
        { label: 'Bureau', route: 'office', icon: 'fas fa-building' },
        { label: 'Entraîneurs', route: 'coaches', icon: 'fas fa-user-friends' },
        { label: 'Saisons', route: 'seasons', icon: 'fas fa-newspaper' },
        { label: 'Statistiques', route: 'stats', icon: 'fas fa-chart-bar' }
      ]
    },
    {
      label: 'Outils',
      content: [
        { label: 'Utilisateurs', route: 'users', icon: 'fas fa-user-friends' },
        { label: 'Paramètres', route: 'settings', icon: 'fas fa-cogs' },
        { label: 'Aide', route: 'help', icon: 'fas fa-question' }
      ]
    }
  ];

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.signOut();
  }

}
