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
  idPlayer: number;
  idSeason: number;
  idCategory: number;
  idPaymentMode: number;
  cni: Document;
  identityPhoto: Document;
  medicalCertificate: Document;
  formLicence: Document;
}
