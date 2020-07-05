export default interface Drive {
  id: number;
  idMatch: number;
  idDriver: number;
  address: string;
  date: Date;
  go: boolean;
  nbTotalPlaces: number;
  nbFreePlaces: number;
}
