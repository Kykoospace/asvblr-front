export default interface User {
  id: number;
  username: string;
  firstName: string;
  fullName?: string;
  lastName: string;
  email: string;
  roles: string[];
  formatedRoles?: string[];
  privileges: string[];
  passwordChanged: boolean;
}
