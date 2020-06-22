export default interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  privileges: string[];
  passwordChanged: boolean;
}
