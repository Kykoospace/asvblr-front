import Document from './Document';

export default interface Subscription {
  id: number;

  firstName: string;
  lastName: string;
  gender: boolean;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  birthCountry: string;

  address: string;
  postCode: number;
  city: string;

  idCategory: number;

  equipment: boolean;
  requestedJerseyNumber: number;
  topSize: string;
  pantsSize: string;

  insuranceRequested: boolean;
  coach: boolean;
  referee: boolean;

  // TODO: maj nomenclature
  cni: Document;
  identityPhoto: Document;
  medicalCertificate: Document;

  idPaymentMode: number;

  // TODO: feature in progress
  // comment: string;

  // Internal feature :
  idPlayer: number;
  idSeason: number;
  confirmed: boolean;
}
