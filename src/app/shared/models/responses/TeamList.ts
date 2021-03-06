export default interface TeamList {
  id: number;
  teamName: string;
  nbPlayers: number;
  teamCategoryName: string;
  coachFullName: string;
  coachFirstName: string;
  coachLastName: string;
  idPlayerLeader: number;
  leaderFirstName: string;
  leaderLastName: string;
  leaderFullName: string;
}
