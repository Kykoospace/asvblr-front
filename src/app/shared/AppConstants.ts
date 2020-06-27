import ManagementNavMenu from './models/menus/ManagementNavMenu';
import {AuthService} from './services/api/auth/auth.service';

export default class AppConstants {
  public static APP_NAME_LONG: string = 'Association sportive de Bourg-la-Reine - Volleyball';
  public static APP_NAME_MEDIUM: string = 'Association Volleyball de Bourg-la-Reine';
  public static APP_NAME_SHORT: string = 'ASBR - Volleyball';
  public static APP_NAME_MAIN_TITLE: string = 'Association sportive de Bourg-la-Reine';
  public static APP_NAME_SUB_TITLE: string = 'Le club de Volleyball';

  public static APP_NAV_MENU_ITEMS: ManagementNavMenu[] = [
    {
      label: 'Site public',
      items: [
        { label: 'Articles', route: 'articles', icon: 'fas fa-newspaper', privilege: 'ARTICLE_MANAGEMENT' },
        { label: 'Informations', route: 'informations', icon: 'fas fa-info' },
        { label: 'Gymnases', route: 'gymnasiums', icon: 'fas fa-volleyball-ball' },
        { label: 'Séances et horaires', route: 'schedules', icon: 'fas fa-calendar-alt' }
      ]
    },
    {
      label: 'Membres',
      items: [
        { label: 'Inscriptions', route: 'subscriptions', icon: 'fas fa-file-signature', privilege: 'SUBSCRIPTION_MANAGEMENT' },
        { label: 'Équipes', route: 'teams', icon: 'fas fa-users', privilege: 'TEAM_MANAGEMENT' },
        { label: 'Messages', route: 'mailer', icon: 'far fa-envelope' }
      ]
    },
    {
      label: 'Gestion du club',
      items: [
        { label: 'Bureau', route: 'office', icon: 'fas fa-building' },
        { label: 'Entraîneurs', route: 'coaches', icon: 'fas fa-user-friends' },
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

  public static getNavMenuItems(userPrivileges: string[]): ManagementNavMenu[] {
    const navMenuItems = AppConstants.APP_NAV_MENU_ITEMS;
    let returnNavMenu: ManagementNavMenu[] = [];
    let item: ManagementNavMenu;
    navMenuItems.forEach(
      navMenu => {
        item = { label: navMenu.label, items: [] };
        navMenu.items.forEach(
          navMenuItem => {
            if (navMenuItem.privilege !== undefined) {
              if (AuthService.userHasPrivilege(navMenuItem.privilege, userPrivileges)) {
                console.log(navMenuItem.privilege);
                item.items.push(navMenuItem);
              }
            } else {
              item.items.push(navMenuItem);
            }
          }
        );
        returnNavMenu.push(item);
      }
    );
    return returnNavMenu;
  }

  public static API_ROLE_NAMES: Map<string, string> = new Map<string, string>([
    ['ROLE_PRESIDENT', 'Président'],
    ['ROLE_MANAGER', 'Gérant'],
    ['ROLE_COACH', 'Entraîneur'],
    ['ROLE_PLAYER', 'Joueur']
  ]);

  public static getRoleName(role: string): string {
    return AppConstants.API_ROLE_NAMES.get(role);
  }
}
