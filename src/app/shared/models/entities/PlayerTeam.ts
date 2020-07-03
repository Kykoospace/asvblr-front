export default interface PlayerTeam {
  idPlayer: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  email: string;
  phoneNumber: number;
  birthDate: Date;
  licenceNumber: string;
  jerseyNumber: number;
  // TODO: update here :
  // requestedJerseyNumber: number;
  positionName: string;
  positionShortName: string;
}