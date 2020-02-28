import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public navItems = [
    {
      name: 'Site web',
      content: [
        { name: 'Articles', route: 'articles', icon: 'fas fa-newspaper' },
        { name: 'Informations', route: 'informations', icon: 'fas fa-info' },
        { name: 'Gymnases', route: 'gymnasiums', icon: 'fas fa-volleyball-ball' },
        { name: 'Séances et horaires', route: 'schedules', icon: 'fas fa-calendar-alt' }
      ]
    },
    {
      name: 'Membres',
      content: [
        { name: 'Inscriptions', route: 'subscriptions', icon: 'fas fa-file-signature' },
        { name: 'Joueurs', route: 'players', icon: 'fas fa-user-friends' },
        { name: 'Équipes', route: 'teams', icon: 'fas fa-users' },
        { name: 'Demande de licence', route: 'licence', icon: 'fas fa-id-card' },
        { name: 'Demande de maillot', route: 'jersey', icon: 'fas fa-tshirt' }
      ]
    },
    {
      name: 'Gestion du club',
      content: [
        { name: 'Bureau', route: 'office', icon: 'fas fa-building' },
        { name: 'Entraîneurs', route: 'coaches', icon: 'fas fa-user-friends' },
        { name: 'Saisons', route: 'seasons', icon: 'fas fa-newspaper' },
        { name: 'Statistiques', route: 'stats', icon: 'fas fa-chart-bar' }
      ]
    },
    {
      name: 'Outils',
      content: [
        { name: 'Utilisateurs', route: 'users', icon: 'fas fa-user-friends' },
        { name: 'Paramètres', route: 'settings', icon: 'fas fa-cogs' },
        { name: 'Aide', route: 'help', icon: 'fas fa-question' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
