import User from './User';

export default interface Player {
  id: number;
  firstName: string;
  lastName: string;
  gender: boolean;
  address: string;
  postCode: number;
  city: string;
  email: string;
  phoneNumber: number;
  birthDate: Date;
  birthCountry: string;
  user: User;
}
