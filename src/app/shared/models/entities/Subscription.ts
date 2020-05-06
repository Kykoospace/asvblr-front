import Player from './Player';
import Season from './Season';
import Category from './Category';
import PaymentMode from './PaymentMode';
import Document from './Document';

export default interface Subscription {
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
  // TODO : demander modif du nom "insurance" en "insuranceRequested" côté API
  insuranceRequested: boolean;
  player: Player;
  season: number;
  category: number;
  paymentMode: number;
  cni: Document;
  identityPhoto: Document;
  medicalCertificate: Document;
  formLicence: Document;
}
