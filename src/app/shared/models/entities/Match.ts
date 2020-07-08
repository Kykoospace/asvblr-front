import AppConstants from '../../AppConstants';

export default abstract class Match {
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

  public static getMatchData(match: Match) {
    return {
      labels: ['Collectif', 'Combativité', 'Attaque', 'Défense', 'Technique'],
      datasets: [{
        data: [
          match.collectiveRating,
          match.combativenessRating,
          match.offensiveRating,
          match.defensiveRating,
          match.technicalRating
        ],
        label: match.oppositeTeam,
        backgroundColor: 'rgba(0, 166, 156, .2)',
        borderColor: AppConstants.getColor(),
        pointBackgroundColor: AppConstants.getColor(),
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: AppConstants.getColor()
      }]
    };
  }
}
