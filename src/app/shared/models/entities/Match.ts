export default interface Match {
  id: number;
  idTeam: number;
  oppositeTeam: string;
  place: string;
  date: Date;
  type: boolean;

  rate: number;
  comment: string;
}
