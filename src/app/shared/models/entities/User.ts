export default interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  roles: string[];
  formatedRoles?: string[];
  privileges: string[];
  passwordChanged: boolean;
  idPlayer: number;
}
