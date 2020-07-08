export default interface Match {
  id: number;
  idTeam: number;
  oppositeTeam: string;
  place: string;
  date: Date;
  type: boolean;

  comment: string;
  collectiveRating: number;
  combativenessRating: number;
  offensiveRating: number;
  defensiveRating: number;
  technicalRating: number;
}
