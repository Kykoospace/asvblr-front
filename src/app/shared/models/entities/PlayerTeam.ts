export default interface PlayerTeam {
  idPlayer: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  address: string;
  postcode: number;
  city: string;
  email: string;
  phoneNumber: number;
  birthDate: Date;
  licenceNumber: string;
  jerseyNumber: number;
  requestedJerseyNumber: number;
  idPosition: number;
  positionName: string;
  positionShortName: string;
}
