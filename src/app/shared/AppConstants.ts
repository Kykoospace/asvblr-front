export default class AppConstants {
  public static APP_NAME_LONG: string = 'Association sportive de Bourg-la-Reine - Volleyball';
  public static APP_NAME_MEDIUM: string = 'Association Volleyball de Bourg-la-Reine';
  public static APP_NAME_SHORT: string = 'ASBR - Volleyball';
  public static APP_NAME_MAIN_TITLE: string = 'Association sportive de Bourg-la-Reine';
  public static APP_NAME_SUB_TITLE: string = 'Le club de Volleyball';

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
