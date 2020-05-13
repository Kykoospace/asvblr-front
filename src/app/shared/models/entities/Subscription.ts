export default interface Subscription {
  id: number;

  firstName: string;
  lastName: string;
  gender: boolean;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  nationality: string;

  address: string;
  postcode: number;
  city: string;

  idCategory: number;

  equipment: boolean;
  requestedJerseyNumber: number;
  idTopSize: number;
  idPantsSize: number;

  insuranceRequested: boolean;
  coach: boolean;
  referee: boolean;

  idCNI: number;
  idIdentityPhoto: number;
  idMedicalCertificate: number;

  idPaymentMode: number;

  comment: string;

  // Internal feature :
  creationDate: Date;
  validationDate: Date;
  idPlayer: number;
  idSeason: number;
  confirmed: boolean;
}
