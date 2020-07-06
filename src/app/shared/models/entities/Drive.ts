export default interface Drive {
  id: number;
  idMatch: number;
  idDriver: number;
  firstNameDriver: string;
  lastNameDriver: string;
  address: string;
  date: Date;
  go: boolean;
  nbTotalPlaces: number;
  nbFreePlaces: number;
}
