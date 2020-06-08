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

  idSubscriptionCategory: number;

  equipment: boolean;
  requestedJerseyNumber: number;
  idTopSize: number;
  idPantsSize: number;

  insuranceRequested: boolean;
  calendarRequested: boolean;
  coach: boolean;
  referee: boolean;

  idCNI: number;
  idIdentityPhoto: number;
  idMedicalCertificate: number;

  idsPaymentMode: number[];

  comment: string;

  // Parental consent :
  pc_allowClubToRescue: boolean;
  pc_allowToLeaveAlone: boolean;
  pc_allowToPublish: boolean;
  pc_allowToTravelWithTeamMate: boolean;
  pc_allowToWhatsapp: boolean;
  pc_unaccountability: boolean;

  // Internal feature :
  creationDate: Date;
  validationDate: Date;
  idPlayer: number;
  idSeason: number;
  validated: boolean;
}
