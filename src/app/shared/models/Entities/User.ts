import Privilege from './Privileges';

export default interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  privileges: Privilege[];
}
