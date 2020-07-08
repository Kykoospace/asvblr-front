import ManagementNavMenu from './models/menus/ManagementNavMenu';
import {AuthService} from './services/api/auth/auth.service';

export default class AppConstants {
  public static APP_NAME_LONG: string = 'Association sportive de Bourg-la-Reine - Volleyball';
  public static APP_NAME_MEDIUM: string = 'Club de Volleyball de Bourg-la-Reine';
  public static APP_NAME_SHORT: string = 'ASBR - Volleyball';
  public static APP_NAME_MAIN_TITLE: string = 'Association sportive de Bourg-la-Reine';
  public static APP_NAME_SUB_TITLE: string = 'Le club de Volleyball';

  public static APP_NAV_MENU_ITEMS: ManagementNavMenu[] = [
    {
      label: 'Gestion du site',
      items: [
        { label: 'Articles', route: 'articles', icon: 'fas fa-newspaper', privilege: 'ARTICLE_MANAGEMENT' },
        { label: 'Informations', route: 'informations', icon: 'fas fa-info' },
        { label: 'Gymnases', route: 'gymnasiums', icon: 'fas fa-volleyball-ball' },
        { label: 'Séances et horaires', route: 'schedules', icon: 'fas fa-calendar-alt' }
      ]
    },
    {
      label: 'Gestion du club',
      items: [
        { label: 'Inscriptions', route: 'subscriptions', icon: 'fas fa-file-signature', privilege: 'SUBSCRIPTION_MANAGEMENT' },
        { label: 'Équipes', route: 'teams', icon: 'fas fa-users', privilege: 'TEAM_MANAGEMENT' },
        { label: 'Email groupé', route: 'mailer', icon: 'far fa-envelope', privilege: 'MAIL_MANAGEMENT' },
        { label: 'Saisons', route: 'seasons', icon: 'fas fa-newspaper', privilege: 'SEASON_MANAGEMENT' },
        { label: 'Statistiques', route: 'stats', icon: 'fas fa-chart-bar', privilege: 'STATISTICS_READ' }
      ]
    },
    {
      label: 'Outils',
      items: [
        { label: 'Utilisateurs', route: 'users', icon: 'fas fa-user-friends', privilege: 'USER_MANAGEMENT' },
        { label: 'Paramètres', route: 'settings', icon: 'fas fa-cogs' }
      ]
    },
    {
      label: 'Dev tools',
      items: [
        { label: 'IHM items', route: 'dev-tools', icon: 'fas fa-desktop' },
        { label: 'Sandbox', route: 'sandbox', icon: 'fas fa-desktop' }
      ]
    }
  ];

  public static APP_COLORS = [
    '#00a69c',
    '#004e64',
    '#b9e3c6',
    '#706c61',
    '#899e8b'
  ];

  public static CALENDAR_OPTIONS = {
    firstDayOfWeek: 1,
    dayNames: [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ],
    dayNamesShort: [ 'Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam' ],
    dayNamesMin: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
    monthNames: [ 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
    monthNamesShort: [ 'Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc' ],
    today: 'Aujourd\'hui',
    clear: 'Effacer'
  };

  public static LINE_CHART_OPTIONS = { };

  public static RADAR_CHART_OPTIONS = {
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 10
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 14,
        padding: 12,
        fontFamily: 'Roboto',
        fontColor: '#303030'
      }
    },
    elements: {
      line: {
        borderWidth: 2
      }
    }
  };

  public static API_ROLE_NAMES: Map<string, string> = new Map<string, string>([
    ['ROLE_PRESIDENT', 'Président'],
    ['ROLE_MANAGER', 'Gérant'],
    ['ROLE_COACH', 'Entraîneur'],
    ['ROLE_PLAYER', 'Joueur']
  ]);

  public static getColor(iterator?: number): string {
    if (iterator) {
      return AppConstants.APP_COLORS[iterator % AppConstants.APP_COLORS.length];
    } else {
      return AppConstants.APP_COLORS[0];
    }
  }

  public static getRoleName(role: string): string {
    return AppConstants.API_ROLE_NAMES.get(role);
  }
}
